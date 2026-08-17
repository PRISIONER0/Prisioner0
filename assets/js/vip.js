/* =====================================================
   PRISIONER0 VIP
   Activación y sesión VIP
===================================================== */

const VIP_API =
    "https://prisioner0-vip-api.javiieergutierrez01.workers.dev";


// =====================================================
// OBTENER ID DEL DISPOSITIVO
// =====================================================

function getDeviceId() {

    let deviceId =
        localStorage.getItem("prisioner0_device_id");

    if (!deviceId) {

        if (
            window.crypto &&
            typeof window.crypto.randomUUID === "function"
        ) {

            deviceId =
                window.crypto.randomUUID();

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

    activateButton.addEventListener(
        "click",
        async function () {

            const code =
                vipCodeInput.value
                    .trim()
                    .toUpperCase();

            // ==========================================
            // CÓDIGO VACÍO
            // ==========================================

            if (!code) {

                vipMessage.textContent =
                    "Ingresá un código VIP.";

                vipMessage.style.color =
                    "#aaa";

                return;
            }

            activateButton.disabled = true;

            vipMessage.textContent =
                "Comprobando código VIP...";

            vipMessage.style.color =
                "#aaa";


            try {

                // ======================================
                // OBTENER DISPOSITIVO
                // ======================================

                const deviceId =
                    getDeviceId();


                console.log(
                    "CÓDIGO:",
                    code
                );

                console.log(
                    "DEVICE ID:",
                    deviceId
                );


                // ======================================
                // COMPROBAR / ACTIVAR
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
                // NECESITA CAMBIO
                // ======================================

                if (
                    response.status === 409 &&
                    data.requires_change === true
                ) {

                    const confirmar =
                        confirm(
                            "⚠️ Este código VIP ya está activo en 2 dispositivos.\n\n" +
                            "Podés utilizar tu ÚNICO cambio de dispositivo para activar este dispositivo.\n\n" +
                            "El dispositivo más antiguo será reemplazado.\n\n" +
                            "¿Querés utilizar tu cambio?"
                        );


                    // ==================================
                    // USUARIO CANCELÓ
                    // ==================================

                    if (!confirmar) {

                        vipMessage.textContent =
                            "No se realizó ningún cambio.";

                        vipMessage.style.color =
                            "#aaa";

                        return;
                    }


                    // ==================================
                    // CONFIRMÓ → CAMBIAR DISPOSITIVO
                    // ==================================

                    vipMessage.textContent =
                        "Cambiando dispositivo...";


                    const changeResponse =
                        await fetch(
                            `${VIP_API}/change-device`,
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


                    const changeData =
                        await changeResponse.json();


                    // ==================================
                    // ERROR EN CAMBIO
                    // ==================================

                    if (!changeData.ok) {

                        vipMessage.textContent =
                            changeData.error ||
                            "No se pudo cambiar el dispositivo.";

                        vipMessage.style.color =
                            "#ff7070";

                        return;
                    }


                    // ==================================
                    // GUARDAR NUEVA SESIÓN
                    // ==================================

                    saveVipSession(
                        changeData.vip
                    );


                    vipMessage.textContent =
                        "¡Dispositivo reemplazado correctamente!";

                    vipMessage.style.color =
                        "#7CFF8A";


                    return;
                }


                // ======================================
                // ERROR NORMAL
                // ======================================

                if (!data.ok) {

                    vipMessage.textContent =
                        data.error ||
                        "No se pudo activar el código.";

                    vipMessage.style.color =
                        "#ff7070";

                    return;
                }


                // ======================================
                // ACTIVACIÓN NORMAL
                // ======================================

                saveVipSession(
                    data.vip
                );


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

                vipMessage.style.color =
                    "#ff7070";

            } finally {

                activateButton.disabled = false;

            }

        }
    );

}