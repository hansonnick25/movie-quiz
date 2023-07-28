let movieId = [];

const omdbGetMovieRating = {
  async: true,
  crossDomain: true,
  url: `http://www.omdbapi.com/?i=${movieId[0]}&apikey=1a17fd2d`,
  method: "GET",
};

$.ajax(omdbGetMovieRating).done(function (response) {
  console.log(`omdb stuff`);
  console.log(response);
  console.log(response.Ratings[0].Value);
});

const mdbGetMovieList = {
  async: false,
  crossDomain: true,
  url: "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=1930&genre=Drama&endYear=1980&list=most_pop_movies",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

$.ajax(mdbGetMovieList).done(function (response) {
  console.log(response);
  for (let i = 0; i < 10; i++) {
    movieId.push(response.results[i].id);
  }
  $("#title").append(`<h2>${response.results[0].titleText.text}</h2>`);
});

const mdbGetMovieQuotes = {
  async: true,
  crossDomain: true,
  url: `https://moviesdatabase.p.rapidapi.com/titles/${movieId[0]}?info=quotes`,
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

$.ajax(mdbGetMovieQuotes).done(function (response) {
  console.log(response);
  let quote = response.results.quotes.edges[0].node.lines;
  for (let i = 0; i < quote.length; i++) {
    shownQuote = quote[i].text;
    $("#quote").append(`<h2>${shownQuote}</h2>`);
  }
  console.log(quote);
});
