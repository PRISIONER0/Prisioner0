/* =====================================================
   PRISIONER0 PREMIUM
   Activación, validación de sesión y dispositivos
   Sistema independiente de VIP
===================================================== */

const PREMIUM_API =
    "https://prisioner0-premium-api.javiieergutierrez01.workers.dev";

const PREMIUM_SESSION_KEY = "prisioner0_premium_session";
const PREMIUM_CODE_KEY = "prisioner0_premium_code";
const PREMIUM_EXPIRES_KEY = "prisioner0_premium_expires";

const PREMIUM_REQUEST_TIMEOUT = 15000;


// =====================================================
// ELEMENTOS
// =====================================================

const premiumCodeInput = document.getElementById("premiumCode");
const premiumActivateButton = document.getElementById("activatePremium");
const premiumMessage = document.getElementById("premiumMessage");
const premiumActivateForm = document.getElementById("premiumActivateForm");
const premiumActivePanel = document.getElementById("premiumActivePanel");
const premiumLogoutButton = document.getElementById("premiumLogout");


// =====================================================
// PETICIONES AL WORKER CON TIEMPO LÍMITE
// =====================================================

async function premiumFetch(endpoint, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, PREMIUM_REQUEST_TIMEOUT);

    try {

        const response = await fetch(`${PREMIUM_API}${endpoint}`, {
            ...options,
            signal: controller.signal
        });

        return response;

    } catch (error) {

        if (error.name === "AbortError") {
            throw new Error("El servidor tardó demasiado en responder. Intentá nuevamente.");
        }

        throw new Error("No se pudo conectar con el servidor PREMIUM. Revisá tu conexión.");

    } finally {

        clearTimeout(timeout);
    }
}


// =====================================================
// LEER RESPUESTA JSON
// =====================================================

async function premiumReadResponse(response) {

    try {

        return await response.json();

    } catch (error) {

        throw new Error("El servidor devolvió una respuesta inválida.");
    }
}


// =====================================================
// DISPOSITIVO
// =====================================================

function getPremiumDeviceId() {

    let deviceId = localStorage.getItem("prisioner0_device_id");

    if (!deviceId) {

        deviceId = window.crypto?.randomUUID
            ? window.crypto.randomUUID()
            : "dev-" + Date.now().toString(36) + "-" +
              Math.random().toString(36).substring(2, 12);

        localStorage.setItem("prisioner0_device_id", deviceId);
    }

    return deviceId;
}


// =====================================================
// GUARDAR SESIÓN PREMIUM
// =====================================================

function savePremiumSession(data) {

    if (!data?.session_token) {
        throw new Error("El servidor no devolvió un token de sesión.");
    }

    localStorage.setItem(PREMIUM_SESSION_KEY, data.session_token);
    localStorage.setItem(PREMIUM_CODE_KEY, data.code || "");
    localStorage.setItem(PREMIUM_EXPIRES_KEY, data.expires_at || "");
}


// =====================================================
// MENSAJES
// =====================================================

function showPremiumMessage(message, success = false) {

    if (!premiumMessage) return;

    premiumMessage.textContent = message;
    premiumMessage.style.color = success ? "#36d399" : "#ff6b6b";
}


// =====================================================
// MOSTRAR PANEL ACTIVO
// =====================================================

function showPremiumActive(expiresAt) {

    if (premiumActivateForm) {
        premiumActivateForm.style.display = "none";
    }

    const activationHeading = document.getElementById("premiumActivationHeading");

    if (activationHeading) {
        activationHeading.style.display = "none";
    }

    if (premiumActivePanel) {
        premiumActivePanel.style.display = "block";
    }

    const expiresElement = document.getElementById("premiumExpires");

    if (expiresElement) {
        expiresElement.textContent = formatPremiumDate(expiresAt);
    }

    updatePremiumRemaining(expiresAt);
}


// =====================================================
// FORMATO DE FECHA
// =====================================================

function formatPremiumDate(dateString) {

    if (!dateString) return "No disponible";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "No disponible";
    }

    return date.toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


// =====================================================
// TIEMPO RESTANTE
// =====================================================

