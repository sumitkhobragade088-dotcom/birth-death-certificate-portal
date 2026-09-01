(function () {
  function configReady() {
    return window.BIRTH_PORTAL_SUPABASE_URL &&
      window.BIRTH_PORTAL_SUPABASE_ANON_KEY &&
      !window.BIRTH_PORTAL_SUPABASE_URL.includes("PASTE_") &&
      !window.BIRTH_PORTAL_SUPABASE_ANON_KEY.includes("PASTE_");
  }

  if (!configReady()) {
    window.birthPortalAuth = {
      ready: false,
      error: "Supabase config missing. Open js/supabase-config.js and paste Project URL + anon key."
    };
    return;
  }

  const client = window.supabase.createClient(
    window.BIRTH_PORTAL_SUPABASE_URL,
    window.BIRTH_PORTAL_SUPABASE_ANON_KEY
  );

  async function getSession() {
    const { data, error } = await client.auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async function requireAdmin() {
    const session = await getSession();
    if (!session) {
      location.replace("login.html");
      return null;
    }

    const { data: admin, error } = await client
      .from("admins")
      .select("user_id,full_name,role,is_active")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error || !admin || !admin.is_active) {
      await client.auth.signOut();
      location.replace("login.html?error=not_admin");
      return null;
    }

    return { session, admin };
  }

  async function logout() {
    await client.auth.signOut();
    location.replace("login.html");
  }

  window.birthPortalAuth = {
    ready: true,
    client,
    getSession,
    requireAdmin,
    logout
  };
})();
