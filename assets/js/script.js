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
        timerElement.textContent = secondsLeft;

        if (secondsLeft === 0 || gameIsOver) {
            // Stops execution, clear timer, and call gameOver()
            clearInterval(timerInterval);
            gameOver();
        } 
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
        gameOver();
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
    console.log("playerScore: " +  playerScore);

    var storagePlayerScores = JSON.parse(window.localStorage.getItem("playerScores"));
    console.log("storagePlayerScores: " +  storagePlayerScores);

    if (storagePlayerScores === null) {
            storagePlayerScores = playerScore;
        } 
        else {
            storagePlayerScores.push(playerScore);
        };
    window.localStorage.setItem("playerScores", JSON.stringify(storagePlayerScores));
}

function viewHighscores() {
    console.log("called viewHighscores");
    //instructionsOrQuestion.textContent = "Highscores";
    //get highScore string from local storage
    //highScore = JSON.parse(localStorage.getItem("highScore"));

    // display high score
    //create 2 buttons: Go Back and Clear Highscores 
        //use document.createElement("button", ".go-back-button") 
        //listen for Go Back button 
        //goBack.addEventListener("click", goBack);
        //listen for Clear Highscores button 
        //buttonClearHighscores.addEventListener("click", clearHighscores);
}

// function goBack() {
//     buttonViewHighscores.Disabled = false;
//     //re-display all of initial screen!
//     location.reload();
// }

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

