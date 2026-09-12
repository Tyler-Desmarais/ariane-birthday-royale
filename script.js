// ===================== CONFIG: edit messages/positions here =====================
const LOOT = [
  {
    id: "kangaroo",
    icon: "🦘",
    name: "Boxing Kangaroo",
    rarity: "epic",
    x: 22, y: 24,
    message: "You've got kangaroo energy — zero to full send in one bounce. Nobody's ever ready for it."
  },
  {
    id: "dq",
    icon: "🍦",
    name: "DQ Blizzard",
    rarity: "rare",
    x: 74, y: 18,
    message: "Your Dairy Queen order lives rent-free in everyone's memory. Certified regular."
  },
  {
    id: "surfboard",
    icon: "🏄",
    name: "Surfboard",
    rarity: "epic",
    x: 15, y: 55,
    message: "Real waves or just riding the vibes — either way you make it look effortless."
  },
  {
    id: "flask",
    icon: "🧪",
    name: "Chemistry Flask",
    rarity: "legendary",
    x: 50, y: 40,
    message: "Certified mad scientist. You'd turn 'let's just wing it' into an actual controlled experiment."
  },
  {
    id: "drink",
    icon: "🍹",
    name: "Sangria & Martini",
    rarity: "rare",
    x: 84, y: 58,
    message: "Sangria in one hand, martini energy in the other. Main character hours, always."
  },
  {
    id: "ipad",
    icon: "📱",
    name: "The iPad",
    rarity: "rare",
    x: 30, y: 78,
    message: "iPad within arm's reach at all times. At this point it's basically a limb."
  },
  {
    id: "sloth",
    icon: "🦥",
    name: "Paresseux",
    rarity: "epic",
    x: 65, y: 82,
    message: "Professional relaxer. When it's nap o'clock, you are the CEO of doing absolutely nothing."
  },
  {
    id: "airplane",
    icon: "✈️",
    name: "Boarding Pass",
    rarity: "epic",
    x: 50, y: 12,
    message: "Bags packed, boarding pass ready — you're always one text away from a spontaneous trip."
  },
];

const RARITY_LABEL = { rare: "RARE", epic: "EPIC", legendary: "LEGENDARY" };

// ===================== SCREEN NAV =====================
const screens = {
  boot: document.getElementById("screen-boot"),
  locker: document.getElementById("screen-locker"),
  lobby: document.getElementById("screen-lobby"),
  victory: document.getElementById("screen-victory"),
};

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo(0, 0);
}

document.getElementById("btn-drop-in").addEventListener("click", () => showScreen("locker"));
document.getElementById("btn-squad-up").addEventListener("click", () => showScreen("lobby"));
document.getElementById("btn-replay").addEventListener("click", () => {
  collected.clear();
  buildIsland();
  updateProgress();
  document.getElementById("inventory-bar").innerHTML = "";
  showScreen("lobby");
});

// ===================== ISLAND / CHESTS =====================
const island = document.getElementById("island");
const collected = new Set();

function buildIsland() {
  island.innerHTML = "";
  LOOT.forEach((item) => {
    const btn = document.createElement("button");
    btn.className = "chest";
    btn.style.left = item.x + "%";
    btn.style.top = item.y + "%";
    btn.dataset.id = item.id;
    btn.innerHTML = `
      <span class="chest-icon">🎁</span>
      <span class="chest-label">${item.name}</span>
    `;
    btn.addEventListener("click", () => openChest(item, btn));
    island.appendChild(btn);
  });
}

function openChest(item, btn) {
  if (collected.has(item.id)) return;
  collected.add(item.id);
  btn.classList.add("collected", "pop");
  btn.querySelector(".chest-icon").textContent = item.icon;

  showLootModal(item);
  addToInventory(item);
  updateProgress();

  if (collected.size === LOOT.length) {
    setTimeout(() => showScreen("victory") || startConfetti(), 900);
  }
}

function updateProgress() {
  const pct = Math.round((collected.size / LOOT.length) * 100);
  document.getElementById("progress-fill").style.width = pct + "%";
  document.getElementById("progress-label").textContent = `${collected.size} / ${LOOT.length} COLLECTED`;
}

