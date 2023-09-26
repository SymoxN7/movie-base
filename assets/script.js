const movieAPIURL = `https://www.omdbapi.com/?apikey=311257cc&`;
const youtubeAPIURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=';
const API_KEY_YT = 'AIzaSyBuTLhiQV8e8hplI1xX2Jv_HYhOS5kkRf8'


let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistory = [];
let searchHistoryContainer = $("#search-history");
let videoPlayer;

function loadAndPlayVideo(videoId) {
  if (videoPlayer) {
    videoPlayer.loadVideoById(videoId);
  } else {
    videoPlayer = new YT.Player('video-container', {
      height: '315',
      width: '560',
      videoId: videoId,
      events: {
        onReady: function (event) {
          event.target.playVideo();
        }
      }
    });
  }
}

function submitSearchForm(event) {
  event.preventDefault();
  let search = searchInput.val().trim();
  let queryURL = `${movieAPIURL}t=${search}&plot=short`;
  let searchYT = searchInput.val().trim();
  let queryUrlYT = `${youtubeAPIURL}${searchYT}trailer&key=${API_KEY_YT}`;

  if (!search) {
    console.log("No Search")
    return
  }

  fetch(queryUrlYT, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const video = data.items[0];
        loadAndPlayVideo(video.id.videoId);
      } else {
        console.log("No videos found.");
      }
    });

  fetch(queryURL, { method: "GET" })
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      searchInput.val("");
      
      let movieInfoSection = $("<div>");
      $("#movie-info").empty().prepend(movieInfoSection)
      movieInfoSection.addClass("movie-info")

      let movInfoHeader = $("<h3>");
      movInfoHeader.text("Movie Info");
      movieInfoSection.append(movInfoHeader);

      let movieTitle = $("<h3>");
      movieTitle.text(data.Title);
      movieInfoSection.append(movieTitle);

      let moviePlot = $("<p>");
      moviePlot.text(data.Plot);
      movieInfoSection.append(moviePlot);
    
      let movieList = $("<ul>");
      movieInfoSection.append(movieList);

      let movieRated = $("<li>");
      let movieGenre = $("<li>");
      let movieLang = $("<li>");
      let movieDir = $("<li>");
      let movieWrit = $("<li>");

      movieRated.text("Rated: " + data.Rated);
      movieGenre.text("Genre: " + data.Genre);
      movieLang.text("Language: " + data.Language);
      movieDir.text("Director: " + data.Director);
      movieWrit.text("Writer: " + data.Writer);

      movieList.append(movieRated);
      movieList.append(movieGenre);
      movieList.append(movieLang);
      movieList.append(movieDir);
      movieList.append(movieWrit);
    });
}

// Load the YouTube iframe API asynchronously
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Initialize the YouTube API and start the first video playback when it's ready
window.onYouTubeIframeAPIReady = function () {
  submitSearchForm();
};

searchForm.on("submit", submitSearchForm);
