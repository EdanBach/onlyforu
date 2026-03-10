let explosionIcon = "💗";

let isGifting = true;
let giftInterval = null;

let isMessaging = true;
let messageInterval = null;

let messages = [];

async function loadMessages() {
  try {
    const res = await fetch("./style/mess.txt");
    const text = await res.text();

    messages = text
      .split("\n")
      .map((m) => m.trim())
      .filter((m) => m !== "");
  } catch (err) {
    console.error("Load message error", err);

    messages = ["Anh yêu em ❤️"];
  }
}

loadMessages();

window.addEventListener("load", startExperience);

function startExperience() {
  setTimeout(() => {
    createFallingImage();

    giftInterval = setInterval(createFallingImage, 1000);

    createFallingMessage();

    messageInterval = setInterval(createFallingMessage, 1500);
  }, 5000);
}

function createFallingImage() {
  if (!isGifting) return;

  const img = document.createElement("img");

  const index = Math.floor(Math.random() * 14) + 1;

  img.src = `../img/Anh (${index}).jpg`;

  img.className = "falling-image";

  const width = window.innerWidth;

  const size = Math.random() * 60 + 60;

  const left = Math.random() * (width - size);

  const duration = Math.random() * 4 + 4;

  img.style.left = left + "px";

  img.style.width = size + "px";

  img.style.animationDuration = duration + "s";

  document.body.appendChild(img);

  setTimeout(() => {
    img.remove();
  }, duration * 1000);
}

function createFallingMessage() {
  if (!isMessaging) return;

  const div = document.createElement("div");

  div.className = "falling-message";

  div.innerText = messages[Math.floor(Math.random() * messages.length)];

  const width = window.innerWidth;

  const padding = 20;

  const left = Math.random() * (width - padding * 2) + padding;

  const duration = Math.random() * 5 + 5;

  const fontSize =
    width < 600 ? Math.random() * 4 + 14 : Math.random() * 6 + 16;

  div.style.left = left + "px";

  div.style.fontSize = fontSize + "px";

  div.style.animationDuration = duration + "s";

  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, duration * 1000);
}

document.addEventListener("click", (e) => {
  createHearts(e.clientX, e.clientY);
});

document.addEventListener("touchstart", (e) => {
  createHearts(e.touches[0].clientX, e.touches[0].clientY);
});

function createHearts(x, y) {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = explosionIcon;

    const angle = Math.random() * Math.PI * 2;

    const distance = Math.random() * 150 + 50;

    const xMove = Math.cos(angle) * distance;

    const yMove = Math.sin(angle) * distance;

    heart.style.setProperty("--x", xMove);
    heart.style.setProperty("--y", yMove);

    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.style.fontSize = Math.random() * 20 + 10 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}

const popSound = document.getElementById("pop-sound");

window.addEventListener("click", () => {
  if (!popSound) return;

  const sound = popSound.cloneNode(true);

  sound.play();
});
