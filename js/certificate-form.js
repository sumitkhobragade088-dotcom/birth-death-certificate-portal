(async function(){
 const msg=document.getElementById("formMessage");
 if(!window.birthPortalAuth?.ready){msg.textContent=window.birthPortalAuth?.error||"Supabase config missing";return}
 const gate=await window.birthPortalAuth.requireAdmin(); if(!gate)return;
 const db=window.birthPortalAuth.client, type=window.CERTIFICATE_TYPE;
 const state=document.getElementById("state"), district=document.getElementById("district"), lb=document.getElementById("localBody");

 const {data:states,error:se}=await db.from("states").select("id,code,name_en").order("name_en");
 if(se){msg.textContent=se.message;return}
 states.forEach(s=>{
   const opt=new Option(s.name_en,s.id); opt.dataset.code=s.code; state.add(opt);
 });
 async function loadDistricts(){
   const selected=state.options[state.selectedIndex];
   if(selected?.dataset?.code && window.birthPortalStateLanguage){
     window.birthPortalStateLanguage.translateFormByStateCode(selected.dataset.code);
   }
   const lang=window.BIRTH_PORTAL_ACTIVE_LANGUAGE||"en";
   const d=window.birthPortalStateLanguage ? Object.assign({},window.birthPortalStateLanguage.T.en,window.birthPortalStateLanguage.T[lang]||{}) : {};
   district.innerHTML=`<option value="">${d.selectDistrict||"Select District"}</option>`;
   lb.innerHTML=`<option value="">${d.selectAuthority||"Select saved authority"}</option>`;
   if(!state.value)return;
   const {data}=await db.from("districts").select("id,name_en").eq("state_id",state.value).order("name_en");
   (data||[]).forEach(d=>district.add(new Option(d.name_en,d.id)));
   await loadBodies();
 }
 async function loadBodies(){
   const lang=window.BIRTH_PORTAL_ACTIVE_LANGUAGE||"en";
   const d=window.birthPortalStateLanguage ? Object.assign({},window.birthPortalStateLanguage.T.en,window.birthPortalStateLanguage.T[lang]||{}) : {};
   lb.innerHTML=`<option value="">${d.selectAuthority||"Select saved authority"}</option>`; if(!state.value)return;
   let q=db.from("local_bodies").select("id,name_en").eq("state_id",state.value).eq("is_active",true).order("name_en");
   if(district.value)q=q.eq("district_id",district.value);
   const {data}=await q; (data||[]).forEach(x=>lb.add(new Option(x.name_en,x.id)));
 }
 state.onchange=loadDistricts; district.onchange=loadBodies;

 document.getElementById("certificateForm").onsubmit=async e=>{
   e.preventDefault(); msg.textContent="Saving...";
   try{
     const s=states.find(x=>String(x.id)===state.value);
     const year=new Date(document.getElementById("eventDate").value+"T00:00:00").getFullYear();
     const {data:num,error:numErr}=await db.rpc("next_certificate_number",{p_state_code:s.code,p_certificate_type:type,p_year:year});
     if(numErr)throw numErr;
     const g=id=>document.getElementById(id)?.value?.trim()||null;
     const payload={
       certificate_number:num, registration_number:g("registrationNumber"), certificate_type:type,
       state_id:Number(state.value), district_id:district.value?Number(district.value):null, local_body_id:lb.value||null,
       person_name:g("personName"), gender:g("gender"), date_of_event:g("eventDate"), place_of_event:g("eventPlace"),
       father_name:g("fatherName"), mother_name:g("motherName"), spouse_name:g("spouseName"),
       aadhaar_number:g("aadhaar"), father_aadhaar:g("fatherAadhaar"), mother_aadhaar:g("motherAadhaar"),
       address_at_event:g("addressEvent"), permanent_address:g("permanentAddress"),
       registration_date:g("registrationDate"), issue_date:g("issueDate"), remarks:g("remarks"),
       status:"active", created_by:gate.session.user.id, updated_by:gate.session.user.id
     };
     const {data,error}=await db.from("certificates").insert(payload).select("id,certificate_number,qr_verification_id").single();
     if(error)throw error;
     msg.innerHTML=`Saved: <b>${data.certificate_number}</b> &nbsp; <a href="certificate-view.html?id=${encodeURIComponent(data.id)}">Open Certificate</a>`;
     e.target.reset(); district.innerHTML='<option value="">Select District</option>'; lb.innerHTML='<option value="">Select saved authority</option>';
   }catch(err){msg.textContent="Error: "+err.message}
 };
})();
