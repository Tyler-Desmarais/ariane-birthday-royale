const lobby = document.getElementById("lobby-ui");
const victory = document.getElementById("victory-screen");

document.getElementById("play-btn").addEventListener("click", () => {
  lobby.style.display = "none";
  victory.style.display = "block";
  setActive(active);
});

document.getElementById("btn-rejouer").addEventListener("click", () => {
  victory.style.display = "none";
  lobby.style.display = "flex";
});

// ===================== GALERIE =====================
const track = document.getElementById("gal-track");
const prev = document.getElementById("gal-prev");
const next = document.getElementById("gal-next");
const dotBar = document.getElementById("gal-dots");
const slides = [...track.querySelectorAll("img")];

let active = 0;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Photo ${i + 1}`);
  dot.addEventListener("click", () => goTo(i));
  dotBar.appendChild(dot);
});
const dots = [...dotBar.children];

function setActive(i) {
  active = Math.max(0, Math.min(slides.length - 1, i));
  dots.forEach((d, n) => d.classList.toggle("on", n === active));
  prev.disabled = active === 0;
  next.disabled = active === slides.length - 1;
}

function goTo(i) {
  const target = Math.max(0, Math.min(slides.length - 1, i));
  track.scrollTo({ left: target * track.clientWidth, behavior: "smooth" });
  setActive(target);
}

// Le suivi de la diapo courante passe par IntersectionObserver plutôt que par
// l'évènement scroll : c'est ce qui capte aussi les balayages tactiles, et
// l'évènement scroll ne se déclenche pas de façon fiable sur cette piste.
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) setActive(slides.indexOf(e.target));
    });
  },
  { root: track, threshold: 0.6 }
);
slides.forEach((s) => io.observe(s));

prev.addEventListener("click", () => goTo(active - 1));
next.addEventListener("click", () => goTo(active + 1));

// une molette verticale fait défiler la galerie horizontalement
track.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    goTo(active + (e.deltaY > 0 ? 1 : -1));
  },
  { passive: false }
);

document.addEventListener("keydown", (e) => {
  if (victory.style.display !== "block") return;
  if (e.key === "ArrowLeft") goTo(active - 1);
  if (e.key === "ArrowRight") goTo(active + 1);
});

setActive(0);
