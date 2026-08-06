/* =====================================================
   PRISIONER0 - INDEX.JS
   Funciones exclusivas de la página principal
===================================================== */


/* =====================================================
   BOTÓN "VER MÁS"
===================================================== */

const loadMore = document.getElementById("loadMore");
const moreGames = document.getElementById("more-games");

let expanded = false;

if (loadMore && moreGames) {

    loadMore.addEventListener("click", function () {

        if (!expanded) {

            // Mostrar juegos ocultos
            moreGames.style.display = "grid";

            // Cambiar texto e icono
            loadMore.querySelector("span").textContent = "Ver menos";
            loadMore.querySelector("i").className = "fa-solid fa-minus";

            // Bajar suavemente
            const position = moreGames.offsetTop - 120;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

            expanded = true;

        } else {

            // Ocultar juegos
            moreGames.style.display = "none";

            // Restaurar texto e icono
            loadMore.querySelector("span").textContent = "Ver más";
            loadMore.querySelector("i").className = "fa-solid fa-plus";

            // Volver arriba del catálogo
            const position = document.getElementById("juegos").offsetTop - 100;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

            expanded = false;

        }

    });

}


/* =====================================================
   BOTÓN "INICIO"
===================================================== */

const homeLink = document.querySelector('a[href="#inicio"]');
const hero = document.getElementById("inicio");

if (homeLink && hero) {

    homeLink.addEventListener("click", function (e) {

        e.preventDefault();

        const position = hero.offsetTop - 50;

        window.scrollTo({

            top: position,

            behavior: "smooth"

        });

    });

}


/* =====================================================
   BUSCADOR DE JUEGOS
===================================================== */

const searchInput = document.getElementById("searchInput");

const allGames = document.querySelectorAll(".game-card");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const allGames = document.querySelectorAll(".game-card");

        const value = this.value.toLowerCase();

        // Si escribe algo, bajar al catálogo
        if (value !== "") {

            const position = document.getElementById("juegos").offsetTop - 110;

            window.scrollTo({

                top: position,

                behavior: "smooth"

            });

            // Mostrar juegos ocultos automáticamente
            moreGames.style.display = "grid";
            expanded = true;

            loadMore.querySelector("span").textContent = "Ver menos";
            loadMore.querySelector("i").className = "fa-solid fa-minus";

        }

        // Si borra el buscador
        else {

            moreGames.style.display = "none";
            expanded = false;

            loadMore.querySelector("span").textContent = "Ver más";
            loadMore.querySelector("i").className = "fa-solid fa-plus";

        }

        // Buscar coincidencias
        allGames.forEach(game => {

            const title = game.querySelector("h3").textContent.toLowerCase();

            if (title.includes(value)) {

                game.style.display = "";

            }

            else {

                game.style.display = "none";

            }

        });

    });

}

/* =====================================================
   CREAR TARJETAS AUTOMÁTICAMENTE
=====================================================*/

const featuredGames = document.getElementById("featured-games");

if (featuredGames) {

    games
    .filter(game => game.featured)
    .slice(0,5)
    .forEach(game => {

        const card = document.createElement("a");

        card.href = `juegos/${game.page}`;

        card.className = "game-card";

        card.innerHTML = `

            <img src="assets/img/covers/${game.cover}"
                 alt="${game.title}">

            <h3>${game.title}</h3>

            <div class="game-info">

                ${game.pc ? "<span>🖥 PC</span>" : ""}

                ${game.android ? "<span>📱 Android</span>" : ""}

                <span>🌎 ${game.language}</span>

            </div>

            <span class="game-button">

                Ver Juego

            </span>

        `;

        featuredGames.appendChild(card);

    });


    // Mover VER MÁS al final como sexta tarjeta
        featuredGames.appendChild(loadMore);

}
/* =====================================================
   CREAR CATÁLOGO COMPLETO (VER MÁS)
=====================================================*/

const moreGamesContainer = document.getElementById("more-games");

if (moreGamesContainer) {

    games.forEach(game => {
        
        if (game.featured) return;

        const card = document.createElement("a");

        card.href = `juegos/${game.page}`;

        card.className = "game-card";

        card.innerHTML = `

            <img src="assets/img/covers/${game.cover}"
                 alt="${game.title}">

            <h3>${game.title}</h3>

            <div class="game-info">

                ${game.pc ? "<span>🖥 PC</span>" : ""}

                ${game.android ? "<span>📱 Android</span>" : ""}

                <span>🌎 ${game.language}</span>

            </div>

            <span class="game-button">

                Ver Juego

            </span>

        `;

        moreGamesContainer.appendChild(card);

    });

}