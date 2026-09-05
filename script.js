/* ==================================================
   DATA QUESTZ
   MAIN GAME + QUESTION CREATOR + QUESTION MANAGER
================================================== */


/* ==================================================
   USER ROLE
================================================== */

const userRole = localStorage.getItem("dataQuestzRole");

if (!userRole) {
    window.location.href = "login.html";
}


/* ==================================================
   GAME STATE
================================================== */

let gameActive = false;
let currentLevel = 0;
let score = 0;
let lives = 3;
let time = 30;
let correctAnswers = 0;
let wrongAnswers = 0;
let timer = null;
let remaining = 0;

let currentQuestion = null;
let currentResults = [];

let questionToDelete = null;
let questionToEdit = null;


/* ==================================================
   HTML ELEMENTS
================================================== */

/* ---------- GAME ---------- */

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameInterface = document.getElementById("game-interface");
const howToPlay = document.getElementById("how-to-play");
const logoutBtn = document.getElementById("logout-btn");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");
const levelText = document.getElementById("level");
const timerText = document.getElementById("timer");

const progress = document.getElementById("progress-bar");

const queryText = document.getElementById("query");
const cards = document.getElementById("cards");
const message = document.getElementById("message");

const database = document.getElementById("database");
const trash = document.getElementById("trash");

const nextBtn = document.getElementById("next-btn");

const hintBtn = document.getElementById("hint-btn");
const hintText = document.getElementById("hint-text");
const hintPanel = document.getElementById("hint-panel");
const hintInstruction = document.getElementById("hint-instruction");

const feedbackPanel = document.getElementById("feedback-panel");
const lesson = document.getElementById("lesson");
const answerInstruction = document.getElementById("answer-instruction");

const questionImageDisplay =
    document.getElementById("question-image-display");


/* ---------- SQL RESULT ---------- */

const resultPanel = document.getElementById("result-panel");

const resultTable =
    document.querySelector("#result-table tbody");


/* ---------- QUESTION CREATOR ---------- */

const addQuestionBtn =
    document.getElementById("add-question-btn");

const questionModal =
    document.getElementById("question-modal");

const closeQuestionBtn =
    document.getElementById("close-question-btn");

const cancelQuestionBtn =
    document.getElementById("cancel-question-btn");

const saveQuestionBtn =
    document.getElementById("save-question-btn");

const answerMode =
    document.getElementById("answer-mode");

const answerList =
    document.getElementById("answer-list");

const addAnswerBtn =
    document.getElementById("add-answer-btn");

const answerBuilder =
    document.getElementById("answer-builder");

const trueFalseBuilder =
    document.getElementById("true-false-builder");

const questionImage =
    document.getElementById("question-image");

const imagePreview =
    document.getElementById("image-preview");


/* ---------- QUESTION MANAGER ---------- */

const manageQuestionBtn =
    document.getElementById("manage-question-btn");

const questionManagerModal =
    document.getElementById("question-manager-modal");

const closeManagerBtn =
    document.getElementById("close-manager-btn");

const closeManagerBottomBtn =
    document.getElementById("close-manager-bottom-btn");

const questionManagerList =
    document.getElementById("question-manager-list");


/* ---------- DELETE CONFIRMATION ---------- */

const deleteConfirmation =
    document.getElementById("delete-confirmation");

const deleteConfirmationText =
    document.getElementById("delete-confirmation-text");

const confirmDeleteBtn =
    document.getElementById("confirm-delete-btn");

const cancelDeleteBtn =
    document.getElementById("cancel-delete-btn");


/* ==================================================
   SOUND EFFECTS
================================================== */

let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (
            window.AudioContext ||
            window.webkitAudioContext
        )();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    return audioContext;
}


function playTone(
    frequency,
    duration,
    type = "sine",
    volume = 0.08
) {
    const audio = getAudioContext();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(
        volume,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + duration
    );

    oscillator.connect(gain);
    gain.connect(audio.destination);

    oscillator.start();

    oscillator.stop(
        audio.currentTime + duration
    );
}


function playCorrectSound() {
    playTone(
        523.25,
        0.12,
        "sine",
        0.28
    );

    setTimeout(() => {
        playTone(
            659.25,
            0.18,
            "sine",
            0.28
        );
    }, 100);
}


function playWrongSound() {
    playTone(
        180,
        0.25,
        "sawtooth",
        0.28
    );
}


function playTimeoutSound() {
    playTone(
        330,
        0.15,
        "square",
        0.28
    );

    setTimeout(() => {
        playTone(
            220,
            0.15,
            "square",
            0.28
        );
    }, 180);

    setTimeout(() => {
        playTone(
            150,
            0.35,
            "square",
            0.28
        );
    }, 360);
}


