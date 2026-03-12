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

document.getElementById("btn-music").onclick = () => {
  overlays.music.classList.add("active");

  currentSong=0;
  loadSong(currentSong);
};
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

const btnAlbum = document.getElementById("btn-album");
const albumOverlay = document.getElementById("album-overlay");
const closeAlbum = document.getElementById("close-album");

btnAlbum.addEventListener("click", () => {
  albumOverlay.classList.add("active");
});

closeAlbum.addEventListener("click", () => {
  albumOverlay.classList.remove("active");
});

const btnJourney = document.getElementById("btn-journey");
const journeyOverlay = document.getElementById("journey-overlay");
const closeJourney = document.getElementById("close-journey");

btnJourney.addEventListener("click", () => {
  journeyOverlay.classList.add("active");
});

closeJourney.addEventListener("click", () => {
  journeyOverlay.classList.remove("active");
});

const btnResetLock = document.getElementById("btn-reset-lock");

btnResetLock.addEventListener("click", resetLock);

function resetLock() {
  // reset input password
  input = "";

  // reset dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // ẩn menu
  mainContent.classList.add("main-content-hidden");
  mainContent.classList.remove("main-content-visible");

  // hiện lại lock screen
  lockScreen.classList.remove("unlocked");
}

const audioPlayer = document.getElementById("audio-player");

const playBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const title = document.getElementById("song-title");
const artist = document.getElementById("song-artist");
const albumArt = document.querySelector("#album-art img");

const progressBar = document.getElementById("progress");
const progressContainer = document.getElementById("progress-bar");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
  {
    title: "Ai Ngoài Anh",
    artist: "VSTRA",
    src: "style/sound/Ai Ngoài Anh.mp3",
    cover: "style/sound/Anh (1).jpg",
  },
  {
    title: "In Love x Có Đôi Điều",
    artist: "Grey D",
    src: "style/sound/In Love x Có Đôi Điều.mp3",
    cover: "style/sound/Anh (2).jpg",
  },
  {
    title: "Nơi Này Có Anh",
    artist: "Grey D",
    src: "style/sound/Nơi Này Có Anh.mp3",
    cover: "style/sound/Anh (3).jpg",
  },
  {
    title: "Lỡ Say Bye Là Bye",
    artist: "Grey D",
    src: "style/sound/Lỡ Say Bye Là Bye.mp3",
    cover: "style/sound/Anh (4).jpg",
  },
  {
    title: "MISSING YOU",
    artist: "Grey D",
    src: "style/sound/MISSING YOU.mp3",
    cover: "style/sound/Anh (5).jpg",
  },
  {
    title: "Anh là ai",
    artist: "Grey D",
    src: "style/sound/Anh là ai.mp3",
    cover: "style/sound/Anh (6).jpg",
  },
];


let currentSong = 0;

function loadSong(index){

const song=songs[index];

title.innerText=song.title;
artist.innerText=song.artist;

albumArt.src=song.cover;
audioPlayer.src=song.src;

document.querySelectorAll(".song-item").forEach(el=>el.classList.remove("active"));

document.querySelectorAll(".song-item")[index].classList.add("active");

}

playBtn.onclick = () => {

if(audioPlayer.paused){

audioPlayer.play();
playBtn.innerHTML='<i class="fa-solid fa-pause"></i>';

document.getElementById("album-art").classList.add("playing");

}else{

audioPlayer.pause();
playBtn.innerHTML='<i class="fa-solid fa-play"></i>';

document.getElementById("album-art").classList.remove("playing");

}

};

nextBtn.onclick = () => {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);
  audioPlayer.play();
};

prevBtn.onclick = () => {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);
  audioPlayer.play();
};

audioPlayer.addEventListener("timeupdate", () => {
  const { currentTime, duration } = audioPlayer;

  const progressPercent = (currentTime / duration) * 100;

  progressBar.style.width = progressPercent + "%";

  currentTimeEl.innerText = formatTime(currentTime);
  durationEl.innerText = formatTime(duration);
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

progressContainer.onclick = (e) => {
  const width = progressContainer.clientWidth;

  const clickX = e.offsetX;

  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
};

const songList = document.getElementById("song-list");

songs.forEach((song,index)=>{

const item = document.createElement("div");
item.className="song-item";

item.innerHTML = `
<img src="${song.cover}">
<div class="song-item-info">
<div class="song-item-title">${song.title}</div>
<div class="song-item-artist">${song.artist}</div>
</div>
`;

item.onclick=()=>{
currentSong=index;
loadSong(index);
audioPlayer.play();
};

songList.appendChild(item);

});

const floatingIcons = document.getElementById("floating-icons")

const icons = ["🐱", "💖", "💕", "💗", "💘", "💝", "🌸", "✨", "🐈", "⭐"]

function createFloatingIcon(){

const icon = document.createElement("div")

icon.className="floating-icon"

icon.innerText = icons[Math.floor(Math.random()*icons.length)]

// random vị trí ngang
icon.style.left = Math.random()*100 + "%"

// random tốc độ
icon.style.animationDuration = (Math.random()*5 + 6) + "s"

// random kích thước
icon.style.fontSize = (Math.random()*20 + 20) + "px"

floatingIcons.appendChild(icon)

setTimeout(()=>{
icon.remove()
},11000)

}

setInterval(createFloatingIcon,800)