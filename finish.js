// ==========================================================
// DATA QUESTZ
// FINISH GAME SCRIPT
// ==========================================================


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const finalScore = document.getElementById("final-score");
const correctAnswers = document.getElementById("correct-answers");
const wrongAnswers = document.getElementById("wrong-answers");
const missionsCompleted =
    document.getElementById("missions-completed");

const performanceStars =
    document.getElementById("performance-stars");

const finishPlayAgainBtn =
    document.getElementById("finish-play-again-btn");

const finishMainMenuBtn =
    document.getElementById("finish-main-menu-btn");

const accuracy = document.getElementById("accuracy");
const feedback = document.getElementById("finish-feedback");


// ==========================================================
// SAVED GAME RESULTS
// ==========================================================

const savedScore =
    Number(localStorage.getItem("dataQuestzScore")) || 0;

const savedCorrect =
    Number(localStorage.getItem("dataQuestzCorrect")) || 0;

const savedWrong =
    Number(localStorage.getItem("dataQuestzWrong")) || 0;

const savedCompleted =
    Number(localStorage.getItem("dataQuestzCompleted")) || 0;

const savedTotal =
    Number(localStorage.getItem("dataQuestzTotal")) || 0;


// ==========================================================
// DISPLAY RESULTS
// ==========================================================

finalScore.textContent = savedScore;
correctAnswers.textContent = savedCorrect;
wrongAnswers.textContent = savedWrong;

missionsCompleted.textContent =
    `${savedCompleted} / ${savedTotal || savedCompleted}`;


// ==========================================================
// CALCULATE ACCURACY
// ==========================================================

let percentage = 0;

const totalAnswers =
    savedCorrect + savedWrong;

if (totalAnswers > 0) {
    percentage =
        (savedCorrect / totalAnswers) * 100;
}

accuracy.textContent =
    `${Math.round(percentage)}%`;


// ==========================================================
// DISPLAY FEEDBACK
// ==========================================================

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


// ==========================================================
// PERFORMANCE STARS
// ==========================================================

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


// ==========================================================
// PLAY AGAIN SOUND
// ==========================================================

let finishAudioContext = null;

function playFinishStartSound() {

    finishAudioContext =
        finishAudioContext ||
        new (
            window.AudioContext ||
            window.webkitAudioContext
        )();

    if (finishAudioContext.state === "suspended") {
        finishAudioContext.resume();
    }

    function playNote(frequency, delay) {

        setTimeout(() => {

            const oscillator =
                finishAudioContext.createOscillator();

            const gain =
                finishAudioContext.createGain();

            oscillator.type = "sine";

            oscillator.frequency.value =
                frequency;

            gain.gain.setValueAtTime(
                0.28,
                finishAudioContext.currentTime
            );

            gain.gain.exponentialRampToValueAtTime(
                0.001,
                finishAudioContext.currentTime + 0.2
            );

            oscillator.connect(gain);

            gain.connect(
                finishAudioContext.destination
            );

            oscillator.start();

            oscillator.stop(
                finishAudioContext.currentTime + 0.2
            );

        }, delay);
    }

    playNote(392, 0);
    playNote(523.25, 120);
}


// ==========================================================
// PLAY AGAIN
// ==========================================================

finishPlayAgainBtn.addEventListener(
    "click",
    () => {

        // Play sound directly from the button click
        playFinishStartSound();

        // Clear previous game results
        localStorage.removeItem("dataQuestzScore");
        localStorage.removeItem("dataQuestzCorrect");
        localStorage.removeItem("dataQuestzWrong");
        localStorage.removeItem("dataQuestzCompleted");
        localStorage.removeItem("dataQuestzTotal");

        // Wait briefly so the sound can play
        setTimeout(() => {

            window.location.href =
                "index.html?playAgain=true";

        }, 350);
    }
);


// ==========================================================
// MAIN MENU
// ==========================================================

finishMainMenuBtn.addEventListener(
    "click",
    () => {

        window.location.href =
            "index.html";
    }
);