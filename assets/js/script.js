var main = document.querySelector("main");
var buttonStart = document.querySelector(".start-button");
var buttonViewHighscores = document.querySelector(".view-highscores-button");
var timerElement = document.querySelector(".timer-count"); 
var instructionsOrQuestion = document.querySelector(".instructions-or-question"); 
var subtitle = document.querySelector(".subtitle"); 
var secondsLeft;
var timerInterval;
var gameIsOver = false; 
var highScore;
var qIndex = 0;
var storagePlayerScores;

//these 3 buttons haven't been created yet; is this assignment needed?
var buttonSubmit;               // = document.querySelector(".submit-button");
var buttonGoBack;               //= document.querySelector(".go-back-button");
var buttonClearHighscores;      // = document.querySelector(".clear-highscores-button");

//set up questions array of 5 question objects. Each question obj has 1 question and 4 answers


function startQuiz() {
        console.log("called startQuiz");
    buttonViewHighscores.Disabled = true;
        console.log("buttonViewHighscores.Disabled = " + buttonViewHighscores.Disabled);
    secondsLeft = 30;
    timerElement.textContent = secondsLeft;
    gameIsOver = false;
    //start timer
    setTimer();
    askQuestions();
}

function setTimer() {
    console.log("called setTimer");
    // Sets interval in timerInterval variable
    var timerInterval = setInterval(function() {
        secondsLeft--;

        if (secondsLeft === 0 || gameIsOver) {
            // Stops execution, clear timer, and call gameOver()
            clearInterval(timerInterval);
            gameOver();
        } 
        timerElement.textContent = secondsLeft;
    }, 1000);
}

function askQuestions() {
    console.log("called askQuestions");
    // console.log("buttonViewHighscores.Disabled = " + buttonViewHighscores.Disabled);
    
    //check qIndex
    if (qIndex < questions.length) {
    
        let { question,multipleChoices,answer} = questions[qIndex];
        main.innerHTML = `<h1>${question}</h1><div id="answers"></div>`;

        multipleChoices.forEach(ans => {
            document.getElementById('answers').innerHTML += `<button onclick="checkAnswer('${ans}')">${ans}</button>`
        });
    } 
    else {
        console.log("exiting askQuestions and calling gameOver");
        gameIsOver = true; 
    }
}

function checkAnswer(answers) {
    console.log("called checkAnswer", answers);
    console.log("correct answer = ", questions[qIndex].answer);

    if (answers === questions[qIndex].answer) {
        console.log("send message Correct!");
        //TODO: THIS IS NOT WORKING! update msg  and add a line above message with <hr />   
        document.getElementById('answers').innerHTML += `<h4>Correct!</h4><div id="correct-msg"></div>`;
        }
    else {
        secondsLeft = secondsLeft - 10;
        //TODO: update msg  and add a line above message with <hr /> 
        console.log("send message Incorrect!");
        }
    
    qIndex++;
    askQuestions()
}

function gameOver() {
    console.log("called gameOver");
    gameIsOver = true;

    //TODO: left-justify this screen
    main.innerHTML = `<h1>All done!</h1><div id="all-done"></div>`;
    document.getElementById('all-done').innerHTML += `<h2>Your final score is ${secondsLeft}</h2><div id="final-score"></div>`;

    //create box to input initials  - use submit special type of input?
    document.getElementById('all-done').innerHTML += `<label for="initials">Enter initials: </label><input type="text" id="initials" name="initials"></input>`;
    
    //TODO: create submit button
    document.getElementById('all-done').innerHTML += `<button onclick="submitScore()">Submit</button>`;

}

function submitScore() {
    var initials = document.getElementById("initials").value;
    console.log("called submitScore with " +  initials + " and " + secondsLeft);
    var playerScore = {
        currentInitials: initials,
        currentScore: secondsLeft
        };
    console.log("playerScore: " +  playerScore.currentInitials + " - " + playerScore.currentScore);

    storagePlayerScores = JSON.parse(window.localStorage.getItem("playerScores"));
    if (storagePlayerScores === null) {
        storagePlayerScores = []
    } 

    if (storagePlayerScores === null) {
            storagePlayerScores = playerScore;
        } 
        else {
            storagePlayerScores.push(playerScore);
        };
    window.localStorage.setItem("playerScores", JSON.stringify(storagePlayerScores));
    viewHighscores();
}


function viewHighscores() {
    console.log("called viewHighscores");
    main.innerHTML = `<h1>Highscores</h1><div id="high-scores"></div>`;
    document.getElementById('high-scores').innerHTML += `<div id="displayed-scores-container"></div>`;

    for (i=0; i < storagePlayerScores.length; i++) {
        console.log("storagePlayerScores: " +  storagePlayerScores[i].currentInitials + " - " + storagePlayerScores[i].currentScore);
        var tempString = storagePlayerScores[i].currentInitials + " - " + storagePlayerScores[i].currentScore;
        document.getElementById('displayed-scores-container').innerHTML += `<h2>${tempString}</h2><div id="displayed-scores"></div>`;
    }

    // style high score with background color

    //create Go Back button and listen for click 
    document.getElementById('high-scores').innerHTML += `<button onclick="goBack()">Go Back</button>`;

    //create 'Clear Highscores' and listen for click 
    document.getElementById('high-scores').innerHTML += `<button onclick="clearHighscores()">Clear Highscores</button>`;
}

function clearHighscores() {
    console.log("called clearHighscores");
    storagePlayerScores = [];
    //setItem to empty array
    window.localStorage.setItem("playerScores", JSON.stringify(storagePlayerScores));
    //clear scores on screen
    var scoresToClear = document.getElementById('displayed-scores-container');
    if (scoresToClear !== null) {
        scoresToClear.remove();
        }
}

function goBack() {
    console.log("called goBack");
//TODO:  buttonViewHighscores.Disabled = false;
    //re-display all of initial screen!
    location.reload();
}

// listen for start button 
buttonStart.addEventListener("click", startQuiz);

// listen for View Highscores button 
buttonViewHighscores.addEventListener("click", viewHighscores);


function init() {
    console.log("called init");
     buttonViewHighscores.Disabled = false;
     console.log("buttonViewHighscores.Disabled = " + buttonViewHighscores.Disabled);

}
  
// init();

