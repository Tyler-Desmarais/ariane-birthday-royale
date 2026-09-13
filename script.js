// Passe à true pour rejouer la séquence de largage (matchmaking → bus de
// combat → saut) entre le salon et l'écran de victoire.
const SHOW_DROP_SEQUENCE = false;

const lobby = document.getElementById("lobby-ui");
const dropScreen = document.getElementById("drop-screen");
const victory = document.getElementById("victory-screen");

const phases = {
  match: document.querySelector(".phase-match"),
  bus: document.querySelector(".phase-bus"),
  dive: document.querySelector(".phase-dive"),
};

let timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
const clearTimers = () => {
  timers.forEach(clearTimeout);
  timers = [];
};

// ===================== JOUER =====================
document.getElementById("play-btn").addEventListener("click", () => {
  blip();
  lobby.classList.add("hidden");
  later(SHOW_DROP_SEQUENCE ? startDrop : showVictory, 1000);
});

function showVictory() {
  clearTimers();
  dropScreen.classList.remove("show");
  victory.classList.add("show");
  requestAnimationFrame(() => victory.classList.add("visible"));
  startConfetti();
}

document.getElementById("btn-rejouer").addEventListener("click", () => {
  clearTimers();
  victory.classList.remove("visible");
  later(() => {
    victory.classList.remove("show");
    lobby.classList.remove("hidden");
  }, 1000);
});

// ===================== LARGAGE =====================
function showPhase(name) {
  Object.values(phases).forEach((p) => p.classList.remove("active"));
  phases[name].classList.add("active");
}

function restartAnimation(el) {
  el.style.animation = "none";
  void el.offsetWidth;
  el.style.animation = "";
}

function startDrop() {
  clearTimers();
  dropScreen.classList.add("show");
  showPhase("match");
  countPlayers();

  later(() => {
    showPhase("bus");
    restartAnimation(document.querySelector(".bus"));
    const busText = document.getElementById("bus-text");
    busText.textContent = "LARGAGE DANS 3";
    later(() => (busText.textContent = "LARGAGE DANS 2"), 1000);
    later(() => (busText.textContent = "LARGAGE DANS 1"), 2000);
    later(() => (busText.textContent = "SAUTEZ !"), 3000);
  }, 1800);

  later(() => showPhase("dive"), 6000);
  later(showVictory, 8200);
}

function countPlayers() {
  const el = document.getElementById("player-count");
  let n = 1;
  const step = () => {
    n += Math.floor(Math.random() * 9) + 3;
    if (n >= 100) {
      el.textContent = "100";
      return;
    }
    el.textContent = n;
    later(step, 90);
  };
  step();
}

document.getElementById("btn-skip").addEventListener("click", showVictory);

// ===================== SON =====================
let audioCtx;
function blip() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(660, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1180, audioCtx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.24);
  } catch (e) {
    /* pas de son, pas grave */
  }
}

// ===================== CONFETTIS =====================
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
let pieces = [];
let running = false;

function sizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
sizeCanvas();
window.addEventListener("resize", sizeCanvas);

function startConfetti() {
  sizeCanvas();
  const colors = ["#42e8ff", "#9df4ff", "#ffe32e", "#5eead4", "#ffffff", "#ff8fa3"];
  pieces = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.6,
    w: Math.random() * 8 + 4,
    h: Math.random() * 12 + 6,
    speed: Math.random() * 2.2 + 1.4,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 9,
    drift: (Math.random() - 0.5) * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  if (!running) {
    running = true;
    loopConfetti();
  }
}

function loopConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let active = false;
  pieces.forEach((c) => {
    c.y += c.speed;
    c.x += c.drift;
    c.rot += c.rotSpeed;
    if (c.y < canvas.height + 20) active = true;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate((c.rot * Math.PI) / 180);
    ctx.fillStyle = c.color;
    ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    ctx.restore();
  });

  if (!victory.classList.contains("show")) {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }
  if (active) {
    requestAnimationFrame(loopConfetti);
  } else {
    setTimeout(startConfetti, 700);
  }
}
