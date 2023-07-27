// hard coded movie IDs for now, eventually will be pulled from the MDB API
let movieId = [
  "tt0108002",
  "tt0112453",
  "tt0123755",
  "tt0107034",
  "tt0119822",
  "tt0147800",
  "tt0099850",
  "tt0100828",
  "tt0120791",
  "tt0115678",
];

// This needs to go first
const mdbSettings = {
  async: true,
  crossDomain: true,
  url: "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=1930&genre=Drama&endYear=1980&list=most_pop_movies",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

$.ajax(mdbSettings).done(function (response) {
  console.log(response);
});

// This needs to fire after the above ajax call is done ( will figure out later )
const omdbSettings = {
  async: false,
  crossDomain: true,
  url: `http://www.omdbapi.com/?i=${movieId[1]}&apikey=1a17fd2d`,
  method: "GET",
};

$.ajax(omdbSettings).done(function (response) {
  console.log(`omdb stuff`);
  console.log(response);
  console.log(response.Ratings[1].Value);
});
