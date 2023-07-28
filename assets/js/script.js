let movieId = []

const mdbSettings = {
  async: false,
  crossDomain: true,
  url: "https://moviesdatabase.p.rapidapi.com/titles/random?startYear=1930&genre=Drama&endYear=1980&list=most_pop_movies",
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "e6f6f362ebmsh767ffbd1821e970p1c3b80jsn8ca07780167f",
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  },
};

const omdbSettings = {
  async: true,
  crossDomain: true,
  url: `http://www.omdbapi.com/?i=${movieId[1]}&apikey=1a17fd2d`,
  method: "GET",
};

$.ajax(mdbSettings).done(function (response) {
  console.log(response);
  for (let i = 0; i < 10; i++){
  movieId.push(response.results[i].id);
  }
});

$.ajax(omdbSettings).done(function (response) {
  console.log(`omdb stuff`);
  console.log(response);
  console.log(response.Ratings[1].Value);
});
  
