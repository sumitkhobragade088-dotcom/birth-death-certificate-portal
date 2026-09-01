(async function () {
  const msg = document.getElementById("dashboardMessage");

  if (!window.birthPortalAuth?.ready) {
    msg.textContent = window.birthPortalAuth?.error || "Supabase configuration missing.";
    return;
  }

  const gate = await window.birthPortalAuth.requireAdmin();
  if (!gate) return;

  document.getElementById("adminIdentity").textContent =
    `${gate.admin.full_name || gate.session.user.email} • ${gate.admin.role}`;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.birthPortalAuth.logout();
  });

  const db = window.birthPortalAuth.client;

  async function countCertificates(extraFilter) {
    let q = db.from("certificates").select("*", { count: "exact", head: true });
    if (extraFilter) q = extraFilter(q);
    const { count, error } = await q;
    if (error) throw error;
    return count || 0;
  }

  try {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const [total, birth, death, today, month, reprints] = await Promise.all([
      countCertificates(),
      countCertificates(q => q.eq("certificate_type", "birth")),
      countCertificates(q => q.eq("certificate_type", "death")),
      countCertificates(q => q.gte("created_at", todayStart)),
      countCertificates(q => q.gte("created_at", monthStart)),
      db.from("certificate_history").select("*", { count: "exact", head: true }).eq("action", "reprint")
    ]);

    document.getElementById("totalCertificates").textContent = total;
    document.getElementById("birthCertificates").textContent = birth;
    document.getElementById("deathCertificates").textContent = death;
    document.getElementById("todayCreated").textContent = today;
    document.getElementById("monthCreated").textContent = month;
    document.getElementById("reprintCount").textContent = reprints.count || 0;

    const { data: recent, error } = await db
      .from("certificates")
      .select("certificate_number,certificate_type,person_name,status,created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;

    const tbody = document.getElementById("recentRows");
    tbody.innerHTML = recent?.length
      ? recent.map(r => `
        <tr>
          <td>${escapeHtml(r.certificate_number || "")}</td>
          <td>${escapeHtml(r.certificate_type || "")}</td>
          <td>${escapeHtml(r.person_name || "")}</td>
          <td>${escapeHtml(r.status || "")}</td>
          <td>${new Date(r.created_at).toLocaleString()}</td>
        </tr>`).join("")
      : `<tr><td colspan="5">No certificates yet.</td></tr>`;
  } catch (e) {
    msg.textContent = "Dashboard data error: " + e.message;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    })[c]);
  }
})();
