// =====================================================
// PRISIONER0 VIP
// CONTROL DE PUBLICIDAD
// =====================================================

document.addEventListener("DOMContentLoaded", async function () {

    // =================================================
    // COMPROBAR SESIÓN VIP
    // USANDO EL ESTADO VIP COMPARTIDO
    // =================================================

    const vipActivo =
        await checkVipGlobal();

    console.log(
        "VIP activo - publicidad:",
        vipActivo
    );

    // =================================================
    // VIP → NO CARGAR PUBLICIDAD
    // =================================================

    if (vipActivo) {

        document
            .querySelectorAll(".ad-container")
            .forEach(ad => {
                ad.remove();
            });

        return;
    }

    // =================================================
    // USUARIO NORMAL → CARGAR PUBLICIDAD
    // =================================================

    if (
        typeof aclib === "undefined" ||
        typeof aclib.runBanner !== "function"
    ) {

        console.error(
            "La publicidad no está disponible."
        );

        return;
    }

    // =================================================
    // BANNER PC SUPERIOR
    // =================================================

    const topDesktop =
        document.getElementById("adTop");

    if (topDesktop) {

        aclib.runBanner({
            zoneId: "12031562"
        });

    }

    // =================================================
    // BANNER PC INFERIOR
    // =================================================

    const bottomDesktop =
        document.getElementById("adBottom");

    if (bottomDesktop) {

        aclib.runBanner({
            zoneId: "12031562"
        });

    }

    // =================================================
    // BANNER MÓVIL SUPERIOR
    // =================================================

    const topMobile =
        document.getElementById("adTopMobile");

    if (topMobile) {

        aclib.runBanner({
            zoneId: "12031670"
        });

    }

    // =================================================
    // BANNER MÓVIL INFERIOR
    // =================================================

    const bottomMobile =
        document.getElementById("adBottomMobile");

    if (bottomMobile) {

        aclib.runBanner({
            zoneId: "12031670"
        });

    }

});
