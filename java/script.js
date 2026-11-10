/* ==========================================
   GALAXY OF AFFECTION
   A universe for Motho Wanga ❤️
========================================== */

// ==========================================
// 1. HTML ELEMENTS
// ==========================================

const galaxy = document.getElementById("galaxy");
const ctx = galaxy.getContext("2d");

const heart = document.getElementById("heart");
const heartCtx = heart.getContext("2d");

const messagesContainer = document.getElementById("messages");
const birthdayReveal = document.getElementById("birthdayReveal");


// ==========================================
// 2. CONFIGURATION
// ==========================================

const SHOW_DURATION = 30000;

const STAR_COUNT = 900;
const DUST_COUNT = 3500;
const HEART_COUNT = 1200;
const DISC_COUNT = 22000;


// ==========================================
// 3. VARIABLES
// ==========================================

let width;
let height;
let pixelRatio;

let stars = [];
let dustParticles = [];
let heartParticles = [];
let discParticles = [];
let discImage = null;
let floatingMessages = [];

let startTime = 0;
let animationFinished = false;
let introOpened = false;

// ==========================================
// 4. ROMANTIC MESSAGES
// ==========================================

const loveMessages = [

    "you are my favourite ",
    "I just want to look at you",
    "you make my heart smile",
    "my little joy",
    "so glad it's you",
    "It had to be you",
    "my sweet potato",
    "all my feelings are you",
    "you are my always",
    "my beautiful Pumpkin",
    "I choose you every day",
    "zambane",
    "my heart belongs to you",
    "forever feels beautiful with you",
    "you are my favourite person",
    "I love your smile",
    "my sweetest blessing",
    "you are my universe",
    "my happiness begins with you",
    "you make ordinary moments special",
    "my favourite place is beside you",
    "I would choose you again"
];


// ==========================================
// 5. RESPONSIVE CANVAS
// ==========================================

function resizeCanvas() {

    pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    width = window.innerWidth;
    height = window.innerHeight;

    galaxy.width = width * pixelRatio;
    galaxy.height = height * pixelRatio;

    ctx.setTransform(
        pixelRatio, 0, 0,
        pixelRatio, 0, 0
    );

    heart.width = 300 * pixelRatio;
    heart.height = 300 * pixelRatio;

    heartCtx.setTransform(
        pixelRatio, 0, 0,
        pixelRatio, 0, 0
    );

    createStars();
    createDust();
    createDisc();
    createHeart();
    createMessages();

}


// ==========================================
// 6. CREATE STAR FIELD
// ==========================================

function createStars() {

    stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {

        stars.push({

            x: Math.random() * width,
            y: Math.random() * height,

            radius: Math.random() * 1.6 + 0.3,

            opacity: Math.random(),

            phase: Math.random() * Math.PI * 2,

            colour: [
                "#ffffff",
                "#76d9ff",
                "#a4baff",
                "#ffb5df",
                "#e5d3ff"
            ][Math.floor(Math.random() * 5)]

        });

    }

}


// ==========================================
// 7. CREATE 3D GALAXY FLOOR
// ==========================================

function createDust() {

    dustParticles = [];

    for (let i = 0; i < DUST_COUNT; i++) {

        const angle = Math.random() * Math.PI * 2;

        const radius = Math.sqrt(Math.random());

        dustParticles.push({

            angle: angle,
            radius: radius,

            size: Math.random() * 1.4 + 0.2,

            opacity: Math.random() * 0.8,

            phase: Math.random() * Math.PI * 2,

            colour: [
                "#ffffff",
                "#55cfff",
                "#e6a6ff",
                "#ffb7d8"
            ][Math.floor(Math.random() * 4)]

        });

    }

}


// ==========================================
// 8. DRAW STARS
// ==========================================

