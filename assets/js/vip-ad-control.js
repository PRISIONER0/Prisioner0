/* =====================================================
   PRISIONER0 SFW — CONTROL CENTRALIZADO DE HILLTOPADS
   Editá este archivo para cambiar la publicidad.
   VIP y PREMIUM activos nunca reciben el popunder.
===================================================== */

const HILLTOPADS_CONFIG = {
    enabled: true,
    scriptUrl: "//surefootedpause.com/csDR9W6gb.2F5rl/SSW/Qx9kNxzLYT1pMxDXkx4/M_S/0_3HN/j/Uvw/OvT/go1O",
    maxLoads: 3,
    windowMinutes: 60,
    vipApi: "https://prisioner0-vip-api.javiieergutierrez01.workers.dev",
    premiumApi: "https://prisioner0-premium-api.javiieergutierrez01.workers.dev",
    vipStorageKey: "prisioner0_vip_session",
    premiumStorageKey: "prisioner0_premium_session",
    frequencyStorageKey: "prisioner0_hilltopads_loads"
};

(async function initHilltopAds() {
    if (!HILLTOPADS_CONFIG.enabled) return;

    const vipToken = localStorage.getItem(HILLTOPADS_CONFIG.vipStorageKey);
    const premiumToken = localStorage.getItem(HILLTOPADS_CONFIG.premiumStorageKey);

    async function checkSession(api, token, type) {
        if (!token) return false;
        try {
            const response = await fetch(`${api}/check-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_token: token })
            });
            if (!response.ok) return null;
            const data = await response.json();
            if (type === "vip") return data.ok === true && data.vip === true;
            if (type === "premium") return data.ok === true && data.premium === true;
            return false;
        } catch (error) {
            console.error(`No se pudo comprobar la sesión ${type}:`, error);
            return null;
        }
    }

    const [vipStatus, premiumStatus] = await Promise.all([
        checkSession(HILLTOPADS_CONFIG.vipApi, vipToken, "vip"),
        checkSession(HILLTOPADS_CONFIG.premiumApi, premiumToken, "premium")
    ]);

    if (vipStatus === true || premiumStatus === true) return;
    if ((vipToken && vipStatus === null) || (premiumToken && premiumStatus === null)) return;

    // Máximo 3 cargas del script en cualquier período móvil de 60 minutos.
    const now = Date.now();
    const windowMs = HILLTOPADS_CONFIG.windowMinutes * 60 * 1000;
    let loads = [];
    try {
        const stored = JSON.parse(localStorage.getItem(HILLTOPADS_CONFIG.frequencyStorageKey) || "[]");
        if (Array.isArray(stored)) loads = stored.filter(value => Number.isFinite(value) && now - value < windowMs && now >= value);
        if (loads.length >= HILLTOPADS_CONFIG.maxLoads) return;
        loads.push(now);
        localStorage.setItem(HILLTOPADS_CONFIG.frequencyStorageKey, JSON.stringify(loads));
    } catch (error) {
        console.warn("No se pudo aplicar el límite local de HilltopAds:", error);
    }

    if (document.getElementById("prisioner0-hilltopads-script")) return;

    const script = document.createElement("script");
    script.id = "prisioner0-hilltopads-script";
    script.settings = {};
    script.src = HILLTOPADS_CONFIG.scriptUrl;
    script.async = true;
    script.referrerPolicy = "no-referrer-when-downgrade";

    const currentScript = document.currentScript;
    if (currentScript && currentScript.parentNode) {
        currentScript.parentNode.insertBefore(script, currentScript.nextSibling);
    } else {
        (document.head || document.body).appendChild(script);
    }
})();
