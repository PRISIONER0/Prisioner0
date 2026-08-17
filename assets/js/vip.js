/* =====================================================
   PRISIONER0 VIP
   Activación de códigos VIP
===================================================== */

const VIP_API = "https://prisioner0-vip-api.javiieergutierrez01.workers.dev";

const vipCodeInput = document.getElementById("vipCode");
const activateVipButton = document.getElementById("activateVip");
const vipMessage = document.getElementById("vipMessage");


if (activateVipButton) {

    activateVipButton.addEventListener("click", async function () {

        const code = vipCodeInput.value.trim().toUpperCase();

        // Comprobar que haya un código
        if (!code) {

            vipMessage.textContent = "Ingresá tu código VIP.";
            return;

        }

        // Mostrar estado
        activateVipButton.disabled = true;
        activateVipButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> COMPROBANDO...';

        vipMessage.textContent = "";

        try {

            const response = await fetch(`${VIP_API}/activate-code`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    code: code
                })

            });


            const data = await response.json();


            if (data.ok) {

                vipMessage.textContent =
                    "¡Código VIP activado correctamente!";

                vipMessage.style.color = "#7CFC00";

            } else {

                vipMessage.textContent =
                    data.error || "El código VIP no es válido.";

                vipMessage.style.color = "#ff6b6b";

            }

        } catch (error) {

            console.error("Error al conectar con VIP API:", error);

            vipMessage.textContent =
                "No se pudo conectar con el servidor VIP.";

            vipMessage.style.color = "#ff6b6b";

        }


        // Restaurar botón
        activateVipButton.disabled = false;

        activateVipButton.innerHTML =
            '<i class="fa-solid fa-unlock"></i> ACTIVAR VIP';

    });

}