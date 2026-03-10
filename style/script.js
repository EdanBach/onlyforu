const password = "1111";
let input = "";

const dots = document.querySelectorAll(".dot");
const buttons = document.querySelectorAll(".num-btn");

const lockScreen = document.getElementById("lock-screen");
const mainContent = document.getElementById("main-content");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("delete-btn")) {
      input = input.slice(0, -1);
    } else {
      const value = btn.dataset.value;

      if (!value) return;

      if (input.length < 4) input += value;
    }

    updateDots();
  });
});

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i < input.length);
  });

  if (input.length === 4) {
    checkPassword();
  }
}

function checkPassword() {
  if (input === password) {
    unlock();
  } else {
    shake();

    input = "";
    setTimeout(updateDots, 300);
  }
}

function unlock() {
  lockScreen.classList.add("unlocked");

  mainContent.classList.remove("main-content-hidden");
  mainContent.classList.add("main-content-visible");
}

function shake() {
  document.querySelector(".lock-content").classList.add("shake");

  setTimeout(() => {
    document.querySelector(".lock-content").classList.remove("shake");
  }, 500);
}

const overlays = {
  music: document.getElementById("music-overlay"),
  letter: document.getElementById("letter-overlay"),
  image: document.getElementById("image-overlay"),
  gift: document.getElementById("gift-overlay"),
};

document.getElementById("btn-music").onclick = () =>
  overlays.music.classList.add("active");
document.getElementById("btn-letter").onclick = openLetter;
document.getElementById("btn-image").onclick = openGallery;
document.getElementById("btn-gift").onclick = () =>
  overlays.gift.classList.add("active");

document.getElementById("close-music").onclick = () =>
  overlays.music.classList.remove("active");
document.getElementById("close-letter").onclick = () =>
  overlays.letter.classList.remove("active");
document.getElementById("close-image").onclick = () =>
  overlays.image.classList.remove("active");
document.getElementById("close-gift").onclick = () =>
  overlays.gift.classList.remove("active");

async function openLetter() {
  const res = await fetch("style/letter.txt");
  const text = await res.text();

  const body = document.getElementById("letter-body");

  body.innerHTML = "";

  text.split("\n").forEach((line) => {
    const p = document.createElement("p");
    p.textContent = line;
    body.appendChild(p);
  });

  overlays.letter.classList.add("active");
}

function openGallery() {
  const top = document.getElementById("gallery-top");
  const bottom = document.getElementById("gallery-bottom");

  if (top.children.length > 0) {
    overlays.image.classList.add("active");
    return;
  }

  for (let i = 1; i <= 14; i++) {
    const img = document.createElement("img");

    img.src = `style/img/Anh (${i}).jpg`;

    img.onclick = () => openLightbox(img.src);

    if (i <= 7) top.appendChild(img);
    else bottom.appendChild(img);
  }

  overlays.image.classList.add("active");
}

function openLightbox(src) {
  const overlay = document.getElementById("lightbox-overlay");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  overlay.classList.add("active");
}

document.getElementById("close-lightbox").onclick = () => {
  document.getElementById("lightbox-overlay").classList.remove("active");
};

const audio = document.getElementById("audio-player");

document.getElementById("play-pause-btn").onclick = () => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

const btnAlbum = document.getElementById("btn-album")
const albumOverlay = document.getElementById("album-overlay")
const closeAlbum = document.getElementById("close-album")

btnAlbum.addEventListener("click", () => {
  albumOverlay.classList.add("active")
})

closeAlbum.addEventListener("click", () => {
  albumOverlay.classList.remove("active")
})

const btnJourney = document.getElementById("btn-journey")
const journeyOverlay = document.getElementById("journey-overlay")
const closeJourney = document.getElementById("close-journey")

btnJourney.addEventListener("click", () => {
  journeyOverlay.classList.add("active")
})

closeJourney.addEventListener("click", () => {
  journeyOverlay.classList.remove("active")
})

const btnResetLock = document.getElementById("btn-reset-lock");

btnResetLock.addEventListener("click", resetLock);

function resetLock() {

  // reset input password
  input = "";

  // reset dots
  dots.forEach(dot => {
    dot.classList.remove("active");
  });

  // ẩn menu
  mainContent.classList.add("main-content-hidden");
  mainContent.classList.remove("main-content-visible");

  // hiện lại lock screen
  lockScreen.classList.remove("unlocked");
}