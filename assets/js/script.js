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
buttonViewHighscores.disabled = false;

//a separate html file (questions.js) contains an array of 5 question objects. 
//Each question object has 1 question, 4 answers, and 1 correct answer

function startQuiz() {
    console.log("called startQuiz");

    //disable buttonViewHighscores while actively playing game
    buttonViewHighscores.disabled = true;
    console.log("buttonViewHighscores.disabled = " + buttonViewHighscores.disabled);

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
        //display msg of "Correct!"   
        document.getElementById('result').innerHTML = `<h3>Correct!</h3><div id="correct-msg"></div>`;
        }
    else {
        //penalize player score by subtracting 10 seconds, due to incorrect answer
        secondsLeft = secondsLeft - 10;

        //display msg of "Incorrect!"   
        console.log("send message Incorrect!");
        document.getElementById('result').innerHTML = `<h3>Incorrect!</h3><div id="incorrect-msg"></div>`;
        }
    qIndex++;
    askQuestions()
}

function gameOver() {
    console.log("called gameOver");
    gameIsOver = true;

    //enable buttonViewHighscores
    buttonViewHighscores.disabled = false;
    console.log("buttonViewHighscores.disabled = " + buttonViewHighscores.disabled);

    //All done and display final score
    main.innerHTML = `<h1>All done!</h1><div id="all-done"></div>`;
    document.getElementById('all-done').innerHTML += `<h2>Your final score is ${secondsLeft}</h2><div id="final-score"></div>`;
    document.getElementById('result').innerHTML = `<h3></h3>`;

    //create box to input player's initials
    document.getElementById('all-done').innerHTML += `<label for="initials">Enter initials: </label><input type="text" id="initials" name="initials"></input>`;
    
    //create submit button to save player's score
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

    //get high scores from local storage
    getHighScores();
 
    if (storagePlayerScores === null) {
            storagePlayerScores = playerScore;
        } 
        else {
            storagePlayerScores.push(playerScore);
        };
    setHighScores()
    viewHighscores();
}

function viewHighscores() {
    console.log("called viewHighscores");

    //get high scores from local storage
    getHighScores();
    
    //display high scores page title
    main.innerHTML = `<h1>Highscores</h1><div id="high-scores"></div>`;

    //create html high scores container
    document.getElementById('high-scores').innerHTML += `<div id="displayed-scores-container"></div>`;

    //create html individual high scores and display
    for (i=0; i < storagePlayerScores.length; i++) {
        console.log("storagePlayerScores: " +  storagePlayerScores[i].currentInitials + " - " + storagePlayerScores[i].currentScore);
        var tempString = storagePlayerScores[i].currentInitials + " - " + storagePlayerScores[i].currentScore;
        document.getElementById('displayed-scores-container').innerHTML += `<h2>${tempString}</h2><div id="displayed-scores"></div>`;
    }
    //creates Go Back button and listen for click 
    document.getElementById('high-scores').innerHTML += `<button onclick="goBack()">Go Back</button>`;

    //creates 'Clear Highscores' and listen for click 
    document.getElementById('high-scores').innerHTML += `<button onclick="clearHighscores()">Clear Highscores</button>`;
}

function clearHighscores() {
    console.log("called clearHighscores");
    //set var to empty array
    storagePlayerScores = [];
    
    //set in local storage to empty array
    setHighScores();

    //clear scores on screen
    var scoresToClear = document.getElementById('displayed-scores-container');
    if (scoresToClear !== null) {
        scoresToClear.remove();
        }
}

function goBack() {
    console.log("called goBack");
    //enable buttonViewHighscores
    buttonViewHighscores.disabled = false;
    console.log("buttonViewHighscores.disabled = " + buttonViewHighscores.disabled);

    //re-display all of initial screen!
    location.reload();
}

function getHighScores() {
    storagePlayerScores = JSON.parse(window.localStorage.getItem("playerScores"));
    if (storagePlayerScores === null) {
        storagePlayerScores = []
    } 
    else {
        //sort by score, in descending order
        storagePlayerScores.sort(function(a, b) {
        return parseFloat(b.currentScore) - parseFloat(a.currentScore);
        });
    }
}

function setHighScores() {
    window.localStorage.setItem("playerScores", JSON.stringify(storagePlayerScores));
}

// listen for start button 
buttonStart.addEventListener("click", startQuiz);

// listen for View Highscores button 
buttonViewHighscores.addEventListener("click", viewHighscores);

function init() {
    console.log("called init");
    //enable buttonViewHighscores
    buttonViewHighscores.disabled = false;
    console.log("buttonViewHighscores.disabled = " + buttonViewHighscores.disabled);
}
  
init();