function drawStars(time) {

    stars.forEach(star => {

        const twinkle =
            0.45 +
            Math.sin(time * 0.002 + star.phase) * 0.4;

        ctx.globalAlpha = Math.max(0.1, twinkle);

        ctx.fillStyle = star.colour;

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}


// ==========================================
// 9. DRAW PERSPECTIVE GALAXY FLOOR
// ==========================================

function drawGalaxyFloor(time) {

    const horizon = height * 0.60;

    const floorHeight = height * 0.35;

    const floorWidth = width * 0.72;

    dustParticles.forEach(particle => {

        const depth = particle.radius;

        const x =
            width / 2 +
            Math.cos(particle.angle) *
            floorWidth *
            depth;

        const y =
            horizon +
            depth * floorHeight *
            Math.abs(Math.sin(particle.angle));

        const wave =
            Math.sin(
                time * 0.0007 + particle.phase
            ) * 1.5;

        const size =
            particle.size * (0.5 + depth * 1.2);

        ctx.globalAlpha =
            particle.opacity * (0.25 + depth * 0.75);

        ctx.fillStyle = particle.colour;

        ctx.beginPath();

        ctx.arc(
            x + wave,
            y,
            size,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });

    ctx.globalAlpha = 1;

}

// ==========================================
// 9B. SPIRAL DISC (black hole style)
// ==========================================

function colourAt(r) {

    const pick = Math.random();

    if (r < 0.45) return pick < 0.5 ? "255,255,255" : "130,235,255";
    if (r < 0.7) return pick < 0.5 ? "80,195,255" : "190,140,255";
    return pick < 0.5 ? "255,140,200" : "155,125,255";

}

function createDisc() {

    // only build the picture once
    if (discImage) return;

    const S = 1400;
    const mid = S / 2;

    discImage = document.createElement("canvas");
    discImage.width = S;
    discImage.height = S;

    const d = discImage.getContext("2d");

    d.globalCompositeOperation = "lighter";

    // 1. soft glowing clouds along the spiral arms
    for (let i = 0; i < 900; i++) {

        const r = 0.28 + Math.pow(Math.random(), 0.8) * 0.72;
        const arm = i % 4;

        const a =
            arm * (Math.PI / 2) +
            r * 5 +
            (Math.random() - 0.5) * 0.35;

        const x = mid + Math.cos(a) * r * mid;
        const y = mid + Math.sin(a) * r * mid;

        const size = 25 + Math.random() * 70 * r;
        const col = colourAt(r);

        const g = d.createRadialGradient(x, y, 0, x, y, size);
        g.addColorStop(0, "rgba(" + col + ",0.10)");
        g.addColorStop(1, "rgba(" + col + ",0)");

        d.fillStyle = g;
        d.beginPath();
        d.arc(x, y, size, 0, Math.PI * 2);
        d.fill();

    }

    // 2. tiny sparkling dust
    for (let i = 0; i < DISC_COUNT; i++) {

        const r = 0.28 + Math.pow(Math.random(), 0.8) * 0.72;
        const arm = i % 4;

        const spread =
            (Math.random() + Math.random() + Math.random() - 1.5) *
            (0.22 + r * 0.3);

        const a = arm * (Math.PI / 2) + r * 5 + spread;

        const x = mid + Math.cos(a) * r * mid;
        const y = mid + Math.sin(a) * r * mid;

        d.fillStyle =
            "rgba(" + colourAt(r) + "," +
            (0.25 + Math.random() * 0.6) + ")";

        d.beginPath();
        d.arc(x, y, Math.random() * 1.3 + 0.4, 0, Math.PI * 2);
        d.fill();

    }

}

function drawDisc(time) {

    if (!discImage) return;

    const cx = width * 0.5;
    const cy = height * 0.5;

    const R = Math.max(width, height) * 0.7;

    const tilt = -0.45;
    const squash = 0.6;

    const spin = time * 0.00006;

    // size of the black centre (never smaller than the heart)
    const holeR = Math.max(R * 0.27, 150);

    // heartbeat glow
    const beat = 0.85 + Math.sin(time * 0.0025) * 0.15;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(tilt);
    ctx.scale(1, squash);

    // soft glow behind everything
    const glow = ctx.createRadialGradient(0, 0, holeR * 0.8, 0, 0, R * 1.1);
    glow.addColorStop(0, "rgba(90,200,255,0.22)");
    glow.addColorStop(0.35, "rgba(120,110,255,0.14)");
    glow.addColorStop(0.7, "rgba(170,100,255,0.06)");
    glow.addColorStop(1, "rgba(255,120,190,0)");

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.1, 0, Math.PI * 2);
    ctx.fill();

    // the spinning spiral picture
    ctx.save();
    ctx.rotate(spin);
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(discImage, -R, -R, R * 2, R * 2);
    ctx.restore();

    // bright glowing edge around the black centre
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = beat;

    const halo = ctx.createRadialGradient(0, 0, holeR * 0.9, 0, 0, holeR * 1.5);
    halo.addColorStop(0, "rgba(220,250,255,0.85)");
    halo.addColorStop(0.25, "rgba(120,225,255,0.45)");
    halo.addColorStop(0.6, "rgba(160,120,255,0.15)");
    halo.addColorStop(1, "rgba(160,120,255,0)");

    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(0, 0, holeR * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";

    // black centre with a soft edge
    const hole = ctx.createRadialGradient(0, 0, 0, 0, 0, holeR);
    hole.addColorStop(0, "rgba(0,0,0,1)");
    hole.addColorStop(0.85, "rgba(0,0,0,1)");
    hole.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = hole;
    ctx.beginPath();
    ctx.arc(0, 0, holeR, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

}

// ==========================================
// 10. CREATE PARTICLE HEART
// ==========================================

function createHeart() {

    heartParticles = [];

    for (let i = 0; i < HEART_COUNT; i++) {

        const t = Math.random() * Math.PI * 2;

        const scale = Math.sqrt(Math.random());

        const x =
            16 * Math.pow(Math.sin(t), 3);

        const y =
            -(
                13 * Math.cos(t)
                - 5 * Math.cos(2 * t)
                - 2 * Math.cos(3 * t)
                - Math.cos(4 * t)
            );

        heartParticles.push({

            x: x * scale,
            y: y * scale,

            size: Math.random() * 1.3 + 0.4,

            opacity: Math.random(),

            phase: Math.random() * Math.PI * 2

        });

    }

}


// ==========================================
// 11. DRAW GLOWING HEART (page 1)
// ==========================================

function drawHeart(time) {

    heartCtx.clearRect(0, 0, 300, 300);

    const centerX = 150;
    const centerY = 150;

    // Gentle heartbeat pulse

    const pulse =
        1 + Math.sin(time * 0.0025) * 0.045;

    const scale = 7.2 * pulse;

    // Pink background glow

    const glow = heartCtx.createRadialGradient(
        centerX,
        centerY,
        2,
        centerX,
        centerY,
        115
    );

    glow.addColorStop(
        0,
        "rgba(255,120,190,0.25)"
    );

    glow.addColorStop(
        0.5,
        "rgba(255,100,180,0.10)"
    );

    glow.addColorStop(
        1,
        "rgba(255,120,190,0)"
    );

    heartCtx.fillStyle = glow;

    heartCtx.beginPath();

    heartCtx.arc(
        centerX,
        centerY,
        115,
        0,
        Math.PI * 2
    );

    heartCtx.fill();

    // Draw heart particles

    heartParticles.forEach(particle => {

        const x =
            centerX + particle.x * scale;

        const y =
            centerY + particle.y * scale;

        const shimmer =
            0.55 +
            Math.sin(
                time * 0.003 + particle.phase
            ) * 0.4;

        heartCtx.globalAlpha =
            Math.max(0.15, shimmer);

        heartCtx.fillStyle =
            particle.phase > 3
                ? "#ffffff"
                : "#ffb5dc";

        heartCtx.shadowColor = "#ff83c8";

        heartCtx.shadowBlur = 7;

        heartCtx.beginPath();

        heartCtx.arc(
            x,
            y,
            particle.size,
            0,
            Math.PI * 2
        );

        heartCtx.fill();

    });

    heartCtx.globalAlpha = 1;
    heartCtx.shadowBlur = 0;

}


// ==========================================
// 12. CREATE INTERTWINED MESSAGES
// ==========================================

function createMessages() {

    messagesContainer.innerHTML = "";

    floatingMessages = [];

    loveMessages.forEach((message, index) => {

        const element = document.createElement("div");

        element.className = "love-message";

        element.textContent = message;

        // Cluster around the central heart

        const ring = index % 2;
        const perRing = loveMessages.length / 2;

        const angle =
            (Math.floor(index / 2) / perRing) * Math.PI * 2 +
            ring * 0.3 +
            (Math.random() - 0.5) * 0.25;

        const x = 50 + Math.cos(angle) * (ring === 0 ? 24 : 38);
        const y = 50 + Math.sin(angle) * (ring === 0 ? 20 : 33);

        element.style.left = x + "%";
        element.style.top = y + "%";

        floatingMessages.push({

            element: element,

            baseScale:
                0.75 + Math.random() * 0.3,

            baseDepth:
                -100 + Math.random() * 100,

            phase:
                Math.random() * Math.PI * 2,

            speed:
                0.7 + Math.random() * 0.4,

            opacity:
                0.7 + Math.random() * 0.3

        });

        messagesContainer.appendChild(element);

    });

}


// ==========================================
// 13. CONTINUOUS 3D HEARTBEAT MESSAGES
// ==========================================

function animateMessages(time) {

    floatingMessages.forEach(message => {

        // Smooth continuous forward/backward movement

        const heartbeat = Math.sin(
            time * 0.0012 * message.speed +
            message.phase
        );

        // Depth movement

        const depth = heartbeat * 115;

        // Controlled size change

        const scale =
            message.baseScale +
            (heartbeat + 1) * 0.12;

        // Gentle sideways movement

        const horizontal =
            Math.sin(
                time * 0.00045 * message.speed +
                message.phase
            ) * 13;

        const vertical =
            Math.cos(
                time * 0.00055 * message.speed +
                message.phase
            ) * 9;

        const opacity =
            message.opacity *
            (0.78 + (heartbeat + 1) * 0.11);

        message.element.style.transform = `
            translate3d(
                ${horizontal}px,
                ${vertical}px,
                ${message.baseDepth + depth}px
            )
            scale(${scale})
        `;

        message.element.style.opacity = opacity;

    });

}


// ==========================================
// 14. MAIN ANIMATION ENGINE
// ==========================================

function animate(time) {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    drawStars(time);

    drawDisc(time);

    drawGalaxyFloor(time);

    drawHeart(time);

    animateMessages(time);

    // Birthday reveal timer

    const elapsed = time - startTime;

    if (
    introOpened &&
    elapsed >= SHOW_DURATION &&
    !animationFinished
) {
    animationFinished = true;
    showBirthdayReveal();
}

    if (!animationFinished) {

        requestAnimationFrame(animate);

    }

}


// ==========================================
// 15. BIRTHDAY REVEAL
// ==========================================

function showBirthdayReveal() {

    birthdayReveal.classList.add("show");

    startFinale();

    console.log(
        "The Galaxy of Affection has finished ❤️"
    );

}


// ==========================================
// 15B. FINALE (word tunnel -> shooting star -> heart QR)
// ==========================================

// PUT THE LINK YOU WANT THE QR CODE TO OPEN HERE
// (a SHORT link works best, it makes the QR squares bigger)
const QR_LINK = "https://rinayendou.github.io/Motho-Wanga/letter.html";

// the words that fly past (change them or add your own)
// a word that is written more than once flies past more often
const flyingMessages = [
    "You are my magic ✨",
    "Your smile is my sunshine ❤️",
    "I'd always choose you.",
    "You are my favourite person.",
    "My heart is yours. 💖",
    "You are my brightest star. ⭐",
    "See yourself through my eyes.",
    "My once-in-a-lifetime love.",
    "You are so special to me.",
    "I'd find you in every lifetime.",
    "Nonjabulo" ,
    "I'm grateful for you. ❤️",
    "Today, my favourite star shines. 🎂",
    "Happy birthday, Andisiwe! ❤️",
    "Forever, Motho Wanga. 💖"
];

const WORDS_DURATION = 14000;   // how long the words fly (milliseconds)
const STAR_DURATION = 3200;     // how long the shooting star takes
const FLYER_COUNT = 80;         // how many words are in the air

const finaleCanvas = document.getElementById("finale");
const fctx = finaleCanvas.getContext("2d");

const FONT_PX = 56;
const FONT_FAMILY =
    "Arial, Helvetica, 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', sans-serif";

let fW = 0;
let fH = 0;
let finaleRunning = false;
let finaleStart = 0;
let lastFinaleTime = 0;
let fStars = [];
let flyers = [];
let sprites = [];
let emojiSprites = [];
let heartSprites = [];
let floaters = [];
let bursts = [];
let starTrail = [];
let starPath = null;
let starX = 0;
let starY = 0;
let heartImg = null;
let arrived = false;
let heartReady = false;
let nextFloat = 0;
let layout = {};


// ------------------------------------------
// small helper functions
// ------------------------------------------

function clamp01(v) {
    return Math.max(0, Math.min(1, v));
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function easeOutBack(x) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeInOut(x) {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
}


// ------------------------------------------
// glowing word pictures (made once, drawn many times)
// ------------------------------------------

function makeSprite(text, fill, glow) {

    const scratch = document.createElement("canvas").getContext("2d");
    scratch.font = "bold " + FONT_PX + "px " + FONT_FAMILY;

    const w = Math.ceil(scratch.measureText(text).width) + 70;
    const h = Math.ceil(FONT_PX * 1.6) + 40;

    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;

    const x = c.getContext("2d");

    x.font = "bold " + FONT_PX + "px " + FONT_FAMILY;
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillStyle = fill;
    x.shadowColor = glow;

    x.shadowBlur = 22;
    x.fillText(text, w / 2, h / 2);

    x.shadowBlur = 8;
    x.fillText(text, w / 2, h / 2);

    return c;

}

function buildSprites() {

    sprites = [];
    emojiSprites = [];
    heartSprites = [];

    flyingMessages.forEach(message => {
        sprites.push({
            white: makeSprite(message, "#ffffff", "rgba(255,150,210,0.95)"),
            pink: makeSprite(message, "#ff7cc0", "rgba(255,60,160,0.95)")
        });
    });

    ["💖", "💗", "❤️", "💕"].forEach(emoji => {
        emojiSprites.push(makeSprite(emoji, "#ff6fb5", "rgba(255,80,170,0.8)"));
    });

    ["#ff9ad0", "#ffd1ea", "#ff6fb5"].forEach(colour => {
        heartSprites.push(makeSprite("♥", colour, "rgba(255,90,180,0.9)"));
    });

}


// ------------------------------------------
// the heart made of QR squares, with the real QR inside
// ------------------------------------------

// is this point (heart units, 100 wide) inside the heart shape?
function insideHeart(X, Y) {

    const x = (X - 50) / 41;
    const y = (94 - Y) / 41 - 1;

    const a = x * x + y * y - 1;

    return a * a * a - x * x * y * y * y <= 0;

}

function roundRectPath(c, x, y, w, h, r) {

    c.beginPath();
    c.moveTo(x + r, y);
    c.arcTo(x + w, y, x + w, y + h, r);
    c.arcTo(x + w, y + h, x, y + h, r);
    c.arcTo(x, y + h, x, y, r);
    c.arcTo(x, y, x + w, y, r);
    c.closePath();

}

function buildHeartImage() {

    const u = 10;                 // 10 pixels for every heart unit

    heartImg = document.createElement("canvas");
    heartImg.width = 100 * u;
    heartImg.height = 96 * u;

    const h = heartImg.getContext("2d");

    // 1. get the real QR code data from your link
    let model = null;

    if (typeof QRCode !== "undefined") {

        const temp = document.createElement("div");

        const qr = new QRCode(temp, {
            text: QR_LINK,
            width: 128,
            height: 128,
            correctLevel: QRCode.CorrectLevel.M
        });

        model = qr._oQRCode;

    } else {
        console.log("QR library did not load");
    }

    const n = model ? model.getModuleCount() : 29;

    const plateSide = 51;               // white square behind the real QR
    const c = plateSide / (n + 6);      // size of one real QR square
    const plateX = 50 - plateSide / 2;
    const plateY = 41.9 - plateSide / 2;

    const D = c * 2;                    // size of the big decorative squares

    // same random pattern every time
    let seed = 12345;

    function rand() {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
    }

    // 2. the heart: big black and white QR-style blocks
    const j0 = Math.floor(-plateX / D) - 1;
    const j1 = Math.ceil((100 - plateX) / D) + 1;
    const i0 = Math.floor(-plateY / D) - 1;
    const i1 = Math.ceil((96 - plateY) / D) + 1;

    const rowAbove = {};

    for (let i = i0; i <= i1; i++) {

        let black = rand() < 0.5;
        let run = 0;

        for (let j = j0; j <= j1; j++) {

            if (run === 0) {
                black = !black;
                run = 1 + Math.floor(rand() * 3);
            }

            run--;

            // sometimes copy the block above, it makes chunky shapes
            if (rowAbove[j] !== undefined && rand() < 0.4) {
                black = rowAbove[j];
            }

            rowAbove[j] = black;

            const x = plateX + j * D;
            const y = plateY + i * D;

            if (!insideHeart(x + D / 2, y + D / 2)) continue;

            const touchesPlate =
                x + D > plateX && x < plateX + plateSide &&
                y + D > plateY && y < plateY + plateSide;

            // the edge of the heart stays white, so the shape always shows
            let onEdge = false;

            for (let a = -1; a <= 1; a++) {
                for (let b = -1; b <= 1; b++) {
                    if (!insideHeart(x + D / 2 + a * D, y + D / 2 + b * D)) {
                        onEdge = true;
                    }
                }
            }

            h.fillStyle =
                (black && !touchesPlate && !onEdge) ? "#0c0014" : "#ffffff";

            h.fillRect(x * u - 0.5, y * u - 0.5, D * u + 1, D * u + 1);

        }

    }

    // 3. the white plate in the middle
    h.fillStyle = "#ffffff";

    roundRectPath(
        h,
        plateX * u, plateY * u,
        plateSide * u, plateSide * u,
        c * u * 1.2
    );

    h.fill();

    // 4. the real, scannable QR squares
    if (model) {

        h.fillStyle = "#000000";

        const edgeX = function (index) {
            return Math.round((plateX + (3 + index) * c) * u);
        };

        const edgeY = function (index) {
            return Math.round((plateY + (3 + index) * c) * u);
        };

        for (let row = 0; row < n; row++) {

            for (let col = 0; col < n; col++) {

                if (!model.isDark(row, col)) continue;

                h.fillRect(
                    edgeX(col),
                    edgeY(row),
                    edgeX(col + 1) - edgeX(col),
                    edgeY(row + 1) - edgeY(row)
                );

            }

        }

    }

}


// ------------------------------------------
// setting up the screen
// ------------------------------------------

function spawnFlyer(f, farOnly) {

    const aspect = fW / fH;

    f.x = (Math.random() * 2 - 1) * aspect * 1.05;
    f.y = (Math.random() * 2 - 1) * 1.05;
    f.z = farOnly ? 1.5 + Math.random() * 0.15 : 0.1 + Math.random() * 1.5;
    f.rot0 = (Math.random() - 0.5) * 0.3;
    f.emoji = Math.random() < 0.12;
    f.idx = Math.floor(Math.random() * (f.emoji ? emojiSprites.length : sprites.length));
    f.tint = Math.random() < 0.55 ? "white" : "pink";

}

function resizeFinale() {

    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    fW = window.innerWidth;
    fH = window.innerHeight;

    finaleCanvas.width = fW * ratio;
    finaleCanvas.height = fH * ratio;

    fctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    // where everything goes
    const portrait = fW < fH * 0.9;

    layout.lines = portrait ? ["Happy 20th", "Birthday"] : ["Happy 20th Birthday"];
    layout.bigFs = portrait ? Math.min(fW * 0.14, fH * 0.12) : Math.min(fW * 0.075, fH * 0.2);
    layout.endFs = layout.bigFs * (portrait ? 0.62 : 0.5);
    layout.heartW = Math.min((fH * 0.54) / 0.88, (fW * 0.9) / 0.82);
    layout.heartH = layout.heartW * 0.96;
    layout.heartCx = fW / 2;
    layout.heartCy = fH * 0.6;
    layout.endCy = fH * 0.06 + (layout.lines.length * layout.endFs * 1.1) / 2;

    // faint twinkling stars
    fStars = [];

    for (let i = 0; i < 180; i++) {
        fStars.push({
            x: Math.random() * fW,
            y: Math.random() * fH,
            r: Math.random() * 1.1 + 0.3,
            p: Math.random() * Math.PI * 2,
            c: ["#ffffff", "#ffd1ea", "#ff9ad0"][Math.floor(Math.random() * 3)]
        });
    }

    if (sprites.length === 0) buildSprites();

    if (!heartImg) buildHeartImage();

    if (flyers.length === 0) {

        for (let i = 0; i < FLYER_COUNT; i++) {
            const f = {};
            spawnFlyer(f, false);
            flyers.push(f);
        }

    }

}


// ------------------------------------------
// drawing: stars, words, text
// ------------------------------------------

function drawFinaleStars(time) {

    fStars.forEach(s => {

        fctx.globalAlpha =
            Math.max(0.05, 0.3 + Math.sin(time * 0.002 + s.p) * 0.25);

        fctx.fillStyle = s.c;
        fctx.beginPath();
        fctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        fctx.fill();

    });

    fctx.globalAlpha = 1;

}

function drawFlyers(dt, alphaMul) {

    const focal = fH * 0.45;

    // far words first, so near words are on top
    flyers.sort((a, b) => b.z - a.z);

    flyers.forEach(p => {

        p.z -= dt * 0.0002;

        if (p.z < 0.07) spawnFlyer(p, true);

        const sx = fW / 2 + (p.x / p.z) * focal;
        const sy = fH / 2 + (p.y / p.z) * focal;

        const scale = ((fH * 0.05) / p.z / FONT_PX) * (p.emoji ? 0.9 : 1);

        const picture = p.emoji ? emojiSprites[p.idx] : sprites[p.idx][p.tint];

        // skip words that are far outside the screen
        if (
            Math.abs(sx - fW / 2) > fW * 1.2 + picture.width * scale ||
            Math.abs(sy - fH / 2) > fH * 1.2 + picture.height * scale
        ) return;

        const fade =
            clamp01((1.7 - p.z) / 0.4) *
            clamp01((p.z - 0.07) / 0.12);

        // words on the sides lean outwards, like a tunnel
        const rot =
            p.rot0 + ((sx - fW / 2) * (sy - fH / 2)) / (fW * fH) * 0.9;

        fctx.globalAlpha = alphaMul * fade;

        fctx.save();
        fctx.translate(sx, sy);
        fctx.rotate(rot);
        fctx.scale(scale, scale);
        fctx.drawImage(picture, -picture.width / 2, -picture.height / 2);
        fctx.restore();

    });

    fctx.globalAlpha = 1;

}

function glowText(text, x, y, fs, alpha) {

    fctx.font = "bold " + fs + "px " + FONT_FAMILY;
    fctx.textAlign = "center";
    fctx.textBaseline = "middle";

    fctx.globalAlpha = alpha;

    fctx.shadowColor = "rgba(255,70,170,0.95)";
    fctx.shadowBlur = fs * 0.5;
    fctx.fillStyle = "#ff9ad0";
    fctx.fillText(text, x, y);

    fctx.shadowColor = "rgba(255,160,220,0.9)";
    fctx.shadowBlur = fs * 0.18;
    fctx.fillStyle = "#ffffff";
    fctx.fillText(text, x, y);

    fctx.shadowBlur = 0;
    fctx.globalAlpha = 1;

}

function drawTitle(t, tStar, tArr) {

    const alpha = clamp01((t - tStar - 400) / 1500);

    if (alpha <= 0) return;

    // after the star arrives, the title slides up and gets smaller
    const e = easeInOut(clamp01((t - tArr - 150) / 1300));

    const fs =
        lerp(layout.bigFs, layout.endFs, e) *
        (e > 0 ? 1 : 0.9 + 0.1 * alpha);

    const midY = lerp(fH * 0.5, layout.endCy, e);

    const count = layout.lines.length;

    layout.lines.forEach((line, k) => {
        glowText(
            line,
            fW / 2,
            midY + (k - (count - 1) / 2) * fs * 1.1,
            fs,
            alpha
        );
    });

    // name appears under the title (only once the title has settled)
    const sub = clamp01((e - 0.85) / 0.15);

    if (sub > 0) {
        glowText(
            "Motho Wanga ❤",
            fW / 2,
            layout.endCy + (count * layout.endFs * 1.1) / 2 + layout.endFs * 0.7,
            layout.endFs * 0.55,
            sub
        );
    }

}


// ------------------------------------------
// the shooting star
// ------------------------------------------

function startStar() {

    const cx = fW / 2;
    const cy = fH / 2;

    // it can come from any direction
    const angle = Math.random() * Math.PI * 2;
    const far = Math.max(fW, fH) * 0.65;
    const turn = Math.random() < 0.5 ? -0.9 : 0.9;

    starPath = {
        p0: { x: cx + Math.cos(angle) * far, y: cy + Math.sin(angle) * far },
        p1: {
            x: cx + Math.cos(angle + turn) * far * 0.45,
            y: cy + Math.sin(angle + turn) * far * 0.45
        },
        p2: { x: cx, y: cy }
    };

    starTrail = [];

}

function drawStar(t, tStar, tArr) {

    if (!starPath) return;

    const u = clamp01((t - tStar) / STAR_DURATION);

    // it grows as it comes towards the front
    const size = 2 + Math.min(fW, fH) * 0.05 * u * u;

    if (u < 1) {

        const v = Math.pow(u, 1.5);
        const m = 1 - v;

        starX = m * m * starPath.p0.x + 2 * m * v * starPath.p1.x + v * v * starPath.p2.x;
        starY = m * m * starPath.p0.y + 2 * m * v * starPath.p1.y + v * v * starPath.p2.y;

        starTrail.push({ x: starX, y: starY, s: size });

        if (starTrail.length > 40) starTrail.shift();

    } else {

        starX = starPath.p2.x;
        starY = starPath.p2.y;

        if (starTrail.length) starTrail.shift();
        if (starTrail.length) starTrail.shift();

    }

    fctx.globalCompositeOperation = "lighter";
    fctx.lineCap = "round";

    // glowing tail
    for (let i = 1; i < starTrail.length; i++) {

        const a = i / starTrail.length;

        fctx.strokeStyle = "rgba(255,190,230," + (a * 0.85) + ")";
        fctx.lineWidth = Math.max(1, starTrail[i].s * a * 1.4);

        fctx.beginPath();
        fctx.moveTo(starTrail[i - 1].x, starTrail[i - 1].y);
        fctx.lineTo(starTrail[i].x, starTrail[i].y);
        fctx.stroke();

    }

    // bright head
    const headAlpha = 1 - clamp01((t - tArr) / 250);

    if (headAlpha > 0) {

        const glow = fctx.createRadialGradient(starX, starY, 0, starX, starY, size * 5);

        glow.addColorStop(0, "rgba(255,255,255," + headAlpha + ")");
        glow.addColorStop(0.25, "rgba(255,170,220," + (0.7 * headAlpha) + ")");
        glow.addColorStop(1, "rgba(255,80,170,0)");

        fctx.fillStyle = glow;
        fctx.beginPath();
        fctx.arc(starX, starY, size * 5, 0, Math.PI * 2);
        fctx.fill();

        fctx.strokeStyle = "rgba(255,255,255," + (0.8 * headAlpha) + ")";
        fctx.lineWidth = 1.5;
        fctx.beginPath();
        fctx.moveTo(starX - size * 7, starY);
        fctx.lineTo(starX + size * 7, starY);
        fctx.moveTo(starX, starY - size * 7);
        fctx.lineTo(starX, starY + size * 7);
        fctx.stroke();

    }

    fctx.globalCompositeOperation = "source-over";

}


// ------------------------------------------
// the moment the star becomes the heart
// ------------------------------------------

function makeBurst() {

    const k = Math.min(fW, fH) / 700;

    for (let i = 0; i < 70; i++) {

        const a = Math.random() * Math.PI * 2;
        const speed = (0.15 + Math.random() * 0.55) * k;

        bursts.push({
            x: fW / 2,
            y: fH / 2,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            life: 1,
            size: 1 + Math.random() * 2.5
        });

    }

}

function drawFlash(t, tArr) {

    const f = 1 - clamp01((t - tArr) / 1000);

    if (f <= 0) return;

    const r = Math.max(fW, fH) * lerp(0.25, 0.9, 1 - f);

    const g = fctx.createRadialGradient(fW / 2, fH / 2, 0, fW / 2, fH / 2, r);

    g.addColorStop(0, "rgba(255,255,255," + f + ")");
    g.addColorStop(0.4, "rgba(255,150,210," + (0.5 * f) + ")");
    g.addColorStop(1, "rgba(255,80,170,0)");

    fctx.globalCompositeOperation = "lighter";
    fctx.fillStyle = g;
    fctx.fillRect(0, 0, fW, fH);
    fctx.globalCompositeOperation = "source-over";

}

function drawBursts(dt) {

    fctx.globalCompositeOperation = "lighter";

    bursts.forEach(b => {

        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.life -= dt / 1400;

        if (b.life <= 0) return;

        fctx.globalAlpha = b.life;
        fctx.fillStyle = b.size > 2 ? "#ffffff" : "#ff9ad0";
        fctx.beginPath();
        fctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        fctx.fill();

    });

    fctx.globalAlpha = 1;
    fctx.globalCompositeOperation = "source-over";

    bursts = bursts.filter(b => b.life > 0);

}

// NOTE: this one is called drawFinaleHeart on purpose.
// Page 1 already has a function called drawHeart.
function drawFinaleHeart(t, tArr) {

    const hp = clamp01((t - tArr) / 1500);
    const alpha = clamp01((t - tArr) / 350);

    heartReady = hp >= 1;

    const cx = layout.heartCx;
    const cy = lerp(fH * 0.5, layout.heartCy, easeOutCubic(hp));

    const beat = heartReady ? 1 + Math.sin(t * 0.0035) * 0.025 : 1;
    const sc = easeOutBack(hp) * beat;

    const glowR = layout.heartW * 0.75;

    fctx.save();
    fctx.translate(cx, cy);
    fctx.scale(sc, sc);

    // pink glow behind the heart
    const g = fctx.createRadialGradient(0, 0, 0, 0, 0, glowR);
    g.addColorStop(0, "rgba(255,90,180," + (0.45 * alpha) + ")");
    g.addColorStop(1, "rgba(255,90,180,0)");

    fctx.fillStyle = g;
    fctx.fillRect(-glowR, -glowR, glowR * 2, glowR * 2);

    // the QR heart
    fctx.globalAlpha = alpha;
    fctx.drawImage(
        heartImg,
        -layout.heartW / 2, -layout.heartH / 2,
        layout.heartW, layout.heartH
    );

    fctx.restore();

    fctx.globalAlpha = 1;

}

function drawFloaters(t, tArr) {

    // little hearts popping up around the heart
    if (t > tArr + 1400 && t > nextFloat) {

        floaters.push({
            x: layout.heartCx + (Math.random() - 0.5) * layout.heartW * 1.1,
            y: layout.heartCy + (Math.random() - 0.2) * layout.heartH * 0.45,
            vy: 0.035 + Math.random() * 0.04,
            sway: Math.random() * Math.PI * 2,
            size: 0.7 + Math.random() * 0.9,
            sprite: Math.floor(Math.random() * heartSprites.length),
            born: t
        });

        nextFloat = t + 240;

    }

    const LIFE = 4200;

    floaters.forEach(f => {

        const age = t - f.born;

        const alpha = age < 250 ? age / 250 : 1 - (age - 250) / (LIFE - 250);

        if (alpha <= 0) return;

        const x = f.x + Math.sin(age * 0.003 + f.sway) * 12;
        const y = f.y - age * f.vy * (fH / 800);

        const pop = easeOutBack(clamp01(age / 350));
        const scale = pop * f.size * ((fH * 0.03) / FONT_PX);

        const picture = heartSprites[f.sprite];

        fctx.globalAlpha = alpha;

        fctx.save();
        fctx.translate(x, y);
        fctx.scale(scale, scale);
        fctx.drawImage(picture, -picture.width / 2, -picture.height / 2);
        fctx.restore();

    });

    fctx.globalAlpha = 1;

    floaters = floaters.filter(f => t - f.born < LIFE);

}

function drawScanText(t, tArr) {

    const alpha = clamp01((t - tArr - 2200) / 1200);

    if (alpha <= 0) return;

    const fs = Math.max(14, Math.min(fW * 0.022, 22));

    const y = Math.min(
        fH - 22,
        layout.heartCy + layout.heartH / 2 + fs * 1.6
    );

    glowText("Scan to open your birthday message.", fW / 2, y, fs, alpha);

}


// ------------------------------------------
// the main loop
// ------------------------------------------

function animateFinale(time) {

    if (!finaleRunning) return;

    const t = time - finaleStart;
    const dt = Math.min(50, time - lastFinaleTime);

    lastFinaleTime = time;

    const tStar = WORDS_DURATION + 300;
    const tArr = tStar + STAR_DURATION;

    fctx.clearRect(0, 0, fW, fH);

    drawFinaleStars(time);

    // 1. the flying words (they fade away when the star comes)
    const wordAlpha =
        clamp01(t / 800) *
        (1 - clamp01((t - WORDS_DURATION) / 1200));

    if (wordAlpha > 0) drawFlyers(dt, wordAlpha);

    // 2. big title behind the shooting star
    if (t >= tStar && !starPath) startStar();

    drawTitle(t, tStar, tArr);

    // 3. the shooting star
    drawStar(t, tStar, tArr);

    // 4. star arrives and becomes the heart
    if (t >= tArr && !arrived) {
        arrived = true;
        makeBurst();
    }

    if (arrived) {
        drawFinaleHeart(t, tArr);
        drawFlash(t, tArr);
        drawBursts(dt);
        drawFloaters(t, tArr);
        drawScanText(t, tArr);
    }

    requestAnimationFrame(animateFinale);

}

function startFinale() {

    if (finaleRunning) return;

    finaleRunning = true;

    resizeFinale();

    finaleStart = performance.now();
    lastFinaleTime = finaleStart;

    requestAnimationFrame(animateFinale);

}

window.addEventListener("resize", function () {
    if (finaleRunning) resizeFinale();
});

// tap the heart to open the link (useful on the same phone)
finaleCanvas.addEventListener("click", function (e) {

    if (!heartReady) return;

    const dx = Math.abs(e.clientX - layout.heartCx);
    const dy = Math.abs(e.clientY - layout.heartCy);

    if (
        dx < layout.heartW * 0.45 &&
        dy < layout.heartH * 0.45 &&
        QR_LINK.indexOf("http") === 0
    ) {
        window.open(QR_LINK, "_blank");
    }

});


// ==========================================
// 16. START THE UNIVERSE
// ==========================================

// ==========================================
// 16. START THE UNIVERSE
// ==========================================

const welcomePage = document.getElementById("welcomePage");
const enterGalaxyButton = document.getElementById("enterGalaxy");

if (welcomePage && enterGalaxyButton) {

    enterGalaxyButton.addEventListener("click", function () {

        if (introOpened) return;

        introOpened = true;

        // Start your original 20-second galaxy experience
        startTime = performance.now();

        // Hide the welcome page
        welcomePage.classList.add("welcome-hidden");

    });

} else {
    console.error("Could not find welcomePage or enterGalaxy button.");
}

// Start your original galaxy animation
window.addEventListener("resize", resizeCanvas);

resizeCanvas();

requestAnimationFrame(animate);




/* ==========================================
   WELCOME PAGE: PUMPING UNIVERSE HEART
   SHOOTING STARS + MAKE A WISH
========================================== */

(function () {

    const heartCanvas = document.getElementById("welcomeHeart");
    const shootingCanvas = document.getElementById("welcomeShootingStars");

    if (!heartCanvas || !shootingCanvas) {
        console.error("Welcome heart or shooting star canvas is missing.");
        return;
    }

    const heartCtx = heartCanvas.getContext("2d");
    const shootingCtx = shootingCanvas.getContext("2d");

    let width = 0;
    let height = 0;
    let heartParticles = [];
    let shootingStars = [];
    let lastStarTime = 0;

    // Resize both welcome canvases
    function resizeWelcomeCanvas() {

        width = window.innerWidth;
        height = window.innerHeight;

        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        [heartCanvas, shootingCanvas].forEach(canvas => {

            canvas.width = width * ratio;
            canvas.height = height * ratio;

            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            const canvasCtx = canvas.getContext("2d");
            canvasCtx.setTransform(ratio, 0, 0, ratio, 0, 0);

        });

        createHeartParticles();

    }

    // Create a recognisable heart using universe particles
    function createHeartParticles() {

        heartParticles = [];

        const total = 2200;

        for (let i = 0; i < total; i++) {

            const t = Math.random() * Math.PI * 2;

            const x = 16 * Math.pow(Math.sin(t), 3);

            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);

            // More particles near the heart outline
            const isOutline = Math.random() < 0.4;

            const depth = isOutline
                ? 0.88 + Math.random() * 0.12
                : Math.sqrt(Math.random()) * 0.88;

            heartParticles.push({

                x: x * depth,
                y: y * depth,

                size: isOutline
                    ? Math.random() * 1.8 + 0.9
                    : Math.random() * 1.5 + 0.4,

                brightness: isOutline ? 0.9 : Math.random(),

                phase: Math.random() * Math.PI * 2

            });

        }

    }

    // Draw the pumping universe heart
    function drawWelcomeHeart(time) {

        heartCtx.clearRect(0, 0, width, height);

        const centerX = width / 2;
        const centerY = height / 2;

        const baseSize = Math.min(
            width * 0.030,
            height * 0.030,
            20
        );

        // Double heartbeat
        const cycle = (time % 850) / 850;

        let beat = 1;

        if (cycle < 0.16) {

            beat = 1 +
                Math.sin((cycle / 0.16) * Math.PI) * 0.13;

        } else if (cycle >= 0.24 && cycle < 0.42) {

            beat = 1 +
                Math.sin(((cycle - 0.24) / 0.18) * Math.PI) * 0.09;

        }

        heartParticles.forEach(p => {

            const shimmer =
                0.45 + 0.55 *
                Math.sin(time * 0.002 + p.phase);

            const x = centerX + p.x * baseSize * beat;
            const y = centerY - p.y * baseSize * beat;

            const alpha = Math.max(0.15, shimmer);

            const colors = [
                `rgba(255,255,255,${alpha})`,
                `rgba(255,170,225,${alpha})`,
                `rgba(170,190,255,${alpha})`,
                `rgba(220,170,255,${alpha})`
            ];

            const color =
                colors[Math.floor(p.brightness * colors.length)];

            heartCtx.beginPath();
            heartCtx.fillStyle = color;
            heartCtx.shadowBlur = 12;
            heartCtx.shadowColor = color;

            heartCtx.arc(
                x,
                y,
                p.size,
                0,
                Math.PI * 2
            );

            heartCtx.fill();

        });

        heartCtx.shadowBlur = 0;

    }

    // Create shooting stars
    function createShootingStar() {

        shootingStars.push({

            x: Math.random() * width * 0.9,
            y: Math.random() * height * 0.55,

            speed: Math.random() * 8 + 9,
            length: Math.random() * 100 + 100,

            opacity: 1,
            size: Math.random() * 1.5 + 1,

            messageOpacity: 0,
            messageShown: false

        });

    }

    // Draw shooting stars and wish messages
    function drawShootingStars(time) {

        shootingCtx.clearRect(0, 0, width, height);

        if (time - lastStarTime > 2500 + Math.random() * 2500) {

            createShootingStar();
            lastStarTime = time;

        }

        shootingStars.forEach((star, index) => {

            star.x += star.speed;
            star.y += star.speed * 0.55;

            star.opacity -= 0.008;

            const gradient = shootingCtx.createLinearGradient(
                star.x - star.length,
                star.y - star.length * 0.55,
                star.x,
                star.y
            );

            gradient.addColorStop(0, "rgba(255,255,255,0)");
            gradient.addColorStop(0.7, "rgba(210,190,255,0.4)");
            gradient.addColorStop(1, "rgba(255,255,255,1)");

            // Shooting star trail
            shootingCtx.beginPath();
            shootingCtx.strokeStyle = gradient;
            shootingCtx.lineWidth = star.size;

            shootingCtx.moveTo(
                star.x - star.length,
                star.y - star.length * 0.55
            );

            shootingCtx.lineTo(star.x, star.y);
            shootingCtx.stroke();

            // Bright star head
            shootingCtx.beginPath();

            shootingCtx.fillStyle =
                `rgba(255,255,255,${Math.max(0, star.opacity)})`;

            shootingCtx.shadowBlur = 18;
            shootingCtx.shadowColor = "#ffffff";

            shootingCtx.arc(
                star.x,
                star.y,
                2.5,
                0,
                Math.PI * 2
            );

            shootingCtx.fill();
            shootingCtx.shadowBlur = 0;

            // Show "Make a wish"
            if (!star.messageShown && star.x > width * 0.35) {

                star.messageShown = true;
                star.messageOpacity = 1;

            }

            if (star.messageOpacity > 0) {

                shootingCtx.save();

                shootingCtx.globalAlpha = star.messageOpacity;

                shootingCtx.font =
                    'italic 15px "Segoe Script", cursive';

                shootingCtx.fillStyle = "#ffe2f5";
                shootingCtx.shadowBlur = 12;
                shootingCtx.shadowColor = "#ff8bd8";

                shootingCtx.fillText(
                    "Make a wish ✨",
                    star.x - 105,
                    star.y + 25
                );

                shootingCtx.restore();

                star.messageOpacity -= 0.012;

            }

            if (star.opacity <= 0) {
                shootingStars.splice(index, 1);
            }

        });

    }

    // Welcome animation loop
    function animateWelcome(time) {

        drawWelcomeHeart(time);
        drawShootingStars(time);

        requestAnimationFrame(animateWelcome);

    }

    window.addEventListener("resize", resizeWelcomeCanvas);

    resizeWelcomeCanvas();

    requestAnimationFrame(animateWelcome);

})();


const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const startMusicButton = document.getElementById("startMusicButton");
const musicInstruction = document.getElementById("musicInstruction");

// Start with the music control hidden
musicButton.hidden = true;

// PLAY OUR SONG FIRST
startMusicButton.addEventListener("click", async function () {

    try {

        await music.play();

        startMusicButton.textContent = "❤️ Our Song Is Playing";

        startMusicButton.disabled = true;

        musicInstruction.textContent =
            "Now that our song is playing, come inside my heart...";

        // Reveal the entry button only after music starts
        enterGalaxyButton.hidden = false;

        // Show the music control
        musicButton.hidden = false;
        musicButton.textContent = "⏸ Pause Music";

    } catch (error) {

        musicInstruction.textContent =
            "The song could not start. Please try again ❤️";

        console.error("Music playback error:", error);

    }

});

// MUSIC CONTROL
function toggleMusic() {

    if (music.paused) {

        music.play().catch(error => {
            console.error("Music playback error:", error);
        });

    } else {

        music.pause();

    }

}

// Keep the button text in sync with the music
music.addEventListener("play", function () {
    musicButton.textContent = "⏸ Pause Music";
});

music.addEventListener("pause", function () {
    musicButton.textContent = "🎵 Play Music";
});


/* =========================================
   INTERACTIVE GALAXY - DRAG AND DISCOVER
========================================= */

const interactiveGalaxy = document.getElementById("birthdayExperience");

const galaxyLayers = [
    document.getElementById("galaxy"),
    document.getElementById("messages"),
    document.getElementById("heart")
].filter(Boolean);

let galaxyOffsetX = 0;
let galaxyOffsetY = 0;

let pointerStartX = 0;
let pointerStartY = 0;

let startingOffsetX = 0;
let startingOffsetY = 0;

let galaxyPointerMoved = false;
let galaxyPointerActive = false;

let discoveredMessageIndex = 0;

// Enable exploration when she enters your heart
enterGalaxyButton.addEventListener("click", function () {
    interactiveGalaxy.classList.add("galaxy-explorable");
});

// Move the galaxy layers together
function moveGalaxy(x, y) {
    galaxyOffsetX = Math.max(-100, Math.min(100, x));
    galaxyOffsetY = Math.max(-100, Math.min(100, y));

    galaxyLayers.forEach(layer => {
        layer.style.translate =
            `${galaxyOffsetX}px ${galaxyOffsetY}px`;
    });
}

// Start dragging
interactiveGalaxy.addEventListener("pointerdown", function (event) {

    if (!interactiveGalaxy.classList.contains("galaxy-explorable")) return;

    // Keep the QR code and other controls clickable
    if (event.target.closest("#birthdayReveal, button, a")) return;

    galaxyPointerActive = true;
    galaxyPointerMoved = false;

    pointerStartX = event.clientX;
    pointerStartY = event.clientY;

    startingOffsetX = galaxyOffsetX;
    startingOffsetY = galaxyOffsetY;

    interactiveGalaxy.setPointerCapture(event.pointerId);
});

// Drag the universe
interactiveGalaxy.addEventListener("pointermove", function (event) {

    if (!galaxyPointerActive) return;

    const distanceX = event.clientX - pointerStartX;
    const distanceY = event.clientY - pointerStartY;

    if (Math.abs(distanceX) > 6 || Math.abs(distanceY) > 6) {
        galaxyPointerMoved = true;
    }

    if (galaxyPointerMoved) {
        moveGalaxy(
            startingOffsetX + distanceX * 0.6,
            startingOffsetY + distanceY * 0.6
        );
    }
});

// Release the universe
interactiveGalaxy.addEventListener("pointerup", function (event) {

    if (!galaxyPointerActive) return;

    galaxyPointerActive = false;

    if (!galaxyPointerMoved) {
        revealGalaxyMessage(event);
    }

    interactiveGalaxy.classList.remove("is-dragging");

    if (interactiveGalaxy.hasPointerCapture(event.pointerId)) {
        interactiveGalaxy.releasePointerCapture(event.pointerId);
    }
});

interactiveGalaxy.addEventListener("pointercancel", function (event) {
    galaxyPointerActive = false;
    interactiveGalaxy.classList.remove("is-dragging");
});

// Show a hidden romantic message when she taps the universe
function revealGalaxyMessage(event) {

    if (!Array.isArray(flyingMessages) || flyingMessages.length === 0) {
        return;
    }

    const message = document.createElement("div");

    message.className = "discovery-message";

    message.textContent =
        flyingMessages[discoveredMessageIndex % flyingMessages.length];

    discoveredMessageIndex++;

    message.style.left = `${event.clientX}px`;
    message.style.top = `${event.clientY}px`;

    interactiveGalaxy.appendChild(message);

    message.addEventListener("animationend", function () {
        message.remove();
    }, { once: true });
}