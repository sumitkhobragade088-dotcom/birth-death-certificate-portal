(async()=>{
const $=x=>document.getElementById(x);
if(!window.birthPortalAuth?.ready){$("list").textContent="Supabase config missing";return}
const gate=await window.birthPortalAuth.requireAdmin(); if(!gate)return;
const db=window.birthPortalAuth.client;

const map={
taluka:"taluka_block",authorityType:"authority_type",nameEn:"name_en",nameLocal:"name_local",
governmentEn:"government_en",governmentLocal:"government_local",departmentEn:"department_en",departmentLocal:"department_local",
formNoEn:"form_no_en",formNoLocal:"form_no_local",birthTitleEn:"birth_title_en",birthTitleLocal:"birth_title_local",
statutoryEn:"statutory_text_en",statutoryLocal:"statutory_text_local",certifyEn:"certification_text_en",certifyLocal:"certification_text_local",
labelNameLocal:"label_name_local",labelGenderLocal:"label_gender_local",labelDobLocal:"label_dob_local",labelPobLocal:"label_pob_local",
labelMotherLocal:"label_mother_local",labelFatherLocal:"label_father_local",labelBirthAddressLocal:"label_birth_address_local",
labelPermanentAddressLocal:"label_permanent_address_local",labelRegNoLocal:"label_reg_no_local",labelRegDateLocal:"label_reg_date_local",
labelRemarksLocal:"label_remarks_local",labelIssueDateLocal:"label_issue_date_local",authorizedPerson:"authorized_person_name",
designationEn:"designation_en",designationLocal:"designation_local",issuingAuthorityEn:"issuing_authority_en",
issuingAuthorityLocal:"issuing_authority_local",sloganEn:"bottom_slogan_en",sloganLocal:"bottom_slogan_local",
qrTextEn:"qr_text_en",qrTextLocal:"qr_text_local"
};
const ids=Object.keys(map);

const {data:states,error:se}=await db.from("states").select("id,code,name_en").order("name_en");
if(se){$("list").textContent=se.message;return}
(states||[]).forEach(s=>{const o=new Option(s.name_en,s.id);o.dataset.code=s.code;$("state").add(o)});

async function districts(selected){
 $("district").innerHTML='<option value="">Select District</option>';
 if(!$("state").value)return;
 const {data,error}=await db.from("districts").select("id,name_en").eq("state_id",$("state").value).order("name_en");
 if(error){$("msg").textContent=error.message;return}
 (data||[]).forEach(d=>$("district").add(new Option(d.name_en,d.id)));
 if(selected)$("district").value=String(selected);
}
$("state").onchange=()=>districts();

const safe=s=>String(s||"file").replace(/[^a-zA-Z0-9._-]/g,"_");
async function upload(input,kind,old){
 const f=$(input).files?.[0]; if(!f)return old||null;
 const path=`${gate.session.user.id}/${Date.now()}-${kind}-${safe(f.name)}`;
 const {error}=await db.storage.from("authority-assets").upload(path,f,{contentType:f.type||undefined});
 if(error)throw error; return path;
}
async function one(id){if(!id)return {};const {data}=await db.from("local_bodies").select("*").eq("id",id).single();return data||{}}

async function render(){
 const {data,error}=await db.from("local_bodies").select("id,state_id,district_id,name_en,name_local,taluka_block,authority_type,is_active,states(name_en),districts(name_en)").order("created_at",{ascending:false});
 if(error){$("list").textContent=error.message;return}
 $("list").innerHTML=(data||[]).map(r=>`<div class="card"><b>${r.name_en||""}</b>${r.name_local?" / "+r.name_local:""}<br><small>${r.states?.name_en||""} → ${r.districts?.name_en||""} → ${r.taluka_block||"—"} | ${r.authority_type||""}</small><div class="actions"><button data-edit="${r.id}">Edit</button><button data-active="${r.id}" data-now="${r.is_active!==false}">${r.is_active===false?"Activate":"Deactivate"}</button><button data-del="${r.id}">Delete</button></div></div>`).join("")||"No records";
}
$("list").onclick=async e=>{
 if(e.target.dataset.edit){
  const r=await one(e.target.dataset.edit); $("editId").value=r.id; $("state").value=String(r.state_id); await districts(r.district_id);
  ids.forEach(id=>$(id).value=r[map[id]]??""); $("isActive").checked=r.is_active!==false; $("heading").textContent="Edit Hospital / Local Body"; $("cancel").hidden=false; window.scrollTo(0,0);
 }
 if(e.target.dataset.active){
  await db.from("local_bodies").update({is_active:e.target.dataset.now!=="true"}).eq("id",e.target.dataset.active); await render();
 }
 if(e.target.dataset.del && confirm("Delete this master?")){await db.from("local_bodies").delete().eq("id",e.target.dataset.del);await render()}
};
$("cancel").onclick=()=>location.reload();

$("f").onsubmit=async e=>{
 e.preventDefault(); $("save").disabled=true; $("msg").textContent="Saving...";
 try{
  if(!$("state").value||!$("district").value)throw Error("State and District required");
  const old=await one($("editId").value);
  const p={state_id:+$("state").value,district_id:+$("district").value,is_active:$("isActive").checked};
  ids.forEach(id=>p[map[id]]=$(id).value.trim()||null);
  p.state_logo_path=await upload("stateLogo","left-logo",old.state_logo_path);
  p.center_logo_path=await upload("centerLogo","center-logo",old.center_logo_path);
  p.form_logo_path=await upload("formLogo","form-logo",old.form_logo_path);
  p.signature_path=await upload("signature","signature",old.signature_path);
  p.seal_path=await upload("seal","seal",old.seal_path);
  let q;
  if(old.id)q=await db.from("local_bodies").update(p).eq("id",old.id);
  else {p.created_by=gate.session.user.id;q=await db.from("local_bodies").insert(p)}
  if(q.error)throw q.error;
  $("msg").textContent="Saved"; setTimeout(()=>location.reload(),500);
 }catch(err){$("msg").textContent="Error: "+err.message}
 finally{$("save").disabled=false}
};
await render();
})();