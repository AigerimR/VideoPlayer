const playBtn = document.querySelector(".play-btn");
const playBtnMiddle = document.querySelector(".play-btn-middle");

const video = document.querySelector(".video");
const currentTime = document.querySelector(".current-time");
const totalTime = document.querySelector(".total-time");

const volumeBtn = document.querySelector(".volume-btn");
const volumeRange = document.querySelector(".volume-range");
const forwardBtn = document.querySelector(".forward-btn");
const backwardBtn = document.querySelector(".backward-btn");
const SpeedButtons = document.querySelectorAll(".speed-btns");
const playbackSpeedBtn = document.querySelectorAll(".playback-speed-btn");
const expandBtn = document.querySelector(".expand-btn");
const progress = document.querySelector(".progress");
const filledProgress = document.querySelector(".filled-progress");

//Play & Stop function
function playFunction(e) {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = `<i class="fa-regular fa-circle-pause fa-2x"></i>`;
    playBtnMiddle.style.display = "none";
  } else {
    video.pause();
    playBtn.innerHTML = `<i class="far fa-play-circle fa-2x"></i>`;
    playBtnMiddle.style.display = "block";
  }
}
//Play & sotp on pressing the Space bar
document.addEventListener("keypress", function (e) {
  if (e.code === "Space") {
    playFunction();
  }
});
//Screen click stop & play
video.addEventListener("click", playFunction);

// Middle Play Btn
playBtnMiddle.addEventListener("click", playFunction);

//Play&Pause Btn
playBtn.addEventListener("click", playFunction);

// Video duration: total & current time
function timing() {
  let currentMin = Math.floor(video.currentTime / 60);
  let currentSec = Math.floor(video.currentTime - currentMin * 60);
  let totalMin = Math.floor(video.duration / 60);
  let totalSec = Math.floor(video.duration - totalMin * 60);

  currentTime.innerHTML = `${currentMin < 10 ? "0" + currentMin : currentMin}:${
    currentSec < 10 ? "0" + currentSec : currentSec
  }`;
  totalTime.innerHTML = `${totalMin < 10 ? "0" + totalMin : totalMin}:${
    totalSec < 10 ? "0" + totalSec : totalSec
  }`;
}

video.addEventListener("timeupdate", timing);

//Volume Btn and Volume Range
volumeBtn.addEventListener("click", function (e) {
  if (video.volume === 1) {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
    video.volume = 0;
  } else {
    volumeBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    video.volume = 1;
  }
});

volumeRange.addEventListener("mousemove", function (e) {
  video.volume = volumeRange.value;
});

//Forward & backward buttons
forwardBtn.addEventListener("click", function (e) {
  video.currentTime = video.currentTime + 10;
});
backwardBtn.addEventListener("click", function (e) {
  video.currentTime = video.currentTime - 10;
});

// Playback Speed button

SpeedButtons.forEach((li) => {
  li.addEventListener("click", function (e) {
    video.playbackRate = e.target.value;
    playbackSpeedBtn.forEach((btn) => {
      btn.classList.add("hidden");
    });
    e.target.classList.remove("hidden");
  });
});

// Expand Screen
expandBtn.addEventListener("click", function (e) {
  if (video.webkitSupportsFullscreen) video.webkitEnterFullScreen();
});

//Progress & Filled Progress Bar
video.addEventListener("timeupdate", function (e) {
  filledProgress.style.width = `${(video.currentTime / video.duration) * 100}%`;
});

progress.addEventListener("click", function (e) {
  video.currentTime = `${(e.offsetX / progress.offsetWidth) * video.duration}`;
});
