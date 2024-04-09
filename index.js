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
let startSongButton = document.querySelector(".playc");
let playlistCover = document.querySelector(".start-song-inner");
let main = document.querySelector(".main");
let index;

let db = [
  {
    songs: [
      {
        id: "bM7SZ5SBzyY",
        title: "Fade",
        artist: "Alan Walker",
        url: "https://i1.sndcdn.com/artworks-000152209996-zt335k-t500x500.jpg",
        color: "#101010",
        dark: true,
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
        title: "Invincible ",
        artist: "DEAF KEV",
        url: "https://i1.sndcdn.com/artworks-000196691418-31o3an-t500x500.jpg",
        color: "#0e313f",
      },
      {
        id: "3nQNiWdeH2Q",
        title: "Heroes Tonight",
        artist: "Janji ",
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
      {
        id: "jK2aIUmmdP4",
        title: "My heart",
        artist: "Different Heaven",
        url:
          "https://gp1.wac.edgecastcdn.net/802892/http_public_production/photos/images/28554468/original/resize:600x600/crop:x0y146w770h577/aspect:1.0/hash:1491667616/77390709ba2e4e6dce717f6308f01ddf.jpg?1491667616",
        color: "#6f5f72",
      },
      {
        id: "S19UcWdOA-I",
        title: "Fearless",
        artist: "Lost Sky ",
        url: "https://i1.sndcdn.com/artworks-000499922982-6z95zq-t500x500.jpg",
        color: "#764754",
      },
      {
        id: "p7ZsBPK656s",
        title: "Disfigure",
        artist: "Blank",
        url: "https://i.scdn.co/image/ab67616d0000b273e69690edce628fc2542b2306",
        color: "#909f84",
      },
      {
        id: "TW9d8vYrVFQ",
        title: "Elektronomia",
        artist: "Sky High",
        url: "https://i1.sndcdn.com/artworks-000200919021-zc6zfc-t500x500.jpg",
        color: "#2a4c48",
      },
    ],
  },
];
let playlistIndex = db.length - 1;
let playlists = document.querySelectorAll(".playlist1-list");
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
  } else {
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
  let hey = document.querySelector("." + "i" + playlistIndex + "s" + songIndex);
  hey.classList =
    "fas fa-play play-playlist " + "i" + playlistIndex + "s" + songIndex;
  if (songIndex - 1 < 0) {
    songIndex = db[playlistIndex].songs.length - 1;
  } else {
    songIndex--;
  }
  player.loadVideoById(db[playlistIndex].songs[songIndex].id);
  updateInfo();
}
function nextSong() {
  let hey = document.querySelector("." + "i" + playlistIndex + "s" + songIndex);
  hey.classList =
    "fas fa-play play-playlist " + "i" + playlistIndex + "s" + songIndex;
  if (songIndex + 1 == db[playlistIndex].songs.length) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  player.loadVideoById(db[playlistIndex].songs[songIndex].id);
  updateInfo();
}
function displayUpdate() {
  let maxCharacters = Math.floor((screen.width - 165) / 7 - 4);
  let maxCharacters2 = Math.floor((screen.width - 165) / 7 - 4);

  artistValue = db[playlistIndex].songs[songIndex].artist.replace(
    /&amp;/g,
    "&"
  );
  titleValue = db[playlistIndex].songs[songIndex].title.replace(/&amp;/g, "&");

  artistValue.length > maxCharacters
    ? (artist.innerHTML = artistValue.slice(0, maxCharacters) + "...")
    : (artist.innerHTML = artistValue.slice(0, maxCharacters));

  titleValue.length > maxCharacters2
    ? (title.innerHTML = titleValue.slice(0, maxCharacters) + "...")
    : (title.innerHTML = titleValue.slice(0, maxCharacters));

  title2.innerHTML = db[playlistIndex].songs[songIndex].title.replace(
    /&amp;/g,
    "&"
  );
  artist2.innerHTML = db[playlistIndex].songs[songIndex].artist.replace(
    /&amp;/g,
    "&"
  );
  innerpicture.style.backgroundImage =
    " url(" + db[playlistIndex].songs[songIndex].url + ")";
  innerpicture2.style.backgroundImage =
    " url(" + db[playlistIndex].songs[songIndex].url + ")";

  controlBarExpanded.style.backgroundColor =
    db[playlistIndex].songs[songIndex].color;
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
    if (state.data === 1) {
      console.log("play");
      play.classList = "fas fa-pause play";
      play2.classList = "fas fa-pause play2";
      let hey = document.querySelector(
        "." + "i" + playlistIndex + "s" + songIndex
      );
      hey.classList =
        "fas fa-pause play-playlist " + "i" + playlistIndex + "s" + songIndex;
    }
    if (state.data === 2) {
      console.log("pause");
      play.classList = "fas fa-play play";
      play2.classList = "fas fa-play play2";

      let hey = document.querySelector(
        "." + "i" + playlistIndex + "s" + songIndex
      );
      hey.classList =
        "fas fa-play play-playlist " + "i" + playlistIndex + "s" + songIndex;
    }
  });
  duration = player.getDuration();
  player.playVideo();
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
  console.log(db[playlistIndex].songs[0].url);
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: db[playlistIndex].songs[0].id,
    events: {
      onReady: onPlayerReady,
    },
  });
}