function playStartSound() {
    playTone(
        392,
        0.15,
        "sine",
        0.28
    );

    setTimeout(() => {
        playTone(
            523.25,
            0.2,
            "sine",
            0.28
        );
    }, 120);
}


function playVictorySound() {
    playTone(
        523.25,
        0.15,
        "sine",
        0.28
    );

    setTimeout(() => {
        playTone(
            659.25,
            0.15,
            "sine",
            0.28
        );
    }, 150);

    setTimeout(() => {
        playTone(
            783.99,
            0.25,
            "sine",
            0.28
        );
    }, 300);

    setTimeout(() => {
        playTone(
            1046.50,
            0.45,
            "sine",
            0.28
        );
    }, 550);
}


/* ==================================================
   ROLE PROTECTION
================================================== */

if (userRole === "student") {
    if (addQuestionBtn) {
        addQuestionBtn.style.display = "none";
    }

    if (manageQuestionBtn) {
        manageQuestionBtn.style.display = "none";
    }
}


if (userRole === "lecturer") {
    if (startBtn) {
        startBtn.style.display = "none";
    }

    if (addQuestionBtn) {
        addQuestionBtn.style.display = "inline-block";
    }

    if (manageQuestionBtn) {
        manageQuestionBtn.style.display = "inline-block";
    }
}


/* ==================================================
   LOCAL STORAGE
================================================== */

let customQuestions = JSON.parse(
    localStorage.getItem("dataQuestzQuestions") || "[]"
);

let deletedQuestions = JSON.parse(
    localStorage.getItem("dataQuestzDeletedQuestions") || "[]"
);

let deletedOriginalQuestions = JSON.parse(
    localStorage.getItem("dataQuestzDeletedOriginals") || "[]"
);


/* ==================================================
   STORAGE HELPERS
================================================== */

function saveCustomQuestions() {
    localStorage.setItem(
        "dataQuestzQuestions",
        JSON.stringify(customQuestions)
    );
}


function saveDeletedQuestions() {
    localStorage.setItem(
        "dataQuestzDeletedQuestions",
        JSON.stringify(deletedQuestions)
    );
}


function saveDeletedOriginalQuestions() {
    localStorage.setItem(
        "dataQuestzDeletedOriginals",
        JSON.stringify(deletedOriginalQuestions)
    );
}


/* ==================================================
   HTML SAFETY
================================================== */

function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* ==================================================
   QUESTION HELPERS
================================================== */

function getAllQuestions() {
    const activeOriginalQuestions =
        questions.filter(
            (question, index) =>
                !deletedOriginalQuestions.includes(index)
        );

    const activeCustomQuestions =
        customQuestions.filter(
            question =>
                !deletedQuestions.includes(question.id)
        );

    return [
        ...activeOriginalQuestions,
        ...activeCustomQuestions
    ];
}


function getQuestionTypeName(question) {
    if (question.type === "interactive") {
        if (question.answerMode === "single") {
            return "One Correct Answer";
        }

        if (question.answerMode === "multiple") {
            return "Multiple Correct Answers";
        }

        if (question.answerMode === "true-false") {
            return "True / False";
        }
    }

    if (
        question.type === "sql-filter" ||
        question.dataset
    ) {
        return "SQL Filter";
    }

    return question.type || "Question";
}


function isSQLQuestion(question) {
    return (
        question.type === "sql-filter" ||
        (
            question.sql &&
            question.dataset &&
            question.answer &&
            question.answer.conditions
        )
    );
}


/* ==================================================
   START GAME LEVEL
================================================== */

function startLevel() {
    const allQuestions = getAllQuestions();

    if (allQuestions.length === 0) {
        gameActive = false;

        message.innerHTML = `
            📭 There are no active questions.

            <br><br>

            Please create a question
            before starting the mission.
        `;

        return;
    }

    if (currentLevel >= allQuestions.length) {
        finishGame();
        return;
    }

    currentQuestion = allQuestions[currentLevel];
    gameActive = true;

    clearInterval(timer);

    time = 30;
    timerText.textContent = time;

    timer = setInterval(
        updateTimer,
        1000
    );

    cards.innerHTML = "";
    currentResults = [];

    updateResultTable();

    scoreText.textContent = score;
    livesText.textContent = lives;

    levelText.textContent =
        currentLevel + 1;

    progress.style.width =
        (currentLevel / allQuestions.length) * 100 + "%";

    nextBtn.style.display = "none";
    restartBtn.style.display = "none";

    message.innerHTML =
        "Choose the correct answer.";

    if (feedbackPanel) {
        feedbackPanel.style.display = "none";
    }

    hintText.innerHTML =
        currentQuestion.hint ||
        "Think carefully about the question.";

    hintText.style.display = "none";

    if (hintInstruction) {
        hintInstruction.style.display = "block";
    }

    hintBtn.style.display = "block";
    hintBtn.textContent = "💡 Show Hint";

    hintBtn.onclick = () => {
        hintText.style.display = "block";

        if (hintInstruction) {
            hintInstruction.style.display = "none";
        }

        hintBtn.style.display = "none";
    };

    if (isSQLQuestion(currentQuestion)) {
        startSQLMission(currentQuestion);
    } else {
        startNormalQuestion(currentQuestion);
    }
}


