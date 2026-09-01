(async function () {
  const form = document.getElementById("hospitalForm");
  const list = document.getElementById("hospitalList");

  if (!window.birthPortalAuth?.ready) {
    list.textContent = window.birthPortalAuth?.error || "Supabase config missing.";
    return;
  }

  const gate = await window.birthPortalAuth.requireAdmin();
  if (!gate) return;
  const db = window.birthPortalAuth.client;

  async function stateIdByName(name) {
    const { data, error } = await db.from("states").select("id").eq("name_en", name).single();
    if (error) throw error;
    return data.id;
  }

  async function render() {
    const { data, error } = await db
      .from("local_bodies")
      .select("id,name_en,name_local,authority_type,taluka_block,designation_en,states(name_en),districts(name_en)")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      list.textContent = error.message;
      return;
    }

    list.innerHTML = data?.length ? data.map(r => `
      <div class="panel">
        <b>${r.name_en || ""}</b><br>
        ${r.name_local || ""}<br>
        ${r.authority_type || ""} — ${r.taluka_block || ""} ${r.states?.name_en ? ", "+r.states.name_en : ""}
        <br><small>${r.designation_en || ""}</small>
      </div>`).join("") : "No saved hospitals / authorities yet.";
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    try {
      const sid = await stateIdByName(document.getElementById("state").value);

      const payload = {
        state_id: sid,
        taluka_block: document.getElementById("taluka").value.trim() || null,
        authority_type: document.getElementById("type").value,
        name_en: document.getElementById("nameEn").value.trim(),
        name_local: document.getElementById("nameLocal").value.trim() || null,
        department_en: document.getElementById("department").value.trim() || null,
        designation_en: document.getElementById("designation").value.trim() || null,
        created_by: gate.session.user.id
      };

      const { error } = await db.from("local_bodies").insert(payload);
      if (error) throw error;
      form.reset();
      alert("Hospital / Local Authority saved.");
      await render();
    } catch (err) {
      alert(err.message);
    }
  });

  await render();
})();