function updatePremiumRemaining(expiresAt) {

    const element = document.getElementById("premiumRemaining");

    if (!element || !expiresAt) return;

    const expiration = new Date(expiresAt).getTime();
    const remaining = expiration - Date.now();

    if (remaining <= 0) {
        element.textContent = "Membresía vencida";
        return;
    }

    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);

    element.textContent =
        `${days} días, ${hours} horas y ${minutes} minutos`;
}


// =====================================================
// VALIDAR SESIÓN PREMIUM
// =====================================================

async function checkPremiumSession() {

    const token = localStorage.getItem(PREMIUM_SESSION_KEY);

    if (!token) {
        showPremiumForm();
        return;
    }

    try {

        const response = await premiumFetch("/check-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                session_token: token
            })
        });

        const data = await premiumReadResponse(response);

        if (!response.ok) {
            throw new Error(data.error || "No se pudo comprobar la sesión.");
        }

        if (data.ok && data.premium === true) {

            const expiresAt =
                data.expires_at ||
                localStorage.getItem(PREMIUM_EXPIRES_KEY);

            localStorage.setItem(PREMIUM_EXPIRES_KEY, expiresAt || "");

            showPremiumActive(expiresAt);
            return;
        }

        clearPremiumSession();
        showPremiumForm();

    } catch (error) {

        console.error("Error comprobando PREMIUM:", error);

        showPremiumMessage(error.message || "No se pudo comprobar tu sesión.");

        // No eliminamos la sesión local si hubo un error de conexión.
    }
}


// =====================================================
// MOSTRAR FORMULARIO
// =====================================================

function showPremiumForm() {

    if (premiumActivePanel) {
        premiumActivePanel.style.display = "none";
    }

    const activationHeading = document.getElementById("premiumActivationHeading");

    if (activationHeading) {
        activationHeading.style.display = "block";
    }

    if (premiumActivateForm) {
        premiumActivateForm.style.display = "block";
    }
}


// =====================================================
// LIMPIAR SESIÓN PREMIUM
// =====================================================

function clearPremiumSession() {

    localStorage.removeItem(PREMIUM_SESSION_KEY);
    localStorage.removeItem(PREMIUM_CODE_KEY);
    localStorage.removeItem(PREMIUM_EXPIRES_KEY);
}


// =====================================================
// MODAL DE CAMBIO DE DISPOSITIVO
// =====================================================

