(async function () {
  const $ = id => document.getElementById(id);
  const form=$("hospitalForm"), list=$("hospitalList"), msg=$("saveMessage");
  if(!window.birthPortalAuth?.ready){list.textContent=window.birthPortalAuth?.error||"Supabase config missing.";return}
  const gate=await window.birthPortalAuth.requireAdmin(); if(!gate)return;
  const db=window.birthPortalAuth.client;
  const state=$("state"), district=$("district");

  const {data:states,error:stateErr}=await db.from("states").select("id,code,name_en").order("name_en");
  if(stateErr){list.textContent=stateErr.message;return}
  (states||[]).forEach(s=>{const o=new Option(s.name_en,s.id);o.dataset.code=s.code;state.add(o)});

  async function loadDistricts(){
    district.innerHTML='<option value="">Select District</option>';
    if(!state.value)return;
    const {data,error}=await db.from("districts").select("id,name_en").eq("state_id",state.value).order("name_en");
    if(error){msg.textContent=error.message;return}
    (data||[]).forEach(d=>district.add(new Option(d.name_en,d.id)));

    // Backup only when DB district rows are not available.
    if(!(data||[]).length){
      const code=state.options[state.selectedIndex]?.dataset?.code;
      (window.ALL_INDIA_DISTRICTS?.[code]||[]).forEach(name=>{
        const o=new Option(name,"");
        o.dataset.fallbackName=name;
        district.add(o);
      });
    }
  }
  state.addEventListener("change",loadDistricts);

  function safeName(name){return String(name||"file").replace(/[^a-zA-Z0-9._-]/g,"_")}
  async function uploadAsset(inputId,folder){
    const file=$(inputId)?.files?.[0]; if(!file)return null;
    const path=`${gate.session.user.id}/${Date.now()}-${folder}-${safeName(file.name)}`;
    const {error}=await db.storage.from("authority-assets").upload(path,file,{upsert:false,contentType:file.type||undefined});
    if(error)throw error;
    return path;
  }

  async function signed(path){
    if(!path)return null;
    const {data}=await db.storage.from("authority-assets").createSignedUrl(path,3600);
    return data?.signedUrl||null;
  }

  async function render(){
    const {data,error}=await db.from("local_bodies")
      .select("id,name_en,name_local,authority_type,taluka_block,designation_en,authorized_person_name,state_logo_path,form_logo_path,signature_path,seal_path,states(name_en),districts(name_en)")
      .order("created_at",{ascending:false}).limit(100);
    if(error){list.textContent=error.message;return}
    if(!data?.length){list.textContent="No saved hospitals / authorities yet.";return}
    list.innerHTML="";
    for(const r of data){
      const logo=await signed(r.state_logo_path);
      const div=document.createElement("div"); div.className="authority-card";
      div.innerHTML=`
        <div style="display:flex;gap:12px;align-items:center">
          ${logo?`<img src="${logo}" style="width:52px;height:52px;object-fit:contain">`:""}
          <div><b>${r.name_en||""}</b><br>${r.name_local||""}</div>
        </div>
        <div style="margin-top:8px">${r.authority_type||""}
          ${r.taluka_block?" — "+r.taluka_block:""}
          ${r.districts?.name_en?" — "+r.districts.name_en:""}
          ${r.states?.name_en?" — "+r.states.name_en:""}
        </div>
        <small>${r.authorized_person_name||""}${r.designation_en?" • "+r.designation_en:""}</small>`;
      list.appendChild(div);
    }
  }

  form.addEventListener("submit",async e=>{
    e.preventDefault(); msg.textContent="Saving..."; $("saveBtn").disabled=true;
    try{
      if(!state.value)throw new Error("Select State.");
      if(!district.value)throw new Error("Select District. Run the All India district SQL if this district is only a fallback.");
      if(!$("nameEn").value.trim())throw new Error("English Name is required.");

      // Upload private authority assets first.
      const [stateLogoPath,formLogoPath,signaturePath,sealPath]=await Promise.all([
        uploadAsset("stateLogo","state-logo"),
        uploadAsset("formLogo","form-logo"),
        uploadAsset("signature","signature"),
        uploadAsset("seal","seal")
      ]);

      const payload={
        state_id:Number(state.value),
        district_id:Number(district.value),
        taluka_block:$("taluka").value.trim()||null,
        authority_type:$("type").value,
        name_en:$("nameEn").value.trim(),
        name_local:$("nameLocal").value.trim()||null,
        department_en:$("departmentEn").value.trim()||null,
        department_local:$("departmentLocal").value.trim()||null,
        authorized_person_name:$("authorizedPerson").value.trim()||null,
        designation_en:$("designationEn").value.trim()||null,
        designation_local:$("designationLocal").value.trim()||null,
        address:$("address").value.trim()||null,
        state_logo_path:stateLogoPath,
        form_logo_path:formLogoPath,
        signature_path:signaturePath,
        seal_path:sealPath,
        is_active:true,
        created_by:gate.session.user.id
      };
      const {error}=await db.from("local_bodies").insert(payload);
      if(error)throw error;
      msg.textContent="Saved successfully.";
      form.reset();
      state.value=""; district.innerHTML='<option value="">Select District</option>';
      await render();
    }catch(err){msg.textContent="Error: "+err.message}
    finally{$("saveBtn").disabled=false}
  });

  await render();
})();