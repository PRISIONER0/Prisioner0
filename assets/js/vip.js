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

    let deviceId = localStorage.getItem(
        "prisioner0_device_id"
    );

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
// CAMBIAR DISPOSITIVO
// =====================================================

async function changeVipDevice(code, deviceId) {

    try {

        const response =
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

                        device_id: deviceId

                    })
                }
            );

        const data =
            await response.json();

        // ==========================================
        // ERROR
        // ==========================================

        if (!data.ok) {

            vipMessage.textContent =
                data.error ||
                "No se pudo cambiar el dispositivo.";

            vipMessage.style.color =
                "#ff7777";

            return false;
        }

        // ==========================================
        // GUARDAR NUEVA SESIÓN
        // ==========================================

        saveVipSession(data.vip);

        // ==========================================
        // ÉXITO
        // ==========================================

        vipMessage.textContent =
            "¡Dispositivo cambiado correctamente!";

        vipMessage.style.color =
            "#7CFF8A";

        return true;

    } catch (error) {

        console.error(
            "Error cambiando dispositivo:",
            error
        );

        vipMessage.textContent =
            "No se pudo conectar con el servidor VIP.";

        vipMessage.style.color =
            "#ff7777";

        return false;
    }
}


// =====================================================
// MOSTRAR CONFIRMACIÓN DE CAMBIO
// =====================================================

function showDeviceChangeConfirmation(
    code,
    deviceId
) {

    // ==========================================
    // CREAR CONTENEDOR
    // ==========================================

    const overlay =
        document.createElement("div");

    overlay.id =
        "vipChangeOverlay";

    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        padding: 20px;
        box-sizing: border-box;
    `;


    // ==========================================
    // CARTEL
    // ==========================================

    const box =
        document.createElement("div");

    box.style.cssText = `
        width: 100%;
        max-width: 430px;
        background: #151515;
        border: 1px solid rgba(255,255,255,0.12);
        border-radius: 18px;
        padding: 28px;
        box-sizing: border-box;
        text-align: center;
        color: white;
        font-family: inherit;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    `;


    box.innerHTML = `

        <div style="
            font-size: 42px;
            margin-bottom: 12px;
        ">
            👑
        </div>

        <h2 style="
            margin: 0 0 14px;
            font-size: 22px;
        ">
            Tu VIP ya está activo en 2 dispositivos
        </h2>

        <p style="
            margin: 0 0 14px;
            line-height: 1.6;
            color: #cccccc;
        ">
            Este nuevo dispositivo no está registrado.
        </p>

        <p style="
            margin: 0 0 22px;
            line-height: 1.6;
            color: #ffffff;
        ">
            Tenés <strong>1 cambio de dispositivo disponible</strong>.
        </p>

        <p style="
            margin: 0 0 24px;
            line-height: 1.5;
            font-size: 14px;
            color: #aaaaaa;
        ">
            Si continuás, uno de tus dispositivos actuales
            dejará de tener acceso VIP.
            <br><br>
            Este cambio solo puede utilizarse una vez.
        </p>

        <div style="
            display: flex;
            gap: 10px;
            justify-content: center;
        ">

            <button
                id="vipCancelChange"
                style="
                    flex: 1;
                    padding: 12px 16px;
                    border: 1px solid #444;
                    border-radius: 10px;
                    background: #222;
                    color: white;
                    cursor: pointer;
                    font-size: 14px;
                "
            >
                Cancelar
            </button>

            <button
                id="vipConfirmChange"
                style="
                    flex: 1;
                    padding: 12px 16px;
                    border: none;
                    border-radius: 10px;
                    background: #7CFF8A;
                    color: #111;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: bold;
                "
            >
                Cambiar dispositivo
            </button>

        </div>
    `;


    overlay.appendChild(box);

    document.body.appendChild(
        overlay
    );


    // =================================================
    // CANCELAR
    // =================================================

    document
        .getElementById("vipCancelChange")
        .addEventListener(
            "click",
            function () {

                overlay.remove();

                vipMessage.textContent =
                    "No se realizó ningún cambio.";

                vipMessage.style.color =
                    "#cccccc";
            }
        );


    // =================================================
    // CONFIRMAR CAMBIO
    // =================================================

    document
        .getElementById("vipConfirmChange")
        .addEventListener(
            "click",
            async function () {

                const button =
                    this;

                button.disabled =
                    true;

                button.textContent =
                    "Cambiando...";

                const success =
                    await changeVipDevice(
                        code,
                        deviceId
                    );

                if (success) {

                    overlay.remove();

                } else {

                    button.disabled =
                        false;

                    button.textContent =
                        "Cambiar dispositivo";
                }

            }
        );
}


// =====================================================
// ELEMENTOS
// =====================================================

const activateButton =
    document.getElementById(
        "activateVip"
    );

const vipCodeInput =
    document.getElementById(
        "vipCode"
    );

const vipMessage =
    document.getElementById(
        "vipMessage"
    );


// =====================================================
// ACTIVAR VIP
// =====================================================

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
                    "#ff7777";

                return;
            }


            // ==========================================
            // ESTADO
            // ==========================================

            activateButton.disabled =
                true;

            vipMessage.textContent =
                "Comprobando código VIP...";

            vipMessage.style.color =
                "#cccccc";


            try {

                // ======================================
                // DISPOSITIVO
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
                // ACTIVAR
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

                                code:
                                    code,

                                device_id:
                                    deviceId

                            })
                        }
                    );


                const data =
                    await response.json();


                // ======================================
                // ¿NECESITA CAMBIO?
                // ======================================

                if (
                    data.requires_change === true
                ) {

                    activateButton.disabled =
                        false;

                    vipMessage.textContent =
                        "Tu código VIP necesita un cambio de dispositivo.";

                    vipMessage.style.color =
                        "#ffd166";


                    showDeviceChangeConfirmation(
                        code,
                        deviceId
                    );

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
                        "#ff7777";

                    return;
                }


                // ======================================
                // GUARDAR SESIÓN
                // ======================================

                saveVipSession(
                    data.vip
                );


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

                vipMessage.style.color =
                    "#ff7777";

            } finally {

                activateButton.disabled =
                    false;
            }

        }
    );
}