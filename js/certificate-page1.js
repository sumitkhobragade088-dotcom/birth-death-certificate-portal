(async()=>{
const $=x=>document.getElementById(x), set=(x,v)=>{if($(x))$(x).textContent=(v??"")||"—"};
const id=new URLSearchParams(location.search).get("id");
if(!id||!window.birthPortalAuth?.ready){set("message","Invalid certificate");return}
const gate=await window.birthPortalAuth.requireAdmin();if(!gate)return;const db=window.birthPortalAuth.client;
const {data:c,error}=await db.from("certificates").select("*,states(name_en),districts(name_en),local_bodies(*)").eq("id",id).single();
if(error){set("message",error.message);return}
const b=c.local_bodies||{},x=c.extra_fields||{};
const rep=(s="")=>String(s)
.replaceAll("{{AUTHORITY_EN}}",b.name_en||"")
.replaceAll("{{AUTHORITY_LOCAL}}",b.name_local||"")
.replaceAll("{{TALUKA}}",b.taluka_block||"")
.replaceAll("{{DISTRICT}}",c.districts?.name_en||x.district_name_fallback||"")
.replaceAll("{{STATE}}",c.states?.name_en||"")
.replaceAll("{{STATE_LOCAL}}",b.government_local||c.states?.name_en||"");

set("serial",c.certificate_number?.split("-").pop());set("serialLocal","क्रमांक "+(c.certificate_number?.split("-").pop()||""));
set("governmentEn",b.government_en||("GOVERNMENT OF "+(c.states?.name_en||"").toUpperCase()));set("governmentLocal",b.government_local);
set("departmentEn",b.department_en||"DEPARTMENT OF HEALTH");set("departmentLocal",b.department_local);
set("authorityEn",b.name_en);set("authorityLocal",b.name_local);set("formNoEn",b.form_no_en||"FORM 5");set("formNoLocal",b.form_no_local);
set("titleEn",b.birth_title_en||"BIRTH CERTIFICATE");set("titleLocal",b.birth_title_local);
set("statutoryEn",rep(b.statutory_text_en));set("statutoryLocal",rep(b.statutory_text_local));set("certifyEn",rep(b.certification_text_en));set("certifyLocal",rep(b.certification_text_local));

set("ln",b.label_name_local);set("lg",b.label_gender_local);set("ldob",b.label_dob_local);set("lpob",b.label_pob_local);set("lm",b.label_mother_local);set("lf",b.label_father_local);
set("lba",b.label_birth_address_local);set("lpa",b.label_permanent_address_local);set("lrn",b.label_reg_no_local);set("lrd",b.label_reg_date_local);set("lrem",b.label_remarks_local);set("lid",b.label_issue_date_local);

set("name",c.person_name);set("nameLocal",x.person_name_local);set("gender",c.gender);set("aadhaar",c.aadhaar_number);
set("dob",c.date_of_event);set("dobWords",x.date_in_words);set("dobWordsLocal",x.date_in_words_local);
set("pob",c.place_of_event);set("pobLocal",x.place_of_event_local);set("mother",c.mother_name);set("motherLocal",x.mother_name_local);set("father",c.father_name);set("fatherLocal",x.father_name_local);
set("motherAadhaar",c.mother_aadhaar);set("fatherAadhaar",c.father_aadhaar);set("birthAddress",c.address_at_event);set("birthAddressLocal",x.address_at_event_local);
set("permanentAddress",c.permanent_address);set("permanentAddressLocal",x.permanent_address_local);set("regNo",c.registration_number);set("regDate",c.registration_date);
set("remarks",c.remarks);set("remarksLocal",x.remarks_local);set("issueDate",c.issue_date);set("updated",c.updated_at?new Date(c.updated_at).toLocaleString():"");

set("qrTextEn",b.qr_text_en||"This QR code can be used to check the authenticity of the certificate");set("qrTextLocal",b.qr_text_local);
set("issuingEn",b.issuing_authority_en||"SIGNATURE OF ISSUING AUTHORITY");set("issuingLocal",b.issuing_authority_local);
set("designationEn",b.designation_en);set("designationLocal",b.designation_local);set("person",b.authorized_person_name);
set("signAuthorityEn",b.name_en);set("signAuthorityLocal",b.name_local);set("sloganEn",b.bottom_slogan_en);set("sloganLocal",b.bottom_slogan_local);

async function image(id,path){if(!path)return;const {data}=await db.storage.from("authority-assets").createSignedUrl(path,3600);if(data?.signedUrl){$(id).src=data.signedUrl;$(id).style.display="block"}}
await Promise.all([image("leftLogo",b.state_logo_path),image("centerLogo",b.center_logo_path),image("rightLogo",b.form_logo_path),image("signature",b.signature_path),image("seal",b.seal_path)]);
if(c.qr_verification_id&&window.QRCode){const u=new URL("verify.html",location.href);u.searchParams.set("id",c.qr_verification_id);new QRCode($("qr"),{text:u.href,width:128,height:128})}
})();