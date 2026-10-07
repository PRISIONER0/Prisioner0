// ============================================
// PRISIONER0 VIP ACCESS
// ============================================

const VIP_ACCESS_API =
    "https://prisioner0-vip-api.javiieergutierrez01.workers.dev";


// ============================================
// COMPROBAR SESIÓN VIP
// ============================================

async function checkVipAccess() {

    const sessionToken =
        localStorage.getItem("prisioner0_vip_session");

    // No hay sesión
    if (!sessionToken) {
        showVipAccessLocked();
        return false;
    }

    try {

        const response = await fetch(`${VIP_ACCESS_API}/check-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                session_token: sessionToken
            })
        });

        const data = await response.json();

        if (data.ok === true && data.vip === true) {

            showVipAccessUnlocked();
            return true;

        }

        // Sesión inválida
        showVipAccessLocked();

        return false;

    } catch (error) {

        console.error("Error comprobando acceso VIP:", error);

        showVipAccessLocked();

        return false;
    }
}


// ============================================
// ESTADO: NO VIP
// ============================================

function showVipAccessLocked() {

    const container =
        document.getElementById("vipAccess");

    if (!container) return;

    container.innerHTML = `
        <a href="../vip.html" class="download-btn">
            <i class="fa-solid fa-lock"></i>
            Obtener acceso VIP
        </a>
    `;
}


// ============================================
// ESTADO: VIP ACTIVADO
// ============================================

function showVipAccessUnlocked() {
    const container = document.getElementById("vipAccess");
    if (!container) return;

    container.innerHTML = `
        <a href="#"
           class="download-btn"
           onclick="requestVipDownload('pc'); return false;">

            <i class="fa-solid fa-desktop"></i>

            Descargar Traduccion EN / ES-LAT / PT (PC)

        </a>

        <a href="#"
           class="download-btn"
           onclick="requestVipDownload('android'); return false;">

            <i class="fa-solid fa-mobile-screen-button"></i>

            Descargar juego EN / ES-LAT / PT (Android)

        </a>
    `;
}


// ============================================
// SOLICITAR DESCARGA VIP
// ============================================

async function requestVipDownload(platform) {

    const sessionToken =
        localStorage.getItem("prisioner0_vip_session");

    if (!sessionToken) {
        alert("Necesitas tener una suscripción VIP activa.");
        return;
    }

    // Comprobar nuevamente que la sesión VIP siga activa
    try {

        const response = await fetch(
            `${VIP_ACCESS_API}/check-session`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session_token: sessionToken
                })
            }
        );

        const data = await response.json();

        if (!data.ok || data.vip !== true) {
            alert("Tu sesión VIP no está activa.");
            return;
        }

        // ================================
        // DESCARGA DEL JUEGO
        // ================================

        if (platform === "pc") {

            window.location.href =
                "https://pixeldrain.com/api/file/tKw3zKu4?download";

        }

    } catch (error) {

        console.error(
            "Error comprobando acceso VIP:",
            error
        );

        alert(
            "No se pudo comprobar tu acceso VIP. " +
            "Inténtalo nuevamente."
        );
    }
}


// ============================================
// INICIAR
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    checkVipAccess();

});