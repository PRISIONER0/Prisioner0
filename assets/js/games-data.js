// =====================================
// Base de datos de juegos
// =====================================

const games = [

    // ================================
    // JUEGOS DESTACADOS
    // Máximo 5 con featured: true
    // ================================
    
    {
        title: "Kingdom of Marionettes",
        page: "kingdom-of-marionettes.html",
        cover: "kingdom-of-marionettes.jpg",
        featured: true,
        language: "Español",
        pc: true,
        android: true
    },


    {
        title: "BIG BAD DOGS",
        page: "big-bad-dogs.html",
        cover: "big-bad-dogs.jpg",
        featured: true,
        language: "Español",
        pc: true,
        android: true
    },

    {
        title: "The Freak Circus",
        page: "the-freak-circus.html",
        cover: "the-freak-circus.jpg",
        featured: true,
        language: "Español",
        pc: true,
        android: true
    },

    {
        title: "The false sun",
        page: "the-false-sun.html",
        cover: "the-false-sun.png",
        featured: true,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "You Make This House a Home",
        page: "you-make-this-house-a-home.html",
        cover: "you-make-this-house-a-home.jpg",
        featured: true,
        language: "Español",
        pc: true,
        android: true
    },


    // ================================
    // MÁS JUEGOS (VER MÁS)
    // featured: false
    // ================================
    {
        title: "Incursion",
        page: "incursion.html",
        cover: "incursion.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Touchstarveds",
        page: "touchstarved.html",
        cover: "touchstarved.png",
        featured: false,
        language: "Español",
        pc: true,
        android: false,
    },

    {
        title: "Beyond the turquoise stars",
        page: "beyond-the-turquoise-stars.html",
        cover: "beyond-the-turquoise-stars.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Let me in",
        page: "let-me-in.html",
        cover: "let-me-in.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Envelope my heart",
        page: "envelope-my-heart.html",
        cover: "envelope-my-heart.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Loving decays",
        page: "loving-decays.html",
        cover: "loving-decays.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Killer chat",
        page: "killer-chat.html",
        cover: "killer-chat.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Our life",
        page: "our-life.html",
        cover: "our-life.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "The wolf wears red",
        page: "the-wolf-wears-red.html",
        cover: "the-wolf-wears-red.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Repair your heart",
        page: "repair-your-heart.html",
        cover: "repair-your-heart.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Embassy otherworld",
        page: "embassy-otherworld.html",
        cover: "embassy-otherworld.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "14 Days with you",
        page: "14dayswithyou.html",
        cover: "14dayswithyou.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Duality",
        page: "duality.html",
        cover: "duality.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Heartstop tour",
        page: "heartstop-tour.html",
        cover: "heartstop-tour.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Doki doki literature club",
        page: "dokidoki.html",
        cover: "Dokidoki.png",
        featured: false,
        language: "Español",
        pc: true,
        android: false,
    },

    {
        title: "Killer trait",
        page: "killer-trait.html",
        cover: "killer-trait.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "The willowmist",
        page: "willowmist.html",
        cover: "willowmist.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Glory hounds",
        page: "glory-hounds.html",
        cover: "glory-hounds.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },
    {
        title: "Survive Min",
        page: "survive-min.html",
        cover: "survive-min.gif",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },
    {
        title: "Do not take this cat home",
        page: "do-not-take-this-cat-home.html",
        cover: "do-not-take-this-cat-home.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Lurking for love",
        page: "lurking-for-love.html",
        cover: "lurking-for-love.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Threads of you beyond the bay",
        page: "threads-of-you-beyond-the-bay.html",
        cover: "threads-of-you-beyond-the-bay.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },
    {
        title: "Chilling devotion",
        page: "chilling-devotion.html",
        cover: "chilling-devotion.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },
    {
        title: "Perfect love",
        page: "perfect-love.html",
        cover: "perfect-love.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Dont eat the cashier",
        page: "dont-eat-the-cashier.html",
        cover: "dont-eat-the-cashier.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Bloody flower of teyvat",
        page: "bloody-flower-of-teyvat.html",
        cover: "bloody-flower-of-teyvat.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Kleinv01",
        page: "kleinv01.html",
        cover: "kleinv01.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "The kid at the back",
        page: "the-kid-at-the-back.html",
        cover: "the-kid-at-the-back.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Wan2talk",
        page: "wan2talk.html",
        cover: "wan2talk.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Arcticed",
        page: "arcticed.html",
        cover: "arcticed.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Online obsession",
        page: "online-obsession.html",
        cover: "online-obsession.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "behind the broadcast",
        page: "behind-the-broadcast.html",
        cover: "behind-the-broadcast.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Prescription love",
        page: "prescriptionlove.html",
        cover: "prescriptionlove.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },
    {
        title: "The slugman",
        page: "the-slugman.html",
        cover: "the-slugman.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Gentle fall",
        page: "gentle-fall.html",
        cover: "gentle-fall.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },
    
    {
        title: "A date with death 2",
        page: "a-date-with-death-2.html",
        cover: "a-date-with-death-2.png",
        featured: false,
        language: "Español",
        pc: true,
        android: false,
    },

    {
        title: "A date with death",
        page: "a-date-with-death.html",
        cover: "a-date-with-death.png",
        featured: false,
        language: "Español",
        pc: true,
        android: false,
    },

    {
        title: "Mirage-noir",
        page: "mirage-noir.html",
        cover: "mirage-noir.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Crisis the third way",
        page: "crisis-the-third-way.html",
        cover: "crisis-the-third-way.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: false,
    },

    {
        title: "The narrator says were meant to be",
        page: "the-narrator-says-were-meant-to-be.html",
        cover: "the-narrator-says-were-meant-to-be.png",
        featured: false,
        language: "Español",
        pc: true,
        android: true,
    },

    {
        title: "Teach me how to love",
        page: "teach-me-how-to-love.html",
        cover: "teach-me-how-to-love.jpg",
        featured: false,
        language: "Español",
        pc: true,
        android: false,
    }

];