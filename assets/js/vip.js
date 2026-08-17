/* =====================================================
   PRISIONER0 VIP
   Activación y sesión VIP
===================================================== */

const VIP_API = "https://prisioner0-vip-api.javiieergutierrez01.workers.dev";


// =====================================================
// OBTENER ID DEL DISPOSITIVO
// =====================================================

function getDeviceId() {

    let deviceId = localStorage.getItem(
        "prisioner0_device_id"
    );

    if (!deviceId) {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {

            deviceId = window.crypto.randomUUID();

        } else {

            deviceId =
                "dev-" +
                Date.now().toString(36) +
                "-" +
                Math.random().toString(36).substring(2, 10) +
                "-" +
                Math.random().toString(36).substring(2, 10);

        }

        localStorage.setItem(
            "prisioner0_device_id",
            deviceId
        );
    }

    return deviceId;
}


// =====================================================
// GUARDAR SESIÓN VIP
// =====================================================

function saveVipSession(data) {

    localStorage.setItem(
        "prisioner0_vip_session",
        data.session_token
    );

    localStorage.setItem(
        "prisioner0_vip_code",
        data.code
    );

    localStorage.setItem(
        "prisioner0_vip_expires",
        data.expires_at
    );
}


// =====================================================
// ACTIVAR VIP
// =====================================================

const activateButton =
    document.getElementById("activateVip");

const vipCodeInput =
    document.getElementById("vipCode");

const vipMessage =
    document.getElementById("vipMessage");


if (activateButton) {

    activateButton.addEventListener("click", async function () {

        const code =
            vipCodeInput.value
                .trim()
                .toUpperCase();

        // ==========================================
        // COMPROBAR CÓDIGO VACÍO
        // ==========================================

        if (!code) {

            vipMessage.textContent =
                "Ingresá un código VIP.";

            return;
        }

        // ==========================================
        // MOSTRAR ESTADO
        // ==========================================

        activateButton.disabled = true;

        vipMessage.textContent =
            "Comprobando código VIP...";

        try {

            // ======================================
            // OBTENER DISPOSITIVO
            // ======================================

            const deviceId =
                getDeviceId();

            // ======================================
            // ENVIAR AL WORKER
            // ======================================

            const response =
                await fetch(
                    `${VIP_API}/activate-code`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            code: code,

                            device_id:
                                deviceId

                        })
                    }
                );

            const data =
                await response.json();

            // ======================================
            // ERROR
            // ======================================

            if (!data.ok) {

                vipMessage.textContent =
                    data.error ||
                    "No se pudo activar el código.";

                return;
            }

            // ======================================
            // GUARDAR SESIÓN
            // ======================================

            saveVipSession(data.vip);

            // ======================================
            // ÉXITO
            // ======================================

            vipMessage.textContent =
                "¡Código VIP activado correctamente!";

            vipMessage.style.color =
                "#7CFF8A";

        } catch (error) {

            console.error(
                "Error VIP:",
                error
            );

            vipMessage.textContent =
                "No se pudo conectar con el servidor VIP.";

        } finally {

            activateButton.disabled = false;

        }

    });

}