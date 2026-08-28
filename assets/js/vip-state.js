// =====================================================
// PRISIONER0 VIP
// ESTADO VIP COMPARTIDO
// =====================================================

const VIP_API =
    "https://prisioner0-vip-api.javiieergutierrez01.workers.dev";

// =====================================================
// VARIABLES GLOBALES
// =====================================================

window.prisioner0Vip = {
    activo: false,
    comprobado: false,
    cargando: false,
    expires_at: null,
    code: null
};

// =====================================================
// COMPROBAR ESTADO VIP UNA SOLA VEZ
// =====================================================

async function checkVipGlobal() {

    // Si ya se comprobó, devolver el resultado existente
    if (window.prisioner0Vip.comprobado) {
        return window.prisioner0Vip.activo;
    }

    // Si ya hay una comprobación en curso,
    // esperar a que termine
    if (window.prisioner0Vip.cargando) {

        return new Promise(resolve => {

            const esperar = setInterval(() => {

                if (!window.prisioner0Vip.cargando) {

                    clearInterval(esperar);

                    resolve(
                        window.prisioner0Vip.activo
                    );
                }

            }, 50);

        });
    }

    window.prisioner0Vip.cargando = true;

    const sessionToken =
        localStorage.getItem(
            "prisioner0_vip_session"
        );

    // =================================================
    // NO HAY SESIÓN
    // =================================================

    if (!sessionToken) {

        window.prisioner0Vip.activo = false;
        window.prisioner0Vip.comprobado = true;
        window.prisioner0Vip.cargando = false;

        return false;
    }

    // =================================================
    // CONSULTAR WORKER
    // =================================================

    try {

        const response = await fetch(
            `${VIP_API}/check-session`,
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

        const data =
            await response.json();

        // =================================================
        // VIP ACTIVO
        // =================================================

        if (
            data.ok === true &&
            data.vip === true
        ) {

            window.prisioner0Vip.activo = true;

            window.prisioner0Vip.expires_at =
                data.expires_at || null;

            window.prisioner0Vip.code =
                data.code || null;

        }

        // =================================================
        // VIP INACTIVO / EXPIRADO
        // =================================================

        else {

            window.prisioner0Vip.activo = false;

            window.prisioner0Vip.expires_at = null;

            window.prisioner0Vip.code = null;
        }

    } catch (error) {

        console.error(
            "Error comprobando estado VIP:",
            error
        );

        // Si el Worker no responde,
        // NO asumimos que el usuario es VIP.
        window.prisioner0Vip.activo = false;

    }

    window.prisioner0Vip.comprobado = true;
    window.prisioner0Vip.cargando = false;

    return window.prisioner0Vip.activo;
}

// =====================================================
// INICIAR COMPROBACIÓN AL CARGAR
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        checkVipGlobal();

    }
);