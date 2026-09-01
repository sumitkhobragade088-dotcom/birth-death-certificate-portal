(async function(){
 const id=new URLSearchParams(location.search).get("id"), m=document.getElementById("message");
 if(!id||!window.birthPortalAuth?.ready){m.textContent="Invalid certificate.";return}
 const gate=await window.birthPortalAuth.requireAdmin(); if(!gate)return;
 const db=window.birthPortalAuth.client;

 const {data:c,error}=await db.from("certificates")
   .select("*,states(name_en,code),districts(name_en),local_bodies(*)")
   .eq("id",id).single();
 if(error){m.textContent=error.message;return}

 const set=(x,v)=>{const e=document.getElementById(x);if(e)e.textContent=(v??"")||"—"};
 const ef=c.extra_fields||{}, b=c.local_bodies||{};
 let stateRow=c.states||null;

 // Older test certificates can be missing the joined state relation.
 // Recover state from certificate prefix (e.g. MH-B-...) when possible.
 if(!stateRow && c.certificate_number){
   const code=String(c.certificate_number).split("-")[0];
   const {data:s}=await db.from("states").select("id,name_en,code").eq("code",code).maybeSingle();
   if(s)stateRow=s;
 }

 const lang=window.birthPortalStateLanguage?.STATE_LANGUAGE?.[stateRow?.code]||ef.local_language||"en";
 const T=window.birthPortalStateLanguage?.T||{}, d=Object.assign({},T.en||{},T[lang]||{});
 const birth=c.certificate_type==="birth";

 set("serial",c.certificate_number?.split("-").pop());
 set("stateHeading",(stateRow?.name_en||"STATE / UNION TERRITORY").toUpperCase());
 set("stateLocal","");
 set("department",(b.department_en||"DEPARTMENT OF HEALTH").toUpperCase());
 set("bodyHeading",(b.name_en||"LOCAL REGISTRATION AUTHORITY").toUpperCase());
 set("bodyLocal",b.name_local);
 set("formNo",birth?"FORM 5":"DEATH CERTIFICATE");
 set("formNoLocal",birth?"प्रपत्र-5":"");
 set("title",birth?"BIRTH CERTIFICATE":"DEATH CERTIFICATE");
 set("titleLocal",birth?(d.birthTitle||""):(d.deathTitle||""));
 set("legalEn",birth?"CERTIFICATE OF BIRTH — DETAILS RECORDED IN THE PORTAL.":"CERTIFICATE OF DEATH — DETAILS RECORDED IN THE PORTAL.");
 set("legalLocal","");

 set("name",c.person_name);set("nameLocal",ef.person_name_local);
 set("gender",c.gender);set("aadhaar",c.aadhaar_number);
 set("date",c.date_of_event);set("place",c.place_of_event);set("placeLocal",ef.place_of_event_local);
 set("mother",c.mother_name);set("motherLocal",ef.mother_name_local);
 set("father",c.father_name);set("fatherLocal",ef.father_name_local);
 set("motherAadhaar",c.mother_aadhaar);set("fatherAadhaar",c.father_aadhaar);
 set("addressEvent",c.address_at_event);set("addressEventLocal",ef.address_at_event_local);
 set("permanentAddress",c.permanent_address);set("permanentAddressLocal",ef.permanent_address_local);
 set("reg",c.registration_number);set("regDate",c.registration_date);
 set("number",c.certificate_number);set("issue",c.issue_date);
 set("remarks",c.remarks);set("remarksLocal",ef.remarks_local);
 set("updated",c.updated_at?new Date(c.updated_at).toLocaleString():"");
 set("dateLabel",birth?"DATE OF BIRTH":"DATE OF DEATH");
 set("placeLabel",birth?"PLACE OF BIRTH":"PLACE OF DEATH");
 set("addressEventLabel",birth?"ADDRESS OF PARENTS AT THE TIME OF BIRTH":"ADDRESS AT THE TIME OF DEATH");

 set("designation",b.designation_en||"AUTHORIZED REGISTRAR");
 set("authorityPerson",b.authorized_person_name||"");
 set("bodySign",b.name_en||"");

 async function privateAsset(path){
   if(!path)return null;
   const {data,error}=await db.storage.from("authority-assets").createSignedUrl(path,3600);
   if(error)return null;
   return data?.signedUrl||null;
 }
 async function showImg(id,path){
   const src=await privateAsset(path); if(!src)return;
   const e=document.getElementById(id); if(!e)return;
   e.src=src;e.style.display="block";
   if(id==="formLogo"){const p=document.getElementById("formPlaceholder");if(p)p.style.display="none"}
 }
 await Promise.all([
   showImg("authorityLogo",b.state_logo_path),
   showImg("formLogo",b.form_logo_path),
   showImg("signatureImg",b.signature_path),
   showImg("sealImg",b.seal_path)
 ]);

 const u=new URL("verify.html",location.href);
 u.searchParams.set("id",c.qr_verification_id);
 set("verifyUrl",u.href);
 const qr=document.getElementById("qr");
 if(qr && window.QRCode && c.qr_verification_id){
   qr.innerHTML="";
   new QRCode(qr,{text:u.href,width:128,height:128,correctLevel:QRCode.CorrectLevel.M});
 } else if(qr) {
   qr.textContent="QR unavailable";
 }
})();