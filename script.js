const lobby = document.getElementById("lobby-ui");
const victory = document.getElementById("victory-screen");

// ===================== JOUER =====================
document.getElementById("play-btn").addEventListener("click", () => {
  lobby.style.display = "none";
  victory.style.display = "flex";
  startConfetti();
});

document.getElementById("btn-rejouer").addEventListener("click", () => {
  victory.style.display = "none";
  lobby.style.display = "flex";
});

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
  const colors = ["#fbf9ef", "#ffe32e", "#f2b705", "#dfe6c4", "#ffffff", "#c9d9a0"];
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

  if (victory.style.display !== "flex") {
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
