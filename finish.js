// =========================================================
// DATA QUESTZ
// FINISH GAME SCRIPT
// =========================================================


// ---------------------------------------------------------
// GET FINISH SCREEN ELEMENTS
// ---------------------------------------------------------

const finalScore =
    document.getElementById("final-score");

const correctAnswers =
    document.getElementById("correct-answers");

const wrongAnswers =
    document.getElementById("wrong-answers");

const missionsCompleted =
    document.getElementById("missions-completed");

const performanceStars =
    document.getElementById("performance-stars");

const finishPlayAgainBtn =
    document.getElementById("finish-play-again-btn");

const finishMainMenuBtn =
    document.getElementById("finish-main-menu-btn");

const accuracy =
    document.getElementById("accuracy");

const feedback =
    document.getElementById("finish-feedback");


// ---------------------------------------------------------
// GET SAVED GAME RESULTS
// ---------------------------------------------------------

const savedScore =
    Number(
        localStorage.getItem("dataQuestzScore")
    ) || 0;

const savedCorrect =
    Number(
        localStorage.getItem("dataQuestzCorrect")
    ) || 0;

const savedWrong =
    Number(
        localStorage.getItem("dataQuestzWrong")
    ) || 0;

const savedCompleted =
    Number(
        localStorage.getItem("dataQuestzCompleted")
    ) || 0;

const savedTotal =
    Number(
        localStorage.getItem("dataQuestzTotal")
    ) || 0;


// ---------------------------------------------------------
// DISPLAY FINAL RESULTS
// ---------------------------------------------------------

finalScore.textContent =
    savedScore;

correctAnswers.textContent =
    savedCorrect;

wrongAnswers.textContent =
    savedWrong;

missionsCompleted.textContent =
    `${savedCompleted} / ${savedTotal || savedCompleted}`;


// ---------------------------------------------------------
// CALCULATE ACCURACY
// ---------------------------------------------------------

let percentage = 0;

const totalAnswers =
    savedCorrect + savedWrong;

if (totalAnswers > 0) {

    percentage =
        (savedCorrect / totalAnswers) * 100;

}

accuracy.textContent =
    `${Math.round(percentage)}%`;


// ---------------------------------------------------------
// DISPLAY FEEDBACK
// ---------------------------------------------------------

if (percentage >= 90) {

    feedback.textContent =
        "🏆 Outstanding! You have mastered DATA QUESTZ!";

}
else if (percentage >= 75) {

    feedback.textContent =
        "🌟 Great job! You have a strong understanding of the concepts.";

}
else if (percentage >= 60) {

    feedback.textContent =
        "👍 Good effort! Keep practising to improve your skills.";

}
else if (percentage >= 40) {

    feedback.textContent =
        "💪 Keep going! Review the concepts and try again.";

}
else {

    feedback.textContent =
        "📚 Don't give up! Practice makes progress.";

}


// ---------------------------------------------------------
// DISPLAY PERFORMANCE STARS
// ---------------------------------------------------------

let stars = 1;

if (percentage >= 90) {

    stars = 5;

}
else if (percentage >= 75) {

    stars = 4;

}
else if (percentage >= 60) {

    stars = 3;

}
else if (percentage >= 40) {

    stars = 2;

}

performanceStars.textContent =
    "⭐".repeat(stars);


// ---------------------------------------------------------
// PLAY AGAIN
// ---------------------------------------------------------

finishPlayAgainBtn.onclick = () => {

    localStorage.removeItem(
        "dataQuestzScore"
    );

    localStorage.removeItem(
        "dataQuestzCorrect"
    );

    localStorage.removeItem(
        "dataQuestzWrong"
    );

    localStorage.removeItem(
        "dataQuestzCompleted"
    );

    localStorage.removeItem(
        "dataQuestzTotal"
    );

    window.location.href =
        "index.html";

};


// ---------------------------------------------------------
// MAIN MENU
// ---------------------------------------------------------

finishMainMenuBtn.onclick = () => {

    window.location.href =
        "index.html";

};