let gamePlay = function () {
  let movieId = [];
  let movies = [];
  let posters = [];
  let movieTrailer;
  let rating;
  let ratingSource;

  const mdbGetMovieList = {
    async: false,
    crossDomain: true,
    url: "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=1990&endYear=2020&list=top_rated_english_250",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  $.ajax(mdbGetMovieList).done(function (response) {
    console.log("movie list");
    console.log(response);
    for (let i = 0; i < 4; i++) {
      movieId.push(response.results[i].id);
      movies.push(response.results[i].originalTitleText.text);
    }
    // get movie poster
    for (let i = 0; i < 4; i++) {
      posters.push(response.results[i].primaryImage.url);
    }
  });

  const omdbGetMovieRating = {
    async: false,
    crossDomain: true,
    url: `http://www.omdbapi.com/?i=${movieId[0]}&apikey=1a17fd2d`,
    method: "GET",
  };

  $.ajax(omdbGetMovieRating).done(function (response) {
    console.log(`movie rating`);
    console.log(response);
    if (response.Ratings[1].Value != undefined) {
      rating = response.Ratings[1].Value;
      ratingSource = response.Ratings[1].Source;
    }
  });

  const mdbGetMovieTrailers = {
    async: false,
    crossDomain: true,
    url: `https://moviesdatabase.p.rapidapi.com/titles/${movieId[0]}?info=custom_info`,
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  $.ajax(mdbGetMovieTrailers).done(function (response) {
    console.log("movie trailers");
    console.log(response);
    movieTrailer = response.results.trailer;
    console.log();
  });

  const gameQuestions = {
    question: `Which movie had a rating of ${rating}`,
    source: ratingSource,
    correctMovie: movies[0],
    correctMovieTrailer: movieTrailer,
    movieTitles: movies,
    moviePosters: posters,
  };

  console.log(gameQuestions);
};

$("#startButton").on("click", gamePlay);
