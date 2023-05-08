var startButton = document.querySelector(".start-button");
var viewHighscoresButton = document.querySelector(".view-highscores-button");

//these 3 buttons haven't been created yet; might create from js?
var goBackButton = document.querySelector(".go-back-button");
var clearHighscoresButton = document.querySelector(".clear-highscores-button");
var submitButton = document.querySelector(".submit-button");

var timerElement = document.querySelector(".timer-count"); 
var instructionsOrQuestion = document.querySelector(".instructions-or-question"); 
var subtitle = document.querySelector(".subtitle"); 
var secondsLeft;
var timerInterval;
var gameIsOver = false; 
var highScore;
var finalScore;

function startQuiz() {
    console.log("started quiz");
    viewHighscoresButton.Disabled = true;
    secondsLeft = 75;
    gameIsOver = false; 
    //start timer
    setTime();
    askQuestions();
}

function askQuestions() {
    //for loop to display questions, check answer, update msg and add 1 to correct/incorrect count
    //write counts to local storage
    gameIsOver = true; 
}

function setTime() {
    // Sets interval in timerInterval variable
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft === 0 || gameIsOver) {
            // Stops execution of action at set interval
            clearInterval(timerInterval);
            gameIsOver = true;
            gameOver();
        } 
    }, 1000);
}

function gameOver() {
    instructionsOrQuestion.textContent = "All done!"; 
    subtitle.textContent = ("Your final score is " + finalScore); 
    //create box to input initials and submit button
    viewHighscores(); 
}

function submitScore() {
    var playerScore = {
        player: initials,
        score: finalScore,
      };
    // Use JSON.parse() to convert text to JavaScript object
    highScore = JSON.parse(localStorage.getItem("highScore"));
    if (highScore === null) {
        localStorage.setItem("highScore", JSON.stringify(playerScore));
    } else if (playerScore.score > highScore.score)
        // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
        localStorage.setItem("highScore", JSON.stringify(playerScore));
}

// listen for start button 
startButton.addEventListener("click", startQuiz);

// listen for View Highscores button 
viewHighscoresButton.addEventListener("click", viewHighscores);

//listen for answers to multiple-choice questions

//listen for Submit button 
//submitButton.addEventListener("click", submitScore);

//listen for Go Back button 
//goBack.addEventListener("click", goBack);

//listen for Clear Highscores button 
//clearHighscoresButton.addEventListener("click", clearHighscores);


function goBack() {
    viewHighscoresButton.Disabled = false;
    //display all of initial screen!
}


function viewHighscores() {
    instructionsOrQuestion.textContent = "Highscores";
    //get highScore string from local storage
    highScore = JSON.parse(localStorage.getItem("highScore"));

    // display high score
    //display 2 buttons: Go Back and Clear Highscores 
}

function init() {
    viewHighscoresButton.Disabled = false;
}
  
init();
