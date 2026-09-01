(async function(){
 if(!window.birthPortalAuth?.ready)return; const gate=await window.birthPortalAuth.requireAdmin(); if(!gate)return;
 const db=window.birthPortalAuth.client, rows=document.getElementById("rows");
 async function load(){
  const term=document.getElementById("search").value.trim();
  let q=db.from("certificates").select("id,certificate_number,certificate_type,person_name,status,created_at").order("created_at",{ascending:false}).limit(100);
  if(term) q=q.or(`certificate_number.ilike.%${term.replace(/[%(),]/g,"")}%,person_name.ilike.%${term.replace(/[%(),]/g,"")}%`);
  const {data,error}=await q; if(error){rows.innerHTML=`<tr><td colspan="5">${error.message}</td></tr>`;return}
  rows.innerHTML=(data||[]).map(r=>`<tr><td>${esc(r.certificate_number)}</td><td>${esc(r.certificate_type)}</td><td>${esc(r.person_name)}</td><td>${esc(r.status)}</td>
  <td><a href="certificate-view.html?id=${encodeURIComponent(r.id)}">View / Print</a> <button class="secondary reprint" data-id="${r.id}">Reprint</button></td></tr>`).join("")||'<tr><td colspan="5">No records.</td></tr>';
  document.querySelectorAll(".reprint").forEach(b=>b.onclick=async()=>{
    const {error}=await db.from("certificate_history").insert({certificate_id:b.dataset.id,action:"reprint",changed_by:gate.session.user.id});
    if(error)alert(error.message); else {alert("Reprint logged."); location.href="certificate-view.html?id="+encodeURIComponent(b.dataset.id)}
  });
 }
 const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
 document.getElementById("searchBtn").onclick=load; await load();
})();
