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
let title = document.querySelector(".title");
let artistValue = artist.innerHTML.replace(/&amp;/g, "&");
let titleValue = title.innerHTML.replace(/&amp;/g, "&");
let song1 = new Audio("./song1.mp3");
let player;
let videotime;
let tag = document.createElement("script");
let firstScriptTag = document.getElementsByTagName("script")[0];
let id = "M7lc1UVf-VE";
let next1 = document.querySelector(".next1");
let innerpicture = document.querySelector(".inner-picture");
let innerpicture2 = document.querySelector(".control-bar-innerpicture-exp");
let songIndex = 0;
let title2 = document.querySelector(".control-bar-title-exp");
let artist2 = document.querySelector(".control-bar-artist-exp");
let next2 = document.querySelector(".next2");
let prev2 = document.querySelector(".prev2");
let test = document.querySelector(".test");
let db = [
  {
    id: "bM7SZ5SBzyY",
    title: "Fade",
    artist: "Alan Walker",
    url: "https://i1.sndcdn.com/artworks-000152209996-zt335k-t500x500.jpg",
    color: "#101010",
  },
  {
    id: "K4DyBUG242c",
    title: "On & On",
    artist: "Cartoon",
    url: "https://i1.sndcdn.com/artworks-000174691373-1s4mj0-t500x500.jpg",
    color: "#2e2833",
  },
  {
    id: "AOeY-nDp7hI",
    title: "Spectre",
    artist: "Alan Walker",
    url: "https://i1.sndcdn.com/artworks-000102464816-26g2sw-t500x500.jpg",
    color: "#526975",
  },
  {
    id: "J2X5mJ3HDYE",
    title: "DEAF KEV",
    artist: "Invincible",
    url: "https://i1.sndcdn.com/artworks-000196691418-31o3an-t500x500.jpg",
    color: "#0e313f",
  },
  {
    id: "3nQNiWdeH2Q",
    title: "Janji",
    artist: "Heroes Tonight",
    url: "https://i1.sndcdn.com/artworks-000119783441-ycwh33-t500x500.jpg",
    color: "#2d2541",
  },
  {
    id: "Hn4sfC2PbhI",
    title: "Sub Urban",
    artist: "Cradles",
    url:
      "https://i.pinimg.com/originals/b2/5b/5f/b25b5f585ab8e5850f0ce0aa21efd70a.jpg",
    color: "#526975",
  },
];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

expand.addEventListener("click", expandsection);
collapse.addEventListener("click", collapsesection);
timeBar2.addEventListener("input", updateTimebar);
song1.addEventListener("loadeddata", loadeddata);
window.onresize = displayUpdate;
next1.addEventListener("click", nextSong);
next2.addEventListener("click", nextSong);
prev2.addEventListener("click", prevSong);

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
  play2.addEventListener("click", togglepause);
}
function prevSong() {
  if (songIndex - 1 < 0) {
    songIndex = db.length - 1;
  } else {
    songIndex--;
  }
  player.loadVideoById(db[songIndex].id);
  updateInfo();
}
function nextSong() {
  if (songIndex + 1 == db.length) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  player.loadVideoById(db[songIndex].id);
  updateInfo();
}
function displayUpdate() {
  let maxCharacters = Math.floor((screen.width - 165) / 7 - 4);
  let maxCharacters2 = Math.floor((screen.width - 165) / 7 - 4);

  artistValue = db[songIndex].artist.replace(/&amp;/g, "&");
  titleValue = db[songIndex].title.replace(/&amp;/g, "&");

  artistValue.length > maxCharacters
    ? (artist.innerHTML = artistValue.slice(0, maxCharacters) + "...")
    : (artist.innerHTML = artistValue.slice(0, maxCharacters));

  titleValue.length > maxCharacters2
    ? (title.innerHTML = titleValue.slice(0, maxCharacters) + "...")
    : (title.innerHTML = titleValue.slice(0, maxCharacters));

  title2.innerHTML = db[songIndex].title.replace(/&amp;/g, "&");
  artist2.innerHTML = db[songIndex].artist.replace(/&amp;/g, "&");
  innerpicture.style.backgroundImage = " url(" + db[songIndex].url + ")";
  innerpicture2.style.backgroundImage = " url(" + db[songIndex].url + ")";

  controlBarExpanded.style.backgroundColor = db[songIndex].color;
}

function updateInfo() {
  timeBar2.value = (videotime / duration) * 1000;
  displayUpdate();
}
function onPlayerReady(event) {
  player.addEventListener("onStateChange", function (state) {
    if (state.data === 0) {
      console.log("end");
      nextSong();
    }
  });
  duration = player.getDuration();
  player.seekTo(1);

  updateInfo();

  function updateTime() {
    if (player.getPlayerState() === 1) {
      loadeddata();
    }

    duration = player.getDuration();
    var oldTime = videotime;
    if (player && player.getCurrentTime) {
      videotime = player.getCurrentTime();
    }
    if (videotime !== oldTime) {
    }
  }
  timeupdater = setInterval(updateTime, 1);
}

function onYouTubeIframeAPIReady() {}

function start() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: db[songIndex].id,
    events: {
      onReady: onPlayerReady,
    },
  });
}

test.addEventListener("click", start);