/* ==================================================
   TIMER
================================================== */

function updateTimer() {
    if (!gameActive) {
        return;
    }

    time--;
    timerText.textContent = time;

    if (time <= 0) {
        loseLife();
    }
}


/* ==================================================
   NORMAL QUESTION
================================================== */

function startNormalQuestion(question) {
    resultPanel.style.display = "none";

    queryText.innerHTML = `
        <div class="question-display">
            ${escapeHTML(question.question)}
        </div>
    `;

    lesson.innerHTML = escapeHTML(
        question.explanation ||
        "Think carefully about each answer."
    );

    questionImageDisplay.innerHTML = "";

    if (question.image) {
        questionImageDisplay.innerHTML = `
            <img
                src="${question.image}"
                alt="Question image"
            >
        `;
    }

    if (question.answerMode === "multiple") {
        answerInstruction.textContent =
            "Drag ALL correct answers into 🟢 CORRECT.";
    } else {
        answerInstruction.textContent =
            "Drag each answer into the correct zone.";
    }

    const answers = [...(question.answers || [])].sort(
        () => Math.random() - 0.5
    );

    remaining = answers.length;

    answers.forEach(answer => {
        createAnswerCard(
            answer,
            question
        );
    });
}


/* ==================================================
   CREATE ANSWER CARD
================================================== */

function createAnswerCard(answer, question) {
    const card = document.createElement("div");

    card.className = "card answer-card";
    card.draggable = true;

    card.innerHTML = `
        <h3>
            ${escapeHTML(answer.text)}
        </h3>
    `;

    card.answer = answer;
    card.question = question;

    card.addEventListener(
        "dragstart",
        () => {
            card.classList.add("dragging");
        }
    );

    card.addEventListener(
        "dragend",
        () => {
            card.classList.remove("dragging");
        }
    );

    cards.appendChild(card);
}


/* ==================================================
   CHECK NORMAL ANSWER
================================================== */

function checkNormalAnswer(card, droppedCorrect) {
    const answer = card.answer;
    const question = card.question;

    const isCorrect =
        answer.correct === droppedCorrect;

    if (isCorrect) {
        playCorrectSound();

        correctAnswers++;
        score += 50;

        message.innerHTML = `
            <div class="success-message">
                ✅ Correct! +50 points

                <br><br>

                ${escapeHTML(
                    answer.explanation ||
                    question.explanation ||
                    "Great job!"
                )}
            </div>
        `;
    } else {
        playWrongSound();

        wrongAnswers++;

        score = Math.max(
            0,
            score - 20
        );

        lives--;

        message.innerHTML = `
            <div class="error-message">
                ❌ Incorrect!

                <br><br>

                ${escapeHTML(
                    answer.explanation ||
                    question.explanation ||
                    "Review the question and try again."
                )}
            </div>
        `;
    }

    scoreText.textContent = score;
    livesText.textContent = lives;

    if (feedbackPanel) {
        feedbackPanel.style.display = "block";
    }

    card.remove();
    remaining--;

    if (lives <= 0) {
        gameOver();
        return;
    }

    if (remaining <= 0) {
        finishCurrentQuestion();
    }
}


/* ==================================================
   SQL MISSION
================================================== */

function startSQLMission(question) {
    resultPanel.style.display = "block";

    queryText.innerHTML = `
        <div class="sql-animation">
            ${escapeHTML(question.sql)}
        </div>
    `;

    lesson.innerHTML = escapeHTML(
        question.lesson ||
        "SQL uses conditions to filter records."
    );

    answerInstruction.textContent =
        "Drag each student into the correct zone.";

    const shuffled = [...question.dataset].sort(
        () => Math.random() - 0.5
    );

    remaining = shuffled.length;

    shuffled.forEach(student => {
        createStudentCard(student);
    });
}


/* ==================================================
   CREATE STUDENT CARD
================================================== */

