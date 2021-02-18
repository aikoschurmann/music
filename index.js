let expand = document.querySelector(".fa-chevron-up");
let collapse = document.querySelector(".fa-chevron-down");
let controlBar = document.querySelector(".control-bar");
let controlBarCollapsed = document.querySelector(".control-bar-collapsed");
let controlBarExpanded = document.querySelector(".control-bar-expanded");
let timeBar = document.querySelector(".progress-bar-inner");
let timeBar2 = document.querySelector(".progress-bar-2");
let play = document.querySelector(".play1");
let play2 = document.querySelector(".play2");
let duration;
let TimeStart = document.querySelector(".time-start");
let TimeEnd = document.querySelector(".time-end");
let artist = document.querySelector(".artist");
let artistValue = artist.innerHTML.replace(/&amp;/g, "&");
let song1 = new Audio("./song1.mp3");
let player;
let videotime;
let tag = document.createElement("script");
let firstScriptTag = document.getElementsByTagName("script")[0];
let id = "M7lc1UVf-VE";
let title = document.querySelector(".title");
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

expand.addEventListener("click", expandsection);
collapse.addEventListener("click", collapsesection);
timeBar2.addEventListener("input", updateTimebar);
song1.addEventListener("loadeddata", loadeddata);
window.onresize = displayUpdate;

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
  if (player.getPlayerState() != 1) {
    //song1.play();
    player.playVideo();
    play.classList = "fas fa-pause play";
    play2.classList = "fas fa-pause play2";
  } else {
    play.classList = "fas fa-play play";
    play2.classList = "fas fa-play play2";
    player.pauseVideo();
  }
}
function togglepause2() {
  if (player.getPlayerState() === 5) {
    player.playVideo();
    play2.classList = "fas fa-pause play2";
    play.classList = "fas fa-pause play";
  } else {
    player.stopVideo();
    play2.classList = "fas fa-play play2";
    play.classList = "fas fa-play play";
  }
}
function updateTimebar() {
  player.seekTo((timeBar2.value / 1000) * duration);
}
function displaytime() {
  var min = Math.floor(videotime / 60);
  var secs =
    Math.floor(videotime % 60) < 10
      ? "0" + Math.floor(videotime % 60)
      : Math.floor(videotime % 60);

  var min1 = Math.floor(duration / 60);
  var sec1 =
    Math.floor(duration % 60) < 10
      ? "0" + Math.floor(duration % 60)
      : Math.floor(duration % 60);

  TimeStart.innerHTML = min + ":" + secs;

  TimeEnd.innerHTML = min1 + ":" + sec1;
}
function loadeddata() {
  displaytime();
  timeBar.style.width = (videotime / duration) * 100 + "%";
  timeBar2.value = (videotime / duration) * 1000;

  play.addEventListener("click", togglepause);
  play2.addEventListener("click", togglepause2);
}

function displayUpdate() {
  let maxCharacters = Math.floor((screen.width - 165) / 7 - 4);

  artistValue.length > maxCharacters
    ? (artist.innerHTML = artistValue.slice(0, maxCharacters) + "...")
    : (artist.innerHTML = artistValue.slice(0, maxCharacters));
}

function updateInfo() {
  artist.innerHTML = player.getVideoData().author;
  title.innerHTML = player.getVideoData().title;
}
function onPlayerReady(event) {
  duration = player.getDuration();
  player.playVideo();
  player.seekTo(0);

  function updateTime() {
    loadeddata();
    var oldTime = videotime;
    if (player && player.getCurrentTime) {
      videotime = player.getCurrentTime();
    }
    if (videotime !== oldTime) {
    }
  }
  timeupdater = setInterval(updateTime, 250);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: "j59qQ7YWLxw",
    events: {
      onReady: onPlayerReady,
    },
  });
}
displayUpdate();

setInterval(() => {
  id = "xd2bKrDzMTg";
  player.destroy();

  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: id,
    events: {
      onReady: onPlayerReady,
    },
  });
}, 1000000000);
