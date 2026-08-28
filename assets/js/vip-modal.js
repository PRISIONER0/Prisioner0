// =====================================================
// PRISIONER0 VIP
// MODAL PROMOCIONAL
// =====================================================

(function () {

    // -------------------------------------------------
    // CONFIGURACIÓN
    // -------------------------------------------------

    const DELAY_BEFORE_SHOW = 2000;
    const CLOSE_DELAY = 3000;

    // -------------------------------------------------
    // CREAR MODAL
    // -------------------------------------------------

    function createVipModal() {

        // Evitar duplicados
        if (
            document.getElementById(
                "prisioner0VipModalOverlay"
            )
        ) {
            return;
        }

        // -------------------------------------------------
        // FONDO
        // -------------------------------------------------

        const overlay =
            document.createElement("div");

        overlay.id =
            "prisioner0VipModalOverlay";

        // -------------------------------------------------
        // MODAL
        // -------------------------------------------------

        const modal =
            document.createElement("div");

        modal.className =
            "prisioner0-vip-modal";

        modal.innerHTML = `

            <div class="prisioner0-vip-icon">
                👑
            </div>

            <h2>
                ¿Te molestan los anuncios?
            </h2>

            <p class="prisioner0-vip-main-text">
                Disfrutá PRISIONER0 sin interrupciones.
            </p>

            <div class="prisioner0-vip-price">
                PRISIONER0 VIP
                <strong>US$1.99 / mes</strong>
            </div>

            <div class="prisioner0-vip-benefits">

                <div>✓ Sin banners publicitarios</div>

                <div>✓ Sin cartel promocional VIP</div>

                <div>✓ Sin acortadores</div>

                <div>✓ Descargas directas</div>

                <div>✓ Hasta 2 dispositivos</div>

            </div>

            <a
                href="../vip.html"
                class="prisioner0-vip-button"
            >
                HACERME VIP
            </a>

            <button
                type="button"
                id="prisioner0VipClose"
                class="prisioner0-vip-close"
                disabled
            >
                Cerrar
            </button>

            <p
                id="prisioner0VipCountdown"
                class="prisioner0-vip-countdown"
            >
                Podrás cerrar este mensaje en 3 segundos
            </p>

            <p class="prisioner0-vip-joke">
                Este mensaje no volverá a aparecer...
                mientras seas VIP. 😉
            </p>

        `;

        overlay.appendChild(modal);

        document.body.appendChild(overlay);

        // -------------------------------------------------
        // CERRAR
        // -------------------------------------------------

        const closeButton =
            document.getElementById(
                "prisioner0VipClose"
            );

        const countdown =
            document.getElementById(
                "prisioner0VipCountdown"
            );

        let seconds = 3;

        const timer =
            setInterval(function () {

                seconds--;

                if (seconds > 0) {

                    countdown.textContent =
                        `Podrás cerrar este mensaje en ${seconds} segundos`;

                } else {

                    clearInterval(timer);

                    closeButton.disabled = false;

                    closeButton.textContent =
                        "Cerrar";

                    countdown.textContent =
                        "Ya podés cerrar este mensaje.";

                }

            }, 1000);

        closeButton.addEventListener(
            "click",
            function () {

                overlay.remove();

            }
        );
    }

    // -------------------------------------------------
    // INICIAR
    // -------------------------------------------------

    async function initVipModal() {

        setTimeout(async function () {

            // =============================================
            // USAR EL ESTADO VIP COMPARTIDO
            // =============================================

            const vipActivo =
                await checkVipGlobal();

            // =============================================
            // VIP → NO MOSTRAR MODAL
            // =============================================

            if (vipActivo) {
                return;
            }

            // =============================================
            // USUARIO NORMAL → MOSTRAR MODAL
            // =============================================

            createVipModal();

        }, DELAY_BEFORE_SHOW);
    }

    // -------------------------------------------------
    // DOM READY
    // -------------------------------------------------

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initVipModal
        );

    } else {

        initVipModal();

    }

})();