function createStudentCard(student) {
    const card = document.createElement("div");

    card.className = "card";
    card.draggable = true;

    card.innerHTML = `
        <h3>
            ${escapeHTML(student.name)}
        </h3>

        <p>
            Age: ${escapeHTML(student.age)}
        </p>

        <p>
            Passed: ${escapeHTML(student.passed)}
        </p>

        <p>
            GPA: ${escapeHTML(student.gpa)}
        </p>
    `;

    card.student = student;

    card.addEventListener(
        "dragstart",
        () => {
            card.classList.add("dragging");
        }
    );

    card.addEventListener(
        "dragend",
        () => {
            card.classList.remove("dragging");
        }
    );

    cards.appendChild(card);
}


/* ==================================================
   SQL HELPERS
================================================== */

function convertValue(value) {
    if (typeof value !== "string") {
        return value;
    }

    const lower =
        value.toLowerCase().trim();

    if (lower === "true") {
        return true;
    }

    if (lower === "false") {
        return false;
    }

    if (
        value.trim() !== "" &&
        !isNaN(value)
    ) {
        return Number(value);
    }

    return value;
}


function checkCondition(student, condition) {
    const studentValue =
        student[condition.field];

    const expectedValue =
        convertValue(condition.value);

    switch (condition.operator) {
        case ">":
            return studentValue > expectedValue;

        case "<":
            return studentValue < expectedValue;

        case ">=":
            return studentValue >= expectedValue;

        case "<=":
            return studentValue <= expectedValue;

        case "===":
        case "=":
            return studentValue === expectedValue;

        case "!==":
            return studentValue !== expectedValue;

        default:
            return false;
    }
}


function checkMissionAnswer(student, question) {
    const conditions =
        question.answer?.conditions || [];

    if (!conditions.length) {
        return false;
    }

    const results = conditions.map(
        condition =>
            checkCondition(
                student,
                condition
            )
    );

    if (question.answer.logic === "OR") {
        return results.some(
            result => result
        );
    }

    return results.every(
        result => result
    );
}


/* ==================================================
   CHECK SQL ANSWER
================================================== */

function checkSQLAnswer(card, correctZone) {
    const student = card.student;
    const question = currentQuestion;

    const answer =
        checkMissionAnswer(
            student,
            question
        );

    if (answer === correctZone) {
        playCorrectSound();

        correctAnswers++;
        score += 50;

        currentResults.push(student);

        message.innerHTML = `
            <div class="success-message">
                ✅ Correct! +50 points

                <br><br>

                ${escapeHTML(
                    question.explanation ||
                    "The record matches the condition."
                )}
            </div>
        `;

        updateResultTable();
    } else {
        playWrongSound();

        wrongAnswers++;

        score = Math.max(
            0,
            score - 20
        );

        lives--;

        message.innerHTML = `
            <div class="error-message">
                ❌ Incorrect!

                <br><br>

                ${escapeHTML(
                    question.explanation ||
                    "The record does not match the condition."
                )}
            </div>
        `;
    }

    scoreText.textContent = score;
    livesText.textContent = lives;

    if (feedbackPanel) {
        feedbackPanel.style.display = "block";
     }

    card.remove();
    remaining--;

    if (lives <= 0) {
        gameOver();
        return;
    }

    if (remaining <= 0) {
        finishCurrentQuestion();
    }
}


/* ==================================================
   RESULT TABLE
================================================== */

