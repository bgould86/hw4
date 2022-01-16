let highScore = document.getElementById("highScore");
let clear = document.getElementById("clear");
let playAgain = document.getElementById("playAgain");

//pulling and rendering highscores from local storage
let allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

//adding scores to the table
for (let i = 0; i < allScores.length; i++) {
  let createTr = document.createElement("tr");
  createTr.textContent = allScores[i].initials + " " + allScores[i].score;
  createTr.className = "tr";
  highScore.appendChild(createTr);
}

//event listener for clear highscores button
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

//event listener for play again button
playAgain.addEventListener("click", function () {
  window.location.replace("./index.html");
});
