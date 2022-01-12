let highScore = document.getElementById("highScore");
let clear = document.getElementById("clear");
let playAgain = document.getElementById("playAgain");

clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

let allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
  for (let i = 0; i < allScores.length; i++) {
    let createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " " + allScores[i].score;
    highScore.appendChild(createLi);
  }
}

playAgain.addEventListener("click", function () {
  window.location.replace("./index.html");
});
