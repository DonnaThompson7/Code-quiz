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
    secondsLeft = 75;
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
    } else {
        //write counts to local storage
        console.log("exiting askQuestions and calling gameOver");
        gameIsOver = true; 
        gameOver();
    }
}


function checkAnswer(answers) {
    console.log("called checkAnswer", answers);
    console.log("correct answer = ", questions[qIndex].answer);

    if (answers === questions[qIndex].answer) {
        //update msg  and add a line above message with <hr /> 
        console.log("send message Correct!");
        }
    else {
        secondsLeft = secondsLeft - 10;
        console.log("send message Incorrect!");
        }
    
    qIndex++;
    askQuestions()
}

function gameOver() {
    console.log("called gameOver");
    gameIsOver = true;
    instructionsOrQuestion.textContent = "All done!"; 
    main.innerHTML = `<h1>All done!</h1><div id="all-done"></div>`;
    document.getElementById('all-done').innerHTML = `<h2>Your final score is ${secondsLeft}</h2>`;

    //create box to input initials 
    //document.createElement("form")
    //create submit button
    //buttonSubmit = document.createElement("button")
    //main.appendChild(buttonSubmit);
        //when to use .innerHTML ??
    //listen for Submit button 
    //buttonSubmit.addEventListener("click", submitScore);
}

function submitScore() {
    console.log("called submitScore");
//     var playerScore = {
//         player: initials,
//         score: finalScore,
//       };
//     //Will said not to do this but instead just save all scores; not sorted
//     // Use JSON.parse() to convert text to JavaScript object
//     highScore = JSON.parse(localStorage.getItem("highScore"));
//     if (highScore === null) {
//         localStorage.setItem("highScore", JSON.stringify(playerScore));
//     } else if (playerScore.score > highScore.score)
//         // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
//         localStorage.setItem("highScore", JSON.stringify(playerScore));
    //     viewHighscores(); 
}

function viewHighscores() {
    console.log("called viewHighscores");
    instructionsOrQuestion.textContent = "Highscores";
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

