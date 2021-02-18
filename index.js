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
let db = [
  {
    id: "bM7SZ5SBzyY",
    title: "Fade",
    artist: "Alan Walker",
  },
  {
    id: "K4DyBUG242c",
    title: "On & On",
    artist: "Cartoon",
  },
  {
    id: "AOeY-nDp7hI",
    title: "Spectre",
    artist: "Alan Walker",
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
  player.destroy();
  songIndex--;
  console.log("hey");

  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: db[songIndex].id,
    events: {
      onReady: onPlayerReady,
    },
  });
}
function nextSong() {
  player.destroy();
  songIndex++;
  console.log("hey");

  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: db[songIndex].id,
    events: {
      onReady: onPlayerReady,
    },
  });
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
  innerpicture.style.backgroundImage =
    " url(http://img.youtube.com/vi/" + db[songIndex].id + "/1.jpg)";
  innerpicture2.style.backgroundImage =
    " url(http://img.youtube.com/vi/" + db[songIndex].id + "/mqdefault.jpg)";
}

function updateInfo() {
  displayUpdate();
}
function onPlayerReady(event) {
  duration = player.getDuration();
  player.seekTo(1);
  updateInfo();

  function updateTime() {
    loadeddata();
    var oldTime = videotime;
    if (player && player.getCurrentTime) {
      videotime = player.getCurrentTime();
      if (videotime >= duration - 1) {
        nextSong();
      }
    }
    if (videotime !== oldTime) {
    }
  }
  timeupdater = setInterval(updateTime, 1);
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: db[songIndex].id,
    events: {
      onReady: onPlayerReady,
    },
  });
}
