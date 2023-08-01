let movieId = [];
let movies = [];
let posters = [];
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
  if (response.Ratings[0].Value != undefined) {
    rating = response.Ratings[1].Value;
    ratingSource = response.Ratings[1].Source;
  }
});

const mdbGetMovieQuotes = {
  async: false,
  crossDomain: true,
  url: `https://moviesdatabase.p.rapidapi.com/titles/${movieId[0]}?info=quotes`,
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

$.ajax(mdbGetMovieQuotes).done(function (response) {
  console.log("movie quotes");
  console.log(response);
  let quote = response.results.quotes.edges[0].node.lines;
  for (let i = 0; i < quote.length; i++) {
    if (quote[i].text != null) {
      shownQuote = quote[i].text;
    }
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
  let movieTrailer = response.results.trailer;
  console.log(movieTrailer);
});

const gameQuestions = {
  question: `Which movie had a rating of ${rating}`,
  source: ratingSource,
  correctMovie: movies[0],
  movieTitles: movies,
  moviePosters: posters,
};

console.log(gameQuestions);
