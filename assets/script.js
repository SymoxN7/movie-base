const movieAPIURL = `http://www.omdbapi.com/?apikey=311257cc&`;

let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistory = [];
let searchHistoryContainer = $("#search-history");

function submitSearchForm(event) {
  event.preventDefault();
  let search = searchInput.val().trim();
  let queryURL = `${movieAPIURL}t=${search}&plot=short`;

  fetch(queryURL, { method: "GET" })
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      console.log(data);
      searchInput.val("");

      let movieInfoSection = $("<div>");
      $("#hero-area").prepend(movieInfoSection)

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

searchForm.on("submit", submitSearchForm);

