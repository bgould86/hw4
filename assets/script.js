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
    title: "In what year did the first full-length episode of The Simpsons air?",
    answers: ["1988", "1989", "1990", "1991"],
    correct: "1989",
  },
  {
    title: "What is the name of Homer's favorite bar?",
    answers: ["Sal's", "Joe's", "Moe's", "Lenny's"],
    correct: "Moe's",
  },
  {
    title: "What street do the Simpsons live on?",
    answers: ["Evergreen Ter", "Pine Grove Ave", "Main St", "Harrison St"],
    correct: "Evergreen Ter",
  },
  {
    title: "Who shot Mr. Burns?",
    answers: ["Homer", "Bart", "Barney", "Maggie"],
    correct: "Maggie",
  },
  {
    title: "How old is Bart Simpson?",
    answers: ["10", "11", "12", "13"],
    correct: "10",
  },
];
let qIndex = 0;
let timerCount = 60;

//start game
function startGame() {
  titleDiv.innerHTML = "";
  nextQuestion();
  startTimer();
}

//function to advance to the next question
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
    answerBtn.className = "answer-button";
    resultDiv.textContent = previousResult;
  });
}

//answer click function
function answerClick() {
  //determine the answer the user chose
  let clickedAnswer = this.value;
  if (clickedAnswer === questions[qIndex].correct) {
    previousResult = "NICE!";
  } else {
    previousResult = "WRONG!";
    if (timerCount >= 5) {
      timerCount -= 5;
    }
  }
  qIndex++;
  if (questions.length > qIndex) {
    nextQuestion();
    S;
  } else {
    finalTimerCount = timerCount;
    clearInterval(startTimer);
    endGame();
  }
}

//end game is called when timer runs out or questions are all answered
function endGame() {
  quizDiv.innerHTML = "";

  let allDoneMessage = document.createElement("h1");
  allDoneMessage.className = "all-done-h1";
  allDoneMessage.textContent = "That's it, man!";
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

  //event listener submits initials and final score to local storage
  submitBtn.addEventListener("click", function () {
    let initials = textBox.value;
    if (initials === "") {
      alert("Please enter your initials!");
    } else {
      let finalScore = {
        initials: initials,
        score: finalTimerCount,
      };
      console.log(finalScore);
      let allScores = localStorage.getItem("allScores");
      if (allScores === null) {
        allScores = [];
      } else {
        allScores = JSON.parse(allScores);
      }
      allScores.push(finalScore);
      let highScores = JSON.stringify(allScores);
      localStorage.setItem("allScores", highScores);
      window.location.replace("./highScore.html");
    }
  });
}

//timer
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = `Time: ${timerCount}`;
    //test if win condition is met
    if (questions.length <= qIndex && timerCount > 0) {
      //clears interval and stops timer
      clearInterval(timer);
      timerElement.textContent = "";
    }
    if (timerCount === 0) {
      finalTimerCount = timerCount;
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

//initialization - start
startBtn.addEventListener("click", startGame);
