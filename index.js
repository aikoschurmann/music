let expand = document.querySelector(".fa-chevron-up");
let collapse = document.querySelector(".fa-chevron-down");
let controlBar = document.querySelector(".control-bar");
let controlBarCollapsed = document.querySelector(".control-bar-collapsed");
let controlBarExpanded = document.querySelector(".control-bar-expanded");
let timeBar = document.querySelector(".progress-bar-inner");
let timeBar2 = document.querySelector(".progress-bar-2");
let play = document.querySelector(".play1");
let play2 = document.querySelector(".play2");
let duration = song1.duration;
let TimeStart = document.querySelector(".time-start");
let TimeEnd = document.querySelector(".time-end");

let song1 = new Audio("./song1.mp3");

expand.addEventListener("click", expandsection);
collapse.addEventListener("click", collapsesection);
timeBar2.addEventListener("input", updateTimebar);
song1.addEventListener("loadeddata", loadeddata);

function expandsection() {
  controlBar.style.height = "100%";
  controlBarCollapsed.style.display = "none";
  controlBarExpanded.style.display = "inline-block";

  displaytime();
}
function collapsesection() {
  controlBar.style.height = "";
  controlBarCollapsed.style.display = "inline-block";
  controlBarExpanded.style.display = "none";
}
function togglepause() {
  if (song1.paused) {
    song1.play();
    play.classList = "fas fa-pause play";
    play2.classList = "fas fa-pause play2";
  } else {
    song1.pause();
    play.classList = "fas fa-play play";
    play2.classList = "fas fa-play play2";
  }
}
function togglepause2() {
  if (song1.paused) {
    song1.play();
    play2.classList = "fas fa-pause play2";
    play.classList = "fas fa-pause play";
  } else {
    song1.pause();
    play2.classList = "fas fa-play play2";
    play.classList = "fas fa-play play";
  }
}
function updateTimebar() {
  song1.currentTime = (timeBar2.value / 1000) * song1.duration;
}
function displaytime() {
  var min = Math.floor(song1.currentTime / 60);
  var secs =
    Math.floor(song1.currentTime % 60) < 10
      ? "0" + Math.floor(song1.currentTime % 60)
      : Math.floor(song1.currentTime % 60);

  var min1 = Math.floor(song1.duration / 60);
  var sec1 =
    Math.floor(song1.duration % 60) < 10
      ? "0" + Math.floor(song1.duration % 60)
      : Math.floor(song1.duration % 60);

  TimeStart.innerHTML = min + ":" + secs;

  TimeEnd.innerHTML = min1 + ":" + sec1;
}
function loadeddata() {
  duration = song1.duration;
  song1.addEventListener("timeupdate", (event) => {
    timeBar.style.width = (song1.currentTime / song1.duration) * 100 + "%";
    timeBar2.value = (song1.currentTime / song1.duration) * 1000;

    displaytime();
  });

  play.addEventListener("click", togglepause);
  play2.addEventListener("click", togglepause2);
}
