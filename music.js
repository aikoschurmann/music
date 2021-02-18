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
];
tag.src = "https://www.youtube.com/iframe_api";
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

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