function updateResultTable() {
    if (!resultTable) {
        return;
    }

    resultTable.innerHTML = "";

    currentResults.forEach(student => {
        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>
                ${escapeHTML(student.name)}
            </td>

            <td>
                ${escapeHTML(student.age)}
            </td>

            <td>
                ${escapeHTML(student.passed)}
            </td>

            <td>
                ${escapeHTML(student.gpa)}
            </td>
        `;

        resultTable.appendChild(row);
    });
}


/* ==================================================
   FINISH CURRENT QUESTION
================================================== */

function finishCurrentQuestion() {
    clearInterval(timer);

    gameActive = false;

    nextBtn.style.display = "block";
}


/* ==================================================
   DROP ZONES
================================================== */

function setupBin(bin, type) {
    if (!bin) {
        return;
    }

    bin.addEventListener(
        "dragover",
        event => {
            event.preventDefault();

            bin.classList.add("bin-hover");
        }
    );

    bin.addEventListener(
        "dragleave",
        () => {
            bin.classList.remove("bin-hover");
        }
    );

    bin.addEventListener(
        "drop",
        () => {
            bin.classList.remove("bin-hover");

            if (!gameActive) {
                return;
            }

            const card =
                document.querySelector(".dragging");

            if (!card) {
                return;
            }

            if (card.answer) {
                checkNormalAnswer(
                    card,
                    type
                );

                return;
            }

            if (card.student) {
                checkSQLAnswer(
                    card,
                    type
                );
            }
        }
    );
}


/* ==================================================
   LOSE LIFE
================================================== */

function loseLife() {
    playTimeoutSound();

    lives--;

    livesText.textContent = lives;

    time = 30;
    timerText.textContent = time;

    if (lives <= 0) {
        gameOver();
    }
}


/* ==================================================
   GAME OVER
================================================== */

function gameOver() {
    gameActive = false;

    clearInterval(timer);

    message.innerHTML = `
        💀 Mission Failed

        <br><br>

        Final Score:
        ${score}
    `;

    restartBtn.style.display = "block";
}


/* ==================================================
   FINISH GAME
================================================== */

function finishGame() {
    gameActive = false;

    clearInterval(timer);

    playVictorySound();

    const allQuestions =
        getAllQuestions();

    localStorage.setItem(
        "dataQuestzScore",
        score
    );

    localStorage.setItem(
        "dataQuestzCompleted",
        allQuestions.length
    );

    localStorage.setItem(
        "dataQuestzTotal",
        allQuestions.length
    );

    localStorage.setItem(
        "dataQuestzCorrect",
        correctAnswers
    );

    localStorage.setItem(
        "dataQuestzWrong",
        wrongAnswers
    );

    window.location.href = "finish.html";
}


/* ==================================================
   NEXT MISSION
================================================== */

nextBtn.onclick = () => {
    currentLevel++;

    nextBtn.style.display = "none";

    const allQuestions =
        getAllQuestions();

    if (currentLevel < allQuestions.length) {
        startLevel();
    } else {
        finishGame();
    }
};


/* ==================================================
   QUESTION CREATOR
================================================== */

function openQuestionCreator() {
    if (!questionModal) {
        return;
    }

    questionModal.classList.add("active");

    resetQuestionCreator();
}


function closeQuestionCreator() {
    if (!questionModal) {
        return;
    }

    questionModal.classList.remove("active");
}


/* ==================================================
   ANSWER BUILDER
================================================== */

function addAnswerRow() {
    if (!answerList) {
        return;
    }

    const row =
        document.createElement("div");

    row.className = "answer-row";

    const answerNumber =
        answerList.children.length + 1;

    row.innerHTML = `
        <input
            type="radio"
            class="correct-answer"
            name="correct-answer"
        >

        <textarea
            class="answer-input"
            placeholder="Answer ${answerNumber}"
            rows="2"
        ></textarea>

        <button
            type="button"
            class="remove-answer"
        >
            ✕
        </button>
    `;

    row.querySelector(
        ".remove-answer"
    ).onclick = () => {
        row.remove();

        updateAnswerControls();
    };

    answerList.appendChild(row);

    updateAnswerControls();
}


function updateAnswerControls() {
    if (!answerList || !answerMode) {
        return;
    }

    const rows =
        answerList.querySelectorAll(
            ".answer-row"
        );

    const mode =
        answerMode.value;

    rows.forEach(row => {
        const control =
            row.querySelector(
                ".correct-answer"
            );

        if (mode === "multiple") {
            control.type = "checkbox";
        } else {
            control.type = "radio";
        }
    });

    const description =
        document.getElementById(
            "answer-mode-description"
        );

    if (!description) {
        return;
    }

    if (mode === "single") {
        description.textContent =
            "Add as many answers as you want. Select ONE correct answer.";
    }

    if (mode === "multiple") {
        description.textContent =
            "Add as many answers as you want. Select ALL correct answers.";
    }
}


function updateAnswerMode() {
    if (!answerMode) {
        return;
    }

    const mode =
        answerMode.value;

    if (mode === "true-false") {
        answerBuilder.classList.add(
            "hidden-section"
        );

        trueFalseBuilder.classList.remove(
            "hidden-section"
        );

        return;
    }

    trueFalseBuilder.classList.add(
        "hidden-section"
    );

    answerBuilder.classList.remove(
        "hidden-section"
    );

    updateAnswerControls();
}


function collectAnswers() {
    const rows =
        answerList.querySelectorAll(
            ".answer-row"
        );

    if (rows.length < 2) {
        alert(
            "Please add at least two answers."
        );

        return null;
    }

    const answers = [];

    rows.forEach(row => {
        const text =
            row.querySelector(
                ".answer-input"
            ).value.trim();

        const correct =
            row.querySelector(
                ".correct-answer"
            ).checked;

        answers.push({
            text,
            correct
        });
    });

    if (
        answers.some(
            answer => !answer.text
        )
    ) {
        alert(
            "Please complete every answer."
        );

        return null;
    }

    const correctCount =
        answers.filter(
            answer => answer.correct
        ).length;

    if (answerMode.value === "single") {
        if (correctCount !== 1) {
            alert(
                "Please select exactly ONE correct answer."
            );

            return null;
        }
    }

    if (answerMode.value === "multiple") {
        if (correctCount < 1) {
            alert(
                "Please select at least ONE correct answer."
            );

            return null;
        }
    }

    return answers;
}


/* ==================================================
   IMAGE PREVIEW
================================================== */

if (questionImage) {
    questionImage.addEventListener(
        "change",
        () => {
            const file =
                questionImage.files[0];

            if (!file) {
                imagePreview.innerHTML = "";
                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                event => {
                    imagePreview.innerHTML = `
                        <img
                            src="${event.target.result}"
                            alt="Question image preview"
                        >
                    `;
                };

            reader.readAsDataURL(file);
        }
    );
}


/* ==================================================
   SAVE CUSTOM QUESTION
================================================== */

function saveCustomQuestion() {
    const questionText =
        document.getElementById(
            "question-text"
        );

    const hintInput =
        document.getElementById(
            "question-hint"
        );

    const explanationInput =
        document.getElementById(
            "question-explanation"
        );

    const text =
        questionText.value.trim();

    const mode =
        answerMode.value;

    const hint =
        hintInput.value.trim();

    const explanation =
        explanationInput.value.trim();

    if (!text) {
        alert(
            "Please enter a question."
        );

        return;
    }

    let answers;

    if (mode === "true-false") {
        const selected =
            document.querySelector(
                'input[name="true-false-answer"]:checked'
            );

        if (!selected) {
            alert(
                "Please select TRUE or FALSE."
            );

            return;
        }

        answers = [
            {
                text: "TRUE",
                correct:
                    selected.value === "true"
            },
            {
                text: "FALSE",
                correct:
                    selected.value === "false"
            }
        ];
    } else {
        answers =
            collectAnswers();

        if (!answers) {
            return;
        }
    }

    const image =
        imagePreview.querySelector("img");

    const imageData =
        image
            ? image.src
            : null;

    const newQuestion = {
        id: "custom-" + Date.now(),
        type: "interactive",
        question: text,
        answerMode: mode,
        answers,
        hint,
        explanation,
        image: imageData
    };

    if (questionToEdit) {
        const editedQuestion = {
            ...newQuestion,
            id: questionToEdit.question.id
        };

        const index =
            customQuestions.findIndex(
                item =>
                    item.id ===
                    questionToEdit.question.id
            );

        if (index !== -1) {
            customQuestions[index] =
                editedQuestion;
        }

        saveCustomQuestions();

        alert(
            "✅ Question updated successfully!"
        );

        questionToEdit = null;
    } else {
        customQuestions.push(
            newQuestion
        );

        saveCustomQuestions();

        alert(
            "✅ Question created successfully!"
        );
    }

    closeQuestionCreator();

    resetQuestionCreator();
}


/* ==================================================
   RESET QUESTION CREATOR
================================================== */

function resetQuestionCreator() {
    const questionText =
        document.getElementById(
            "question-text"
        );

    const hintInput =
        document.getElementById(
            "question-hint"
        );

    const explanationInput =
        document.getElementById(
            "question-explanation"
        );

    if (questionText) {
        questionText.value = "";
    }

    if (answerMode) {
        answerMode.value = "single";
    }

    if (hintInput) {
        hintInput.value = "";
    }

    if (explanationInput) {
        explanationInput.value = "";
    }

    if (answerList) {
        answerList.innerHTML = "";

        addAnswerRow();
        addAnswerRow();
    }

    if (imagePreview) {
        imagePreview.innerHTML = "";
    }

    if (questionImage) {
        questionImage.value = "";
    }

    const trueOption =
        document.querySelector(
            'input[name="true-false-answer"][value="true"]'
        );

    if (trueOption) {
        trueOption.checked = true;
    }

    updateAnswerMode();
}


/* ==================================================
   QUESTION MANAGER
================================================== */

function openQuestionManager() {
    if (!questionManagerModal) {
        console.error(
            "DATA QUESTZ: question-manager-modal was not found."
        );

        return;
    }

    renderQuestionManager();

    questionManagerModal.classList.add(
        "active"
    );
}


function closeQuestionManager() {
    if (!questionManagerModal) {
        return;
    }

    questionManagerModal.classList.remove(
        "active"
    );
}


/* ==================================================
   RENDER QUESTION MANAGER
================================================== */

function renderQuestionManager() {
    if (!questionManagerList) {
        return;
    }

    questionManagerList.innerHTML = "";

    let displayedQuestions = 0;

    questions.forEach(
        (question, index) => {
            if (
                deletedOriginalQuestions.includes(
                    index
                )
            ) {
                return;
            }

            createManagerItem(
                question,
                true,
                index
            );

            displayedQuestions++;
        }
    );

    customQuestions.forEach(
        question => {
            if (
                deletedQuestions.includes(
                    question.id
                )
            ) {
                return;
            }

            createManagerItem(
                question,
                false,
                null
            );

            displayedQuestions++;
        }
    );

    if (displayedQuestions === 0) {
        questionManagerList.innerHTML = `
            <div class="no-questions">
                📭 No questions available.

                <br><br>

                Create a new question
                to get started!
            </div>
        `;
    }
}


/* ==================================================
   CREATE MANAGER ITEM
================================================== */

function createManagerItem(
    question,
    isOriginal,
    originalIndex
) {
    const item =
        document.createElement("div");

    item.className =
        "manager-question";

    const title =
        question.question ||
        question.sql ||
        "Untitled Question";

    const type =
        getQuestionTypeName(question);

    function getQuestionTypeClass(question) {
        if (isSQLQuestion(question)) {
            return "type-sql";
        }

        if (question.answerMode === "multiple") {
            return "type-multiple";
        }

        if (question.answerMode === "true-false") {
            return "type-true-false";
        }

        return "type-single";
    }

    item.innerHTML = `
        <div class="manager-question-info">

            <div class="manager-question-text">
                ${escapeHTML(title)}
            </div>

            <div class="manager-question-type ${getQuestionTypeClass(question)}">
                🎮 ${escapeHTML(type)}
            </div>

        </div>

        <div class="manager-question-actions">

            <button
                class="delete-question-btn"
                type="button"
            >
                🗑️ Delete
            </button>

            <button
                class="edit-question-btn"
                type="button"
            >
                ✏️ Edit
            </button>

        </div>
    `;

    const deleteBtn =
        item.querySelector(
            ".delete-question-btn"
        );

    const editBtn =
        item.querySelector(
            ".edit-question-btn"
        );

    deleteBtn.onclick = () => {
        askDeleteQuestion(
            question,
            isOriginal,
            originalIndex
        );
    };

    editBtn.onclick = () => {
        openQuestionEditor(
            question,
            isOriginal,
            originalIndex
        );
    };

    questionManagerList.appendChild(item);
}


/* ==================================================
   EDIT QUESTION
================================================== */

function openQuestionEditor(
    question,
    isOriginal,
    originalIndex
) {
    closeQuestionManager();

    if (isSQLQuestion(question)) {
        alert(
            "SQL questions cannot be edited yet."
        );

        return;
    }

    questionToEdit = {
        question,
        isOriginal,
        originalIndex
    };

    questionModal.classList.add("active");

    const title =
        document.querySelector(
            ".creator-header h2"
        );

    const description =
        document.querySelector(
            ".creator-header p"
        );

    if (title) {
        title.textContent =
            "✏️ Edit Question";
    }

    if (description) {
        description.textContent =
            "Edit your DATA QUESTZ challenge.";
    }

    document.getElementById(
        "question-text"
    ).value =
        question.question || "";

    answerMode.value =
        question.answerMode || "single";

    answerList.innerHTML = "";

    if (question.answerMode === "true-false") {
        const trueOption =
            document.querySelector(
                'input[name="true-false-answer"][value="true"]'
            );

        const falseOption =
            document.querySelector(
                'input[name="true-false-answer"][value="false"]'
            );

        const correctAnswer =
            question.answers?.find(
                answer => answer.correct
            );

        if (correctAnswer?.text === "FALSE") {
            falseOption.checked = true;
        } else {
            trueOption.checked = true;
        }
    } else {
        question.answers.forEach(answer => {
            addAnswerRow();

            const row =
                answerList.lastElementChild;

            row.querySelector(
                ".answer-input"
            ).value =
                answer.text;

            row.querySelector(
                ".correct-answer"
            ).checked =
                answer.correct;
        });
    }

    document.getElementById(
        "question-hint"
    ).value =
        question.hint || "";

    document.getElementById(
        "question-explanation"
    ).value =
        question.explanation || "";

    imagePreview.innerHTML = "";

    if (question.image) {
        imagePreview.innerHTML = `
            <img
                src="${question.image}"
                alt="Question image preview"
            >
        `;
    }

    saveQuestionBtn.textContent =
        "💾 Save Changes";

    updateAnswerMode();
}


/* ==================================================
   DELETE QUESTION
================================================== */

function askDeleteQuestion(
    question,
    isOriginal,
    originalIndex
) {
    questionToDelete = {
        question,
        isOriginal,
        originalIndex
    };

    const title =
        question.question ||
        question.sql ||
        "Untitled Question";

    deleteConfirmationText.innerHTML = `
        Are you sure you want to delete:

        <br><br>

        <strong>
            ${escapeHTML(title)}
        </strong>

        <br><br>

        This question will no longer
        appear in the game.
    `;

    deleteConfirmation.classList.add(
        "active"
    );
}


function deleteSelectedQuestion() {
    if (!questionToDelete) {
        return;
    }

    const data =
        questionToDelete;

    const question =
        data.question;

    if (data.isOriginal) {
        if (
            !deletedOriginalQuestions.includes(
                data.originalIndex
            )
        ) {
            deletedOriginalQuestions.push(
                data.originalIndex
            );
        }

        saveDeletedOriginalQuestions();
    } else {
        customQuestions =
            customQuestions.filter(
                item =>
                    item.id !== question.id
            );

        saveCustomQuestions();

        if (
            !deletedQuestions.includes(
                question.id
            )
        ) {
            deletedQuestions.push(
                question.id
            );
        }

        saveDeletedQuestions();
    }

    questionToDelete = null;

    deleteConfirmation.classList.remove(
        "active"
    );

    renderQuestionManager();
}


/* ==================================================
   DELETE CONFIRMATION EVENTS
================================================== */

if (confirmDeleteBtn) {
    confirmDeleteBtn.onclick =
        deleteSelectedQuestion;
}


if (cancelDeleteBtn) {
    cancelDeleteBtn.onclick = () => {
        questionToDelete = null;

        deleteConfirmation.classList.remove(
            "active"
        );
    };
}


if (deleteConfirmation) {
    deleteConfirmation.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                deleteConfirmation
            ) {
                questionToDelete = null;

                deleteConfirmation.classList.remove(
                    "active"
                );
            }
        }
    );
}


/* ==================================================
   QUESTION CREATOR EVENTS
================================================== */

if (addQuestionBtn) {
    addQuestionBtn.onclick =
        openQuestionCreator;
}


if (closeQuestionBtn) {
    closeQuestionBtn.onclick =
        closeQuestionCreator;
}


if (cancelQuestionBtn) {
    cancelQuestionBtn.onclick =
        closeQuestionCreator;
}


if (answerMode) {
    answerMode.onchange =
        updateAnswerMode;
}


if (addAnswerBtn) {
    addAnswerBtn.onclick =
        addAnswerRow;
}


if (saveQuestionBtn) {
    saveQuestionBtn.onclick =
        saveCustomQuestion;
}


if (questionModal) {
    questionModal.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                questionModal
            ) {
                closeQuestionCreator();
            }
        }
    );
}


/* ==================================================
   QUESTION MANAGER EVENTS
================================================== */

if (manageQuestionBtn) {
    manageQuestionBtn.onclick =
        openQuestionManager;
}


if (closeManagerBtn) {
    closeManagerBtn.onclick =
        closeQuestionManager;
}


if (closeManagerBottomBtn) {
    closeManagerBottomBtn.onclick =
        closeQuestionManager;
}


if (questionManagerModal) {
    questionManagerModal.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                questionManagerModal
            ) {
                closeQuestionManager();
            }
        }
    );
}


/* ==================================================
   INITIAL GAME SETUP
================================================== */

setupBin(
    database,
    true
);

setupBin(
    trash,
    false
);

nextBtn.style.display = "none";
restartBtn.style.display = "none";
resultPanel.style.display = "none";


/* ==================================================
   START GAME
================================================== */

startBtn.onclick = () => {
    startScreen.style.display = "none";

    if (howToPlay) {
        howToPlay.style.display = "none";
    }

    if (gameInterface) {
        gameInterface.classList.add("active");
    }

    playStartSound();

    startLevel();
};


/* ==================================================
   PLAY AGAIN
================================================== */

const playAgain =
    new URLSearchParams(
        window.location.search
    ).get("playAgain");

if (playAgain === "true") {
    startScreen.style.display = "none";

    if (howToPlay) {
        howToPlay.style.display = "none";
    }

    if (gameInterface) {
        gameInterface.classList.add("active");
    }

    playStartSound();

    startLevel();
}


/* ==================================================
   RESTART GAME
================================================== */

restartBtn.onclick = () => {
    score = 0;
    lives = 3;
    currentLevel = 0;
    correctAnswers = 0;
    wrongAnswers = 0;

    scoreText.textContent = score;
    livesText.textContent = lives;
    levelText.textContent = 1;

    progress.style.width = "0%";

    if (feedbackPanel) {
        feedbackPanel.style.display = "none";
    }

    if (hintPanel) {
        hintPanel.style.display = "block";
    }

    if (hintText) {
        hintText.style.display = "none";
    }

    playStartSound();

    startLevel();
};


/* ==================================================
   LOGOUT
================================================== */

if (logoutBtn) {
    logoutBtn.onclick = () => {
        localStorage.removeItem(
            "dataQuestzRole"
        );

        window.location.href =
            "login.html";
    };
}