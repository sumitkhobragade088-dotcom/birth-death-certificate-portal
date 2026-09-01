(async function(){
 const $=id=>document.getElementById(id), set=(id,v)=>{if($(id))$(id).textContent=v||"—"};
 const id=new URLSearchParams(location.search).get("id");
 if(!id||!window.birthPortalAuth?.ready){set("message","Invalid certificate.");return}
 const gate=await window.birthPortalAuth.requireAdmin();if(!gate)return;const db=window.birthPortalAuth.client;
 const {data:c,error}=await db.from("certificates").select("*,states(name_en,code),districts(name_en),local_bodies(*)").eq("id",id).single();
 if(error){set("message",error.message);return}
 const b=c.local_bodies||{},x=c.extra_fields||{},birth=c.certificate_type==="birth";
 set("serial",c.certificate_number?.split("-").pop());
 set("governmentEn",b.government_en||("GOVERNMENT OF "+(c.states?.name_en||"STATE").toUpperCase()));
 set("governmentLocal",b.government_local);set("departmentEn",b.department_en||"DEPARTMENT OF HEALTH");set("departmentLocal",b.department_local);
 set("bodyEn",b.name_en||"LOCAL REGISTRATION AUTHORITY");set("bodyLocal",b.name_local);
 set("formNoEn",b.form_no_en||(birth?"FORM 5":"DEATH FORM"));set("formNoLocal",b.form_no_local);
 set("certTitle",birth?"BIRTH CERTIFICATE":"DEATH CERTIFICATE");set("certTitleLocal",birth?(b.birth_title_local||""):(b.death_title_local||""));
 set("statutoryEn",b.statutory_text_en);set("statutoryLocal",b.statutory_text_local);set("certifyEn",b.certification_text_en);set("certifyLocal",b.certification_text_local);
 [["labelNameLocal","label_name_local"],["labelGenderLocal","label_gender_local"],["labelDobLocal","label_dob_local"],["labelPobLocal","label_pob_local"],
 ["labelMotherLocal","label_mother_local"],["labelFatherLocal","label_father_local"],["labelBirthAddressLocal","label_birth_address_local"],
 ["labelPermanentAddressLocal","label_permanent_address_local"],["labelRegNoLocal","label_reg_no_local"],["labelRegDateLocal","label_reg_date_local"],
 ["labelRemarksLocal","label_remarks_local"],["labelIssueDateLocal","label_issue_date_local"]].forEach(a=>set(a[0],b[a[1]]));
 set("name",c.person_name);set("nameLocal",x.person_name_local);set("gender",c.gender);set("aadhaar",c.aadhaar_number);
 set("date",c.date_of_event);set("dateWords",x.date_in_words);set("place",c.place_of_event);set("placeLocal",x.place_of_event_local);
 set("mother",c.mother_name);set("motherLocal",x.mother_name_local);set("father",c.father_name);set("fatherLocal",x.father_name_local);
 set("motherAadhaar",c.mother_aadhaar);set("fatherAadhaar",c.father_aadhaar);
 set("addressEvent",c.address_at_event);set("addressEventLocal",x.address_at_event_local);set("permanentAddress",c.permanent_address);set("permanentAddressLocal",x.permanent_address_local);
 set("reg",c.registration_number);set("regDate",c.registration_date);set("remarks",c.remarks);set("remarksLocal",x.remarks_local);set("issue",c.issue_date);
 set("updated",c.updated_at?new Date(c.updated_at).toLocaleString():"");
 set("issuingAuthorityEn",b.issuing_authority_en||"SIGNATURE OF ISSUING AUTHORITY");set("issuingAuthorityLocal",b.issuing_authority_local);
 set("designationEn",b.designation_en);set("designationLocal",b.designation_local);set("authorizedPerson",b.authorized_person_name);
 set("signBodyEn",b.name_en);set("signBodyLocal",b.name_local);set("sloganEn",b.bottom_slogan_en);set("sloganLocal",b.bottom_slogan_local);
 async function img(id,path){if(!path)return;const {data}=await db.storage.from("authority-assets").createSignedUrl(path,3600);if(data?.signedUrl){$(id).src=data.signedUrl;$(id).style.display="block"}}
 await Promise.all([img("stateLogo",b.state_logo_path),img("centerLogo",b.center_logo_path),img("formLogo",b.form_logo_path),img("signature",b.signature_path),img("seal",b.seal_path)]);
 if(c.qr_verification_id&&window.QRCode){const u=new URL("verify.html",location.href);u.searchParams.set("id",c.qr_verification_id);new QRCode($("qr"),{text:u.href,width:128,height:128})}
})();