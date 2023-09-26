
const youtubeAPIURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=';
const API_KEY = 'AIzaSyBuTLhiQV8e8hplI1xX2Jv_HYhOS5kkRf8'; 

let searchInput = $("#search-input");
let searchForm = $("#search-form");
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
  if (event) {
    event.preventDefault();
  }

  let search = searchInput.val().trim();
  let queryURL = `${youtubeAPIURL}${search}&key=${API_KEY}`;

  fetch(queryURL, { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length > 0) {
        const video = data.items[0];
        loadAndPlayVideo(video.id.videoId);
      } else {
        console.log("No videos found.");
      }
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

// Listen for the submit event on the search form.
searchForm.on("submit", submitSearchForm);