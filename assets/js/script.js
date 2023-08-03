// Variables to store user selections and score
let selectedAnswer = null;
let score = 0;
let correctAnswer;
let questionCounter = 0;

// Function to shuffle arrays so answers are randomized
function shuffle(obj1, obj2) {
  var index = obj1.length;
  var rnd, tmp1, tmp2;

  while (index) {
    rnd = Math.floor(Math.random() * index);
    index -= 1;
    tmp1 = obj1[index];
    tmp2 = obj2[index];
    obj1[index] = obj1[rnd];
    obj2[index] = obj2[rnd];
    obj1[rnd] = tmp1;
    obj2[rnd] = tmp2;
  }
}

// Function to handle the game logic
let gamePlay = function () {
  // Hide the homepage and show the quiz question page
  $("#homepage").addClass("hidden");
  $("#quizQuestion").removeClass("hidden");

  // Arrays to store movie data
  let movieId = [];
  let movies = [];
  let posters = [];
  let movieTrailer;
  let rating;
  let ratingSource;

  // AJAX request to get a list of random movies from the API
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

  // AJAX request to get movie rating from OMDB API
  const omdbGetMovieRating = {
    async: false,
    crossDomain: true,
    url: `https://www.omdbapi.com/?i=${movieId[0]}&apikey=1a17fd2d`,
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

  // AJAX request to get the movie trailer URL from the API
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
  });

  // Object containing the current game question and movie data
  const gameQuestions = {
    question: `Which movie had a rating of ${rating}`,
    source: ratingSource,
    correctMovie: movies[0],
    correctMovieTrailer: movieTrailer,
    movieTitles: movies,
    moviePosters: posters,
  };

  correctAnswer = gameQuestions.correctMovie;

  // Shuffle the movie titles and posters arrays
  shuffle(gameQuestions.movieTitles, gameQuestions.moviePosters);
  console.log(gameQuestions);

  // Update the question and display the correct movie trailer
  $("#questionText").text(gameQuestions.question);
  $("#movieTrailer").attr("src", gameQuestions.correctMovieTrailer);

  // Display the movie options (posters) on the page
  for (let i = 0; i < 4; i++) {
    $(`#movie${i + 1}poster`).attr("src", gameQuestions.moviePosters[i]);
    $(`#movie${i + 1}poster`).attr("alt", gameQuestions.movieTitles[i]);
  }

  // Event listener to handle movie poster selection
  $(".movie-container").on("click", handleMovieSelection);

  questionCounter++;

  // Function to handle movie poster selection
  function handleMovieSelection(event) {
    // Remove 'selected' class from all movie containers
    $(".movie-container").removeClass("selected");

    // Add 'selected' class to the clicked movie container
    $(event.currentTarget).addClass("selected");

    // Set the selected answer to the alt attribute of the clicked movie poster
    selectedAnswer = $(event.currentTarget).find("img").attr("alt");
  }
};

// Function to save high scores to local storage
function saveHighScores(score) {
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push(score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

// Function to retrieve high scores from local storage
function getHighScores() {
  return JSON.parse(localStorage.getItem("highScores")) || [];
}

// Event listeners for buttons
$("#startBtn").on("click", gamePlay);

$("#submitBtn").on("click", function () {
  // Hide the quiz question page and show the review page
  $("#quizQuestion").addClass("hidden");
  $("#reviewPage").removeClass("hidden");

  // Calculate the score and save it to local storage
  console.log(correctAnswer);
  console.log(selectedAnswer);
  if (selectedAnswer == correctAnswer) {
    $("#result").text("correct");
    score = score + 10;
  } else {
    $("#result").text("incorrect");
  }
});

$("#continueBtn").on("click", function () {
  if (questionCounter === 4) {
    // Proceed to the review page instead of the next question
    $("#reviewPage").addClass("hidden");

    // Hide the "Submit" button since it's not needed yet
    $("#submitBtn").addClass("hidden");
    $("#endPage").removeClass("hidden");

    saveHighScores(score);
    // Display the high scores on the "End Page"
    let highScores = getHighScores();
    let highScoresList = $("#highScoresList");
    highScoresList.empty();
    for (let i = 0; i < highScores.length; i++) {
      highScoresList.append(`<li>${highScores[i]}</li>`);
    }
  } else {
    // Hide the quiz question page
    $("#reviewPage").addClass("hidden");

    // Reset the selected answer for the next question
    selectedAnswer = null;
    // If it's not the last question, proceed to the next question
    gamePlay();
  }
});
//Make The Restart Button Function
$("#restartBtn").on("click", function () {
  // Hide the end page and show the homepage to restart the quiz
  $("#endPage").addClass("hidden");
  $("#homepage").removeClass("hidden");
  $("#submitBtn").removeClass("hidden");
  // Reset the game variables and question counter
  selectedAnswer = null;
  score = 0;
  questionCounter = 0;
});
