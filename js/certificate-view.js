(async function(){
 const id=new URLSearchParams(location.search).get("id"), m=document.getElementById("message");
 if(!id||!window.birthPortalAuth?.ready){m.textContent="Invalid certificate.";return}
 const gate=await window.birthPortalAuth.requireAdmin(); if(!gate)return; const db=window.birthPortalAuth.client;
 const {data:c,error}=await db.from("certificates").select("*,states(name_en),districts(name_en),local_bodies(name_en)").eq("id",id).single();
 if(error){m.textContent=error.message;return}
 const set=(x,v)=>document.getElementById(x).textContent=v||"—";
 set("title",(c.certificate_type==="birth"?"Birth":"Death")+" Certificate"); set("number",c.certificate_number);set("reg",c.registration_number);set("name",c.person_name);
 set("gender",c.gender);set("date",c.date_of_event);set("place",c.place_of_event);set("father",c.father_name);set("mother",c.mother_name);set("spouse",c.spouse_name);
 set("stateName",c.states?.name_en);set("districtName",c.districts?.name_en);set("bodyName",c.local_bodies?.name_en);set("issue",c.issue_date);
 const u=new URL("verify.html",location.href); u.searchParams.set("id",c.qr_verification_id); set("verifyUrl",u.href);
 new QRCode(document.getElementById("qr"),{text:u.href,width:128,height:128});
})();
