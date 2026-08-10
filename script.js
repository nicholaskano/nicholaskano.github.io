const photos = [...document.querySelectorAll(".photo img")];
const lightbox = document.querySelector(".lightbox");
const viewer = lightbox.querySelector("img");
const counter = lightbox.querySelector(".counter");
let selected = 0;

function show(index) {
  selected = (index + photos.length) % photos.length;
  viewer.src = photos[selected].src;
  viewer.alt = photos[selected].alt;
  counter.textContent = `${String(selected + 1).padStart(2, "0")} / ${photos.length}`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".close").focus();
}
function close() { lightbox.hidden = true; document.body.style.overflow = ""; }
document.querySelectorAll(".photo").forEach((button, index) => button.addEventListener("click", () => show(index)));
lightbox.querySelector(".close").addEventListener("click", close);
lightbox.querySelector(".previous").addEventListener("click", event => { event.stopPropagation(); show(selected - 1); });
lightbox.querySelector(".next").addEventListener("click", event => { event.stopPropagation(); show(selected + 1); });
viewer.addEventListener("click", event => event.stopPropagation());
lightbox.addEventListener("click", close);
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") close();
  if (event.key === "ArrowLeft") show(selected - 1);
  if (event.key === "ArrowRight") show(selected + 1);
});
document.querySelector("#year").textContent = new Date().getFullYear();
