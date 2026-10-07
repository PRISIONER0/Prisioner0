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
// SOLICITAR DESCARGA VIP
// ============================================

async function requestVipDownload(platform) {

    const sessionToken =
        localStorage.getItem("prisioner0_vip_session");

    if (!sessionToken) {
        alert("Necesitas tener una suscripción VIP activa.");
        return;
    }

    try {

        // Buscar todos los botones de descarga
        const buttons =
            document.querySelectorAll("#vipAccess .download-btn");

        buttons.forEach(button => {
            button.style.pointerEvents = "none";
            button.style.opacity = "0.6";
        });

        const response = await fetch(
            `${VIP_ACCESS_API}/create-download`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    session_token: sessionToken,
                    game: "1a",
                    platform: platform
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.ok || !data.url) {

            throw new Error(
                data.error || "No se pudo generar el enlace."
            );
        }

        // Abrir el enlace temporal generado por el Worker
        window.location.href = data.url;

    } catch (error) {

        console.error("Error generando descarga:", error);

        alert(
            "No se pudo generar el enlace de descarga. " +
            "Inténtalo nuevamente."
        );

        const buttons =
            document.querySelectorAll("#vipAccess .download-btn");

        buttons.forEach(button => {
            button.style.pointerEvents = "";
            button.style.opacity = "";
        });
    }
}


// ============================================
// INICIAR
// ============================================

document.addEventListener("DOMContentLoaded", () => {

    checkVipAccess();

});