function addToInventory(item) {
  const bar = document.getElementById("inventory-bar");
  const el = document.createElement("div");
  el.className = "inv-item";
  el.title = item.name;
  el.textContent = item.icon;
  bar.appendChild(el);
}

// ===================== LOOT MODAL =====================
const lootModal = document.getElementById("loot-modal");
function showLootModal(item) {
  document.getElementById("loot-icon").textContent = item.icon;
  document.getElementById("loot-name").textContent = item.name;
  document.getElementById("loot-message").textContent = item.message;
  const rarityEl = document.getElementById("loot-rarity");
  rarityEl.textContent = RARITY_LABEL[item.rarity];
  rarityEl.style.color =
    item.rarity === "legendary" ? "#f7a531" : item.rarity === "epic" ? "#a479e2" : "#4a86e8";
  rarityEl.style.borderColor = rarityEl.style.color;
  rarityEl.style.border = "1px solid " + rarityEl.style.color;
  rarityEl.style.background = "transparent";
  lootModal.classList.add("show");
}
document.getElementById("btn-loot-close").addEventListener("click", () => {
  lootModal.classList.remove("show");
});
lootModal.addEventListener("click", (e) => {
  if (e.target === lootModal) lootModal.classList.remove("show");
});

// ===================== BACKGROUND PARTICLES =====================
const bgCanvas = document.getElementById("bg-canvas");
const bgCtx = bgCanvas.getContext("2d");
let particles = [];

function resizeCanvas(canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas(bgCanvas);

function initParticles() {
  particles = Array.from({ length: 46 }, () => ({
    x: Math.random() * bgCanvas.width,
    y: Math.random() * bgCanvas.height,
    r: Math.random() * 2 + 0.6,
    speed: Math.random() * 0.35 + 0.08,
    drift: (Math.random() - 0.5) * 0.3,
    hue: Math.random() > 0.5 ? "45,212,191" : "74,222,128",
    alpha: Math.random() * 0.5 + 0.2,
  }));
}
initParticles();

function animateBg() {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  particles.forEach((p) => {
    p.y -= p.speed;
    p.x += p.drift;
    if (p.y < -5) {
      p.y = bgCanvas.height + 5;
      p.x = Math.random() * bgCanvas.width;
    }
    bgCtx.beginPath();
    bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    bgCtx.fillStyle = `rgba(${p.hue},${p.alpha})`;
    bgCtx.fill();
  });
  requestAnimationFrame(animateBg);
}
animateBg();

window.addEventListener("resize", () => {
  resizeCanvas(bgCanvas);
  initParticles();
  if (confettiCanvas) resizeCanvas(confettiCanvas);
});

// ===================== CONFETTI (Victory screen) =====================
const confettiCanvas = document.getElementById("confetti-canvas");
const confettiCtx = confettiCanvas.getContext("2d");
let confettiPieces = [];
let confettiRunning = false;

function startConfetti() {
  resizeCanvas(confettiCanvas);
  const colors = ["#2dd4bf", "#4ade80", "#facc15", "#5eead4", "#ffffff"];
  confettiPieces = Array.from({ length: 140 }, () => ({
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height * 0.5,
    w: Math.random() * 8 + 4,
    h: Math.random() * 12 + 6,
    speed: Math.random() * 2 + 1.5,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 8,
    drift: (Math.random() - 0.5) * 1.4,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  if (!confettiRunning) {
    confettiRunning = true;
    runConfetti();
  }
}

function runConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  let stillActive = false;
  confettiPieces.forEach((c) => {
    c.y += c.speed;
    c.x += c.drift;
    c.rot += c.rotSpeed;
    if (c.y < confettiCanvas.height + 20) stillActive = true;
    confettiCtx.save();
    confettiCtx.translate(c.x, c.y);
    confettiCtx.rotate((c.rot * Math.PI) / 180);
    confettiCtx.fillStyle = c.color;
    confettiCtx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
    confettiCtx.restore();
  });
  if (screens.victory.classList.contains("active") && stillActive) {
    requestAnimationFrame(runConfetti);
  } else if (screens.victory.classList.contains("active")) {
    // relaunch a lighter burst so it keeps feeling alive
    setTimeout(startConfetti, 600);
  } else {
    confettiRunning = false;
  }
}

// ===================== INIT =====================
buildIsland();
updateProgress();
