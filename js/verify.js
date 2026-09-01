(async function(){
 const box=document.getElementById("verificationResult"), token=new URLSearchParams(location.search).get("id");
 if(!token){box.textContent="No verification ID supplied.";return}
 if(!window.supabase||!window.BIRTH_PORTAL_SUPABASE_URL){box.textContent="Verification service configuration missing.";return}
 const db=window.supabase.createClient(window.BIRTH_PORTAL_SUPABASE_URL,window.BIRTH_PORTAL_SUPABASE_ANON_KEY);
 const {data,error}=await db.rpc("verify_certificate",{p_token:token});
 if(error){box.textContent="Verification error: "+error.message;return}
 const r=data?.[0]; if(!r){box.innerHTML="<b>Certificate not verified.</b>";return}
 box.innerHTML=`<h2>Verified Record</h2><p><b>${esc(r.certificate_number)}</b></p><p>${esc(r.certificate_type)} • ${esc(r.person_name)}</p>
 <p>${esc(r.state)} ${r.district?"• "+esc(r.district):""}</p><p>${r.local_body?esc(r.local_body):""}</p><p>Status: ${esc(r.status)}</p>`;
 function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
})();
