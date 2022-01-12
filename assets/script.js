// global variables
const titleDiv = document.getElementById("title");
const startBtn = document.getElementById("start");
const quizDiv = document.getElementById("quiz");
const questionDiv = document.getElementById("question");
const answersDiv = document.getElementById("answers");
const resultDiv = document.getElementById("result");
const timerElement = document.getElementById("timer");
let previousResult = "";
let finalTimerCount;
const questions = [
  {
    title: "what is david blaine's first name?",
    answers: ["david", "ben", "chris", "pork"],
    correct: "david",
  },
  {
    title: "what is brett gould's first name?",
    answers: ["brett", "ben", "chris", "pork"],
    correct: "brett",
  },
];
let qIndex = 0;
let timerCount = 20;
//let isWin = false;
//functions
// function startGame() {
//   //clear out previous question answers
//   answersDiv.textContent = "";
//   //show first question with answers
//   questionDiv.innerHTML = questions[qIndex].title;
//   //loop through answers
// questions[qIndex].answers.forEach((answer) => {
//   //create element button, add attributes (value and text and click event), and append button to the answersDiv
//   const answerBtn = document.createElement("button");
//   answerBtn.textContent = answer;
//   answerBtn.setAttribute("value", answer);
//   answerBtn.onclick = answerClick;
//   answersDiv.appendChild(answerBtn);
// });
// }

function startGame() {
  titleDiv.innerHTML = "";
  nextQuestion();
  startTimer();
}

function nextQuestion() {
  answersDiv.textContent = "";
  questionDiv.innerHTML = questions[qIndex].title;
  questions[qIndex].answers.forEach((answer) => {
    //create element button, add attributes (value and text and click event), and append button to the answersDiv
    const answerBtn = document.createElement("button");
    answerBtn.textContent = answer;
    answerBtn.setAttribute("value", answer);
    answerBtn.onclick = answerClick;
    answersDiv.appendChild(answerBtn);
    resultDiv.textContent = previousResult;
  });
}

//answer click function
// function answerClick() {
//   //determine the answer the user chose
//   let clickedAnswer = this.value;
//   //check to see if the answer is correct
//   //let user know they chose correctly
//   if (clickedAnswer === questions[qIndex].correct) {
//     alert("CORRECT!");
//     //move user to next question or end game
//     qIndex++;
//     if (questions.length > qIndex) {
//       // startGame();
//       nextQuestion();
//     } else {
//       endGame();
//     }
//   } else {
//     //let them know they got it wrong and subtract time from timer
//     alert("WRONG!");
//     timerCount -= 5;
//   }
// }

function answerClick() {
  //determine the answer the user chose
  let clickedAnswer = this.value;
  if (clickedAnswer === questions[qIndex].correct) {
    previousResult = "CORRECT!";
  } else {
    previousResult = "INCORRECT!";
    timerCount -= 5;
  }
  qIndex++;
  if (questions.length > qIndex) {
    nextQuestion();
  } else {
    finalTimerCount = timerCount;
    clearInterval(startTimer);
    endGame();
  }
}

//end quiz

// function endGame() {
//   isWin = true;
//   alert(`GAME OVER! Your score is ${timerCount}`);
// }

function endGame() {
  //called when timer is over or all questions answered
  //STOP THE TIMER AND SAVE THE VALUE
  //allow to enter initials to be saved into local storage
  //then redirects to high score html
  quizDiv.innerHTML = "";

  let allDoneMessage = document.createElement("h1");
  allDoneMessage.className = "all-done-h1";
  allDoneMessage.textContent = "All Done!";
  titleDiv.appendChild(allDoneMessage);

  let allDoneScore = document.createElement("h2");
  allDoneScore.className = "all-done-h2";
  allDoneScore.textContent = `Your final score is: ${finalTimerCount}`;
  quizDiv.appendChild(allDoneScore);

  let initialsTitle = document.createElement("label");
  initialsTitle.className = "all-done-h3";
  initialsTitle.textContent = "Enter initials here: ";
  quizDiv.appendChild(initialsTitle);

  let textBox = document.createElement("input");
  textBox.className = "textbox";
  textBox.setAttribute("type", "text");
  textBox.textContent = "";
  quizDiv.appendChild(textBox);

  let submitBtn = document.createElement("button");
  submitBtn.className = "submit-button";
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";
  quizDiv.appendChild(submitBtn);

  submitBtn.addEventListener("click", function () {
    let initials = textBox.value;
    if (initials === null) {
      console.log("nothing entered");
    } else {
      let;
    }
  });

  //Create and append html to hold final timer score
}

//timer

function startTimer() {
  // startGame();
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    //if (timerCount >= 0) {
    //test if win condition is met
    if (questions.length <= qIndex && timerCount > 0) {
      //clears interval and stops timer\
      clearInterval(timer);
      timerElement.textContent = "";
      //endGame();
    }
    // }
    if (timerCount <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}
//TODO: save high score; score is just time left on the timer

//initialization - start
// startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", startGame);