function showPremiumDeviceModal(data, deviceId) {

    const devices = data.premium?.devices || [];

    if (devices.length < 2) {
        showPremiumMessage("No se pudieron obtener tus dispositivos.");
        return;
    }

    // Evitar duplicar el modal.
    const previousOverlay = document.getElementById("premiumDeviceChangeOverlay");

    if (previousOverlay) {
        previousOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = "premiumDeviceChangeOverlay";

    const modal = document.createElement("div");
    modal.className = "vip-device-modal";

    modal.innerHTML = `
        <div class="vip-device-modal-icon">⚠️</div>

        <h3>Límite de dispositivos</h3>

        <p>Tu código PREMIUM ya está activo en 2 dispositivos.</p>

        <p>
            Tenés <strong>1 cambio disponible</strong>.
            ¿Cuál dispositivo querés reemplazar?
        </p>

        <div class="vip-device-options">

            ${devices.map((device, index) => `
                <button
                    type="button"
                    class="vip-device-option"
                    data-session-id="${device.id}">

                    <span>🖥️</span>
                    <strong>Dispositivo ${index + 1}</strong>
                    <small>Registrado anteriormente</small>

                </button>
            `).join("")}

        </div>

        <button
            type="button"
            class="vip-device-cancel"
            id="premiumDeviceCancel">

            Cancelar

        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.querySelectorAll(".vip-device-option").forEach(button => {

        button.addEventListener("click", async () => {

            const replaceSessionId = button.dataset.sessionId;

            button.disabled = true;

            overlay.querySelectorAll(".vip-device-option").forEach(option => {
                option.disabled = true;
            });

            showPremiumMessage("Cambiando dispositivo...");

            try {

                const response = await premiumFetch("/change-device", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        code: data.premium.code,
                        device_id: deviceId,
                        replace_session_id: replaceSessionId
                    })
                });

                const result = await premiumReadResponse(response);

                if (!response.ok || !result.ok) {
                    throw new Error(
                        result.error ||
                        result.mensaje ||
                        "No se pudo cambiar el dispositivo."
                    );
                }

                savePremiumSession(result.premium);

                overlay.remove();

                showPremiumMessage("¡Dispositivo cambiado y PREMIUM activado!", true);
                showPremiumActive(result.premium.expires_at);

            } catch (error) {

                console.error("Error cambiando dispositivo:", error);

                overlay.querySelectorAll(".vip-device-option").forEach(option => {
                    option.disabled = false;
                });

                showPremiumMessage(error.message);

            }
        });
    });

    document.getElementById("premiumDeviceCancel").addEventListener("click", () => {

        overlay.remove();
        showPremiumMessage("Activación cancelada.");

    });
}


// =====================================================
// ACTIVAR CÓDIGO PREMIUM
// =====================================================

if (premiumActivateButton) {

    premiumActivateButton.addEventListener("click", async () => {

        if (!premiumCodeInput) {
            showPremiumMessage("No se encontró el campo del código PREMIUM.");
            return;
        }

        const code = premiumCodeInput.value.trim().toUpperCase();

        if (!code) {
            showPremiumMessage("Ingresá tu código PREMIUM.");
            return;
        }

        if (!code.startsWith("PRIPRE-")) {
            showPremiumMessage("El código ingresado no es un código PREMIUM válido.");
            return;
        }

        premiumActivateButton.disabled = true;

        premiumActivateButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> ACTIVANDO...';

        showPremiumMessage("Verificando tu código...");

        try {

            console.log("PREMIUM: enviando solicitud de activación...");

            const response = await premiumFetch("/activate-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    code: code,
                    device_id: getPremiumDeviceId(),
                    domain: location.hostname
                })
            });

            console.log("PREMIUM: respuesta HTTP:", response.status);

            const data = await premiumReadResponse(response);

            console.log("PREMIUM: respuesta del servidor:", data);

            // Si hay dos dispositivos, mostrar el modal.
            // Esto debe comprobarse antes de response.ok porque el Worker
            // devuelve HTTP 409 cuando se requiere reemplazar un dispositivo.

            if (data.requires_change === true) {
                
                console.log("PREMIUM: entrando en cambio de dispositivo");
                
                showPremiumDeviceModal(data, getPremiumDeviceId());
                return;
            }

            if (!response.ok || !data.ok) {

                throw new Error(
                    data.error ||
                    data.mensaje ||
                    "No se pudo activar el código."
                );
            }
            
            savePremiumSession(data.premium);

            showPremiumMessage("¡PREMIUM activado correctamente!", true);

            showPremiumActive(data.premium.expires_at);

            premiumCodeInput.value = "";

        } catch (error) {

            console.error("Error activando PREMIUM:", error);

            showPremiumMessage(
                error.message || "Ocurrió un error al activar el código."
            );

        } finally {

            premiumActivateButton.disabled = false;

            premiumActivateButton.innerHTML =
                '<i class="fa-solid fa-unlock-keyhole"></i> ACTIVAR';

        }
    });
}


// =====================================================
// CERRAR SESIÓN PREMIUM
// =====================================================

if (premiumLogoutButton) {

    premiumLogoutButton.addEventListener("click", () => {

        clearPremiumSession();

        showPremiumForm();

        showPremiumMessage("Cerraste tu sesión PREMIUM.");

    });
}


// =====================================================
// INICIAR
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    checkPremiumSession();

    const expiresAt = localStorage.getItem(PREMIUM_EXPIRES_KEY);

    if (expiresAt) {
        updatePremiumRemaining(expiresAt);
    }

    setInterval(() => {

        const currentExpiration =
            localStorage.getItem(PREMIUM_EXPIRES_KEY);

        if (currentExpiration) {
            updatePremiumRemaining(currentExpiration);
        }

    }, 60000);

});