function preload() {
  let playlistAmount = db.length;

  for (i = 0; i < playlistAmount; i++) {
    let songAmount = db[i].songs.length;
    let main = document.querySelector(".main");
    index = i;
    let collum = document.createElement("div");
    let innercollum = document.createElement("div");
    let startSong = document.createElement("div");
    let startSongInner = document.createElement("div");
    let playPlaylist = document.createElement("div");
    let playlist = document.createElement("div");
    let playlistList = document.createElement("div");

    collum.classList = "collum1";
    innercollum.classList = "inner-collum1";
    startSong.classList = "start-song";
    startSongInner.classList = "start-song-inner";
    playPlaylist.classList = "fas fa-play playc";
    playlist.classList = "playlist1";
    playlistList.classList = "playlist-list";
    let playlistlist1 = document.createElement("div");

    if (db[playlistIndex].songs[0].dark === true) {
      playPlaylist.classList.add("dark");
    }

    playlistlist1.classList = "playlist1-list";

    startSongInner.style.backgroundImage =
      "url(" + db[index].songs[0].url + ")";

    playlistList.appendChild(playlistlist1);
    playlist.appendChild(playlistList);
    startSongInner.appendChild(playPlaylist);
    startSong.appendChild(startSongInner);
    innercollum.appendChild(startSong);
    innercollum.appendChild(playlist);
    collum.appendChild(innercollum);
    main.appendChild(collum);
    main.appendChild(collum);

    for (b = 0; b < songAmount; b++) {
      let playlistlist1Top = document.createElement("div");
      let listInfo = document.createElement("div");
      let playPlaylist1 = document.createElement("div");

      playlistlist1Top.classList = "playlist1-cont-top";
      listInfo.classList = "list-info";
      playPlaylist1.classList =
        "fas fa-play play-playlist " + "i" + index + "s" + b;

      playlistlist1Top.appendChild(listInfo);
      playlistlist1Top.appendChild(playPlaylist1);

      listInfo.innerHTML =
        db[index].songs[b].title + "-" + db[index].songs[b].artist;

      function clickHandler(event) {
        if (player === undefined) {
          songIndex = event.target.dataset.song;
          playlistIndex = event.target.dataset.playlist;
          player = new YT.Player("player", {
            height: "0",
            width: "0",
            videoId: db[playlistIndex].songs[songIndex].id,
            events: {
              onReady: onPlayerReady,
            },
          });
        } else {
          if (
            songIndex == event.target.dataset.song &&
            playlistIndex == event.target.dataset.playlist
          ) {
            togglepause();
          } else {
            let hey = document.querySelector(
              "." + "i" + playlistIndex + "s" + songIndex
            );
            hey.classList =
              "fas fa-play play-playlist " +
              "i" +
              playlistIndex +
              "s" +
              songIndex;

            songIndex = event.target.dataset.song;
            playlistIndex = event.target.dataset.playlist;
            player.loadVideoById(db[playlistIndex].songs[songIndex].id);
            updateInfo();
          }
        }
      }

      playPlaylist1.addEventListener("click", clickHandler);

      playPlaylist1.dataset.playlist = index;
      playPlaylist1.dataset.song = b;

      playlistlist1.appendChild(playlistlist1Top);
    }
  }
}
preload();
