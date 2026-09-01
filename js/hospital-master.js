(async function(){
 const $=id=>document.getElementById(id);
 if(!window.birthPortalAuth?.ready){$("masterList").textContent="Supabase config missing.";return}
 const gate=await window.birthPortalAuth.requireAdmin();if(!gate)return;
 const db=window.birthPortalAuth.client, state=$("state"), district=$("district"), form=$("masterForm");
 const F=["taluka","authorityType","nameEn","nameLocal","governmentEn","governmentLocal","departmentEn","departmentLocal",
 "formNoEn","formNoLocal","statutoryEn","statutoryLocal","certifyEn","certifyLocal","labelNameLocal","labelGenderLocal",
 "labelDobLocal","labelPobLocal","labelMotherLocal","labelFatherLocal","labelBirthAddressLocal","labelPermanentAddressLocal",
 "labelRegNoLocal","labelRegDateLocal","labelRemarksLocal","labelIssueDateLocal","authorizedPerson","designationEn",
 "designationLocal","issuingAuthorityEn","issuingAuthorityLocal","sloganEn","sloganLocal","address"];
 const col={
 taluka:"taluka_block",authorityType:"authority_type",nameEn:"name_en",nameLocal:"name_local",
 governmentEn:"government_en",governmentLocal:"government_local",departmentEn:"department_en",departmentLocal:"department_local",
 formNoEn:"form_no_en",formNoLocal:"form_no_local",statutoryEn:"statutory_text_en",statutoryLocal:"statutory_text_local",
 certifyEn:"certification_text_en",certifyLocal:"certification_text_local",labelNameLocal:"label_name_local",
 labelGenderLocal:"label_gender_local",labelDobLocal:"label_dob_local",labelPobLocal:"label_pob_local",
 labelMotherLocal:"label_mother_local",labelFatherLocal:"label_father_local",labelBirthAddressLocal:"label_birth_address_local",
 labelPermanentAddressLocal:"label_permanent_address_local",labelRegNoLocal:"label_reg_no_local",
 labelRegDateLocal:"label_reg_date_local",labelRemarksLocal:"label_remarks_local",labelIssueDateLocal:"label_issue_date_local",
 authorizedPerson:"authorized_person_name",designationEn:"designation_en",designationLocal:"designation_local",
 issuingAuthorityEn:"issuing_authority_en",issuingAuthorityLocal:"issuing_authority_local",
 sloganEn:"bottom_slogan_en",sloganLocal:"bottom_slogan_local",address:"address"
 };

 const {data:states}=await db.from("states").select("id,code,name_en").order("name_en");
 (states||[]).forEach(s=>{const o=new Option(s.name_en,s.id);o.dataset.code=s.code;state.add(o)});
 async function loadDistricts(selected){
   district.innerHTML='<option value="">Select District</option>';
   if(!state.value)return;
   const {data}=await db.from("districts").select("id,name_en").eq("state_id",state.value).order("name_en");
   (data||[]).forEach(d=>district.add(new Option(d.name_en,d.id)));
   if(selected)district.value=String(selected);
 }
 state.onchange=()=>loadDistricts();

 const safe=n=>String(n||"file").replace(/[^a-zA-Z0-9._-]/g,"_");
 async function upload(id,kind,oldPath){
   const file=$(id).files?.[0];if(!file)return oldPath||null;
   const path=`${gate.session.user.id}/${Date.now()}-${kind}-${safe(file.name)}`;
   const {error}=await db.storage.from("authority-assets").upload(path,file,{contentType:file.type||undefined});
   if(error)throw error;return path;
 }
 async function getExisting(id){
   if(!id)return {};
   const {data}=await db.from("local_bodies").select("*").eq("id",id).single();return data||{};
 }
 async function render(){
   const {data,error}=await db.from("local_bodies").select("*,states(name_en),districts(name_en)").order("created_at",{ascending:false});
   if(error){$("masterList").textContent=error.message;return}
   $("masterList").innerHTML=(data||[]).map(r=>`<div class="master-card">
   <b>${r.name_en||""}</b> ${r.name_local?"/ "+r.name_local:""}<br>
   <small>${r.states?.name_en||""} → ${r.districts?.name_en||""} → ${r.taluka_block||"—"} | ${r.authority_type||""}</small>
   <div class="master-actions"><button data-edit="${r.id}">Edit</button>
   <button data-toggle="${r.id}" data-active="${r.is_active!==false}">${r.is_active===false?"Activate":"Deactivate"}</button>
   <button data-delete="${r.id}">Delete</button></div></div>`).join("")||"No records.";
 }
 $("masterList").onclick=async e=>{
   const edit=e.target.dataset.edit,toggle=e.target.dataset.toggle,del=e.target.dataset.delete;
   if(edit){
     const r=await getExisting(edit);$("editId").value=r.id;state.value=String(r.state_id);await loadDistricts(r.district_id);
     F.forEach(id=>{$(id).value=r[col[id]]||""});$("isActive").checked=r.is_active!==false;
     $("formHeading").textContent="Edit Hospital / Local Body";$("cancelEdit").hidden=false;scrollTo(0,0);return;
   }
   if(toggle){await db.from("local_bodies").update({is_active:e.target.dataset.active!=="true"}).eq("id",toggle);await render();return}
   if(del && confirm("Delete this Hospital / Local Body master?")){await db.from("local_bodies").delete().eq("id",del);await render()}
 };
 $("cancelEdit").onclick=()=>{form.reset();$("editId").value="";$("formHeading").textContent="Add Hospital / Local Body";$("cancelEdit").hidden=true;district.innerHTML='<option value="">Select District</option>'};

 form.onsubmit=async e=>{
   e.preventDefault();$("message").textContent="Saving...";$("saveBtn").disabled=true;
   try{
     if(!state.value||!district.value)throw Error("State and District are required.");
     const old=await getExisting($("editId").value);
     const payload={state_id:+state.value,district_id:+district.value,is_active:$("isActive").checked,updated_by:gate.session.user.id};
     F.forEach(id=>payload[col[id]]=$(id).value.trim()||null);
     payload.state_logo_path=await upload("stateLogo","state-logo",old.state_logo_path);
     payload.center_logo_path=await upload("centerLogo","center-logo",old.center_logo_path);
     payload.form_logo_path=await upload("formLogo","form-logo",old.form_logo_path);
     payload.signature_path=await upload("signature","signature",old.signature_path);
     payload.seal_path=await upload("seal","seal",old.seal_path);
     let q;
     if(old.id)q=await db.from("local_bodies").update(payload).eq("id",old.id);
     else {payload.created_by=gate.session.user.id;q=await db.from("local_bodies").insert(payload)}
     if(q.error)throw q.error;
     $("message").textContent="Saved successfully.";form.reset();$("editId").value="";$("cancelEdit").hidden=true;
     district.innerHTML='<option value="">Select District</option>';await render();
   }catch(x){$("message").textContent="Error: "+x.message}
   finally{$("saveBtn").disabled=false}
 };
 await render();
})();