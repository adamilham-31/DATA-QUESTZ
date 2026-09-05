// ==========================================================
// DATA QUESTZ
// LECTURER QUESTION MANAGEMENT
// ==========================================================


// ==========================================================
// LECTURER ACCESS
// ==========================================================

const userRole = localStorage.getItem("dataQuestzRole");

if (userRole !== "lecturer") {
    window.location.href = "login.html";
}


// ==========================================================
// QUESTION STORAGE
// ==========================================================

let customQuestions = JSON.parse(
    localStorage.getItem("dataQuestzQuestions") || "[]"
);

let deletedQuestions = JSON.parse(
    localStorage.getItem("dataQuestzDeletedQuestions") || "[]"
);

let deletedOriginalQuestions = JSON.parse(
    localStorage.getItem("dataQuestzDeletedOriginals") || "[]"
);

let questionToDelete = null;
let questionToEdit = null;


// ==========================================================
// DOM ELEMENTS
// ==========================================================

// Dashboard
const addQuestionBtn =
    document.getElementById("add-question-btn");

const manageQuestionBtn =
    document.getElementById("manage-question-btn");

const logoutBtn =
    document.getElementById("logout-btn");

// Question creator
const questionModal =
    document.getElementById("question-modal");

const closeQuestionBtn =
    document.getElementById("close-question-btn");

const cancelQuestionBtn =
    document.getElementById("cancel-question-btn");

const saveQuestionBtn =
    document.getElementById("save-question-btn");

const creatorTitle =
    document.getElementById("creator-title");

const creatorSubtitle =
    document.getElementById("creator-subtitle");

// Question fields
const questionText =
    document.getElementById("question-text");

const answerMode =
    document.getElementById("answer-mode");

const answerBuilder =
    document.getElementById("answer-builder");

const answerList =
    document.getElementById("answer-list");

const addAnswerBtn =
    document.getElementById("add-answer-btn");

const answerModeDescription =
    document.getElementById("answer-mode-description");

const trueFalseBuilder =
    document.getElementById("true-false-builder");

// Image
const questionImage =
    document.getElementById("question-image");

const imagePreview =
    document.getElementById("image-preview");

// Hint and explanation
const questionHint =
    document.getElementById("question-hint");

const questionExplanation =
    document.getElementById("question-explanation");

const trueExplanation =
    document.getElementById("true-explanation");

const falseExplanation =
    document.getElementById("false-explanation");

// Question manager
const questionManagerModal =
    document.getElementById("question-manager-modal");

const closeManagerBtn =
    document.getElementById("close-manager-btn");

const closeManagerBottomBtn =
    document.getElementById("close-manager-bottom-btn");

const questionManagerList =
    document.getElementById("question-manager-list");

// Delete confirmation
const deleteConfirmation =
    document.getElementById("delete-confirmation");

const deleteConfirmationText =
    document.getElementById("delete-confirmation-text");

const cancelDeleteBtn =
    document.getElementById("cancel-delete-btn");

const confirmDeleteBtn =
    document.getElementById("confirm-delete-btn");


// ==========================================================
// STORAGE FUNCTIONS
// ==========================================================

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


// ==========================================================
// SECURITY HELPER
// ==========================================================

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================================
// GET ACTIVE QUESTIONS
// ==========================================================

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


// ==========================================================
// QUESTION TYPE
// ==========================================================

function getQuestionTypeName(question) {
    if (
        question.sql ||
        question.dataset ||
        question.answer?.conditions
    ) {
        return "SQL Filter";
    }

    if (
        question.type === "true-false" ||
        question.answerMode === "true-false"
    ) {
        return "True / False";
    }

    if (
        question.type === "multiple" ||
        question.answerMode === "multiple"
    ) {
        return "Multiple Correct Answers";
    }

    if (
        question.type === "single" ||
        question.answerMode === "single"
    ) {
        return "One Correct Answer";
    }

    return "Interactive Question";
}

function getQuestionTypeClass(question) {
    if (
        question.sql ||
        question.dataset ||
        question.answer?.conditions
    ) {
        return "type-sql";
    }

    if (
        question.type === "true-false" ||
        question.answerMode === "true-false"
    ) {
        return "type-true-false";
    }

    if (
        question.type === "multiple" ||
        question.answerMode === "multiple"
    ) {
        return "type-multiple";
    }

    return "type-single";
}


// ==========================================================
// QUESTION CREATOR
// ==========================================================

function openQuestionCreator() {
    questionToEdit = null;

    resetQuestionCreator();

    questionModal.classList.add("active");

    creatorTitle.textContent =
        "➕ Create New Question";

    creatorSubtitle.textContent =
        "Build your own interactive DATA QUESTZ challenge.";

    saveQuestionBtn.textContent =
        "💾 Create Question";

    updateAnswerMode();
}

function closeQuestionCreator() {
    questionModal.classList.remove("active");

    questionToEdit = null;

    resetQuestionCreator();
}

function resetQuestionCreator() {
    questionText.value = "";
    answerMode.value = "single";
    questionHint.value = "";
    questionExplanation.value = "";
    questionImage.value = "";
    imagePreview.innerHTML = "";
    answerList.innerHTML = "";

    addAnswerRow();
    addAnswerRow();

    const trueRadio =
        document.querySelector(
            'input[name="true-false-answer"][value="true"]'
        );

    if (trueRadio) {
        trueRadio.checked = true;
    }

    if (trueExplanation) {
        trueExplanation.value = "";
    }

    if (falseExplanation) {
        falseExplanation.value = "";
    }

    creatorTitle.textContent =
        "➕ Create New Question";

    creatorSubtitle.textContent =
        "Build your own interactive DATA QUESTZ challenge.";

    saveQuestionBtn.textContent =
        "💾 Create Question";

    updateAnswerMode();
}


// ==========================================================
// ANSWER ROWS
// ==========================================================

function addAnswerRow(
    text = "",
    isCorrect = false,
    explanation = ""
) {
    const row =
        document.createElement("div");

    row.className = "answer-row";

    const correctInput =
        document.createElement("input");

    correctInput.className =
        "answer-correct";

    correctInput.type =
        answerMode.value === "multiple"
            ? "checkbox"
            : "radio";

    correctInput.name =
        "correct-answer";

    correctInput.checked =
        isCorrect;

    const answerInput =
        document.createElement("textarea");

    answerInput.className =
        "answer-input";

    answerInput.placeholder =
        "Enter answer...";

    answerInput.value =
        text;

    const explanationInput =
        document.createElement("textarea");

    explanationInput.className =
        "answer-explanation";

    explanationInput.placeholder =
        "Explain why this answer is correct or incorrect...";

    explanationInput.value =
        explanation;

    const removeButton =
        document.createElement("button");

    removeButton.type = "button";
    removeButton.className = "remove-answer";
    removeButton.textContent = "🗑️";
    removeButton.title = "Remove answer";

    removeButton.addEventListener(
        "click",
        () => {
            const rows =
                answerList.querySelectorAll(
                    ".answer-row"
                );

            if (rows.length <= 2) {
                alert(
                    "You need at least 2 answer choices."
                );

                return;
            }

            row.remove();
        }
    );

    row.appendChild(correctInput);
    row.appendChild(answerInput);
    row.appendChild(explanationInput);
    row.appendChild(removeButton);

    answerList.appendChild(row);
}

function updateAnswerControls() {
    const mode =
        answerMode.value;

    const correctInputs =
        answerList.querySelectorAll(
            ".answer-correct"
        );

    correctInputs.forEach(input => {
        const wasChecked =
            input.checked;

        input.type =
            mode === "multiple"
                ? "checkbox"
                : "radio";

        input.name =
            "correct-answer";

        input.checked =
            wasChecked;
    });

    if (mode === "single") {
        const checked =
            answerList.querySelectorAll(
                ".answer-correct:checked"
            );

        if (checked.length > 1) {
            checked.forEach(
                (input, index) => {
                    if (index > 0) {
                        input.checked = false;
                    }
                }
            );
        }
    }
}

function updateAnswerMode() {
    const mode =
        answerMode.value;

    if (mode === "true-false") {
        answerBuilder.classList.add(
            "hidden-section"
        );

        trueFalseBuilder.classList.remove(
            "hidden-section"
        );

        answerModeDescription.textContent =
            "Choose whether the statement is TRUE or FALSE.";

        return;
    }

    answerBuilder.classList.remove(
        "hidden-section"
    );

    trueFalseBuilder.classList.add(
        "hidden-section"
    );

    if (mode === "single") {
        answerModeDescription.textContent =
            "Add as many answers as you want and mark one as correct.";
    }

    else if (mode === "multiple") {
        answerModeDescription.textContent =
            "Add as many answers as you want and mark all correct answers.";
    }

    updateAnswerControls();
}

function collectAnswers() {
    const rows =
        answerList.querySelectorAll(
            ".answer-row"
        );

    const answers = [];

    rows.forEach(row => {
        const input =
            row.querySelector(
                ".answer-input"
            );

        const correct =
            row.querySelector(
                ".answer-correct"
            );

        const explanationInput =
            row.querySelector(
                ".answer-explanation"
            );

        const text =
            input.value.trim();

        const explanation =
            explanationInput
                ? explanationInput.value.trim()
                : "";

        if (text !== "") {
            answers.push({
                text,
                correct: correct.checked,
                explanation
            });
        }
    });

    return answers;
}


// ==========================================================
// IMAGE PREVIEW
// ==========================================================

if (questionImage) {
    questionImage.addEventListener(
        "change",
        function () {
            const file =
                this.files[0];

            if (!file) {
                imagePreview.innerHTML = "";
                return;
            }

            if (!file.type.startsWith("image/")) {
                alert(
                    "Please choose an image file."
                );

                this.value = "";

                return;
            }

            const reader =
                new FileReader();

            reader.onload =
                function (event) {
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


// ==========================================================
// SAVE QUESTION
// ==========================================================

saveQuestionBtn.addEventListener(
    "click",
    function () {
        const text =
            questionText.value.trim();

        const mode =
            answerMode.value;

        const hint =
            questionHint.value.trim();

        const explanation =
            questionExplanation.value.trim();

        if (!text) {
            alert(
                "Please enter a question."
            );

            questionText.focus();

            return;
        }

        let answers = [];

        if (mode === "true-false") {
            const selected =
                document.querySelector(
                    'input[name="true-false-answer"]:checked'
                );

            const correctValue =
                selected
                    ? selected.value
                    : "true";

            answers = [
                {
                    text: "TRUE",
                    correct:
                        correctValue === "true",
                    explanation:
                        trueExplanation
                            ? trueExplanation.value.trim()
                            : ""
                },
                {
                    text: "FALSE",
                    correct:
                        correctValue === "false",
                    explanation:
                        falseExplanation
                            ? falseExplanation.value.trim()
                            : ""
                }
            ];
        }

        else {
            answers =
                collectAnswers();

            if (answers.length < 2) {
                alert(
                    "Please provide at least 2 answer choices."
                );

                return;
            }

            const correctAnswers =
                answers.filter(
                    answer => answer.correct
                );

            if (correctAnswers.length === 0) {
                alert(
                    "Please mark at least one correct answer."
                );

                return;
            }

            if (
                mode === "single" &&
                correctAnswers.length > 1
            ) {
                alert(
                    "One Correct Answer mode can only have ONE correct answer."
                );

                return;
            }
        }

        let image = "";

        const previewImage =
            imagePreview.querySelector("img");

        if (previewImage) {
            image = previewImage.src;
        }

    
            const selectedStudents = [
    ...document.querySelectorAll(".dataset-correct:checked")
].map(input => ({
    name: input.dataset.name,
    age: Number(input.dataset.age),
    passed: input.dataset.passed === "true",
    gpa: Number(input.dataset.gpa)
}));

const questionData = {
    id: questionToEdit ? questionToEdit.id : "custom-" + Date.now(),
    type: "sql-filter",
    answerMode: mode,
    question: text,
    sql: text,
    dataset: selectedStudents,
    answers,
    hint,
    explanation,
    image
};

        const isEditing =
            Boolean(questionToEdit);

        if (isEditing) {
            const index =
                customQuestions.findIndex(
                    question =>
                        question.id === questionToEdit.id
                );

            if (index !== -1) {
                customQuestions[index] =
                    questionData;
            }
        }

        else {
            customQuestions.push(
                questionData
            );
        }

        saveCustomQuestions();

        closeQuestionCreator();

        renderQuestionManager();

        alert(
            isEditing
                ? "✅ Question updated successfully!"
                : "✅ Question created successfully!"
        );
    }
);


// ==========================================================
// QUESTION EDITOR
// ==========================================================

function openQuestionEditor(question) {
    if (
        question.sql ||
        question.dataset ||
        question.answer?.conditions
    ) {
        alert(
            "SQL questions cannot be edited yet."
        );

        return;
    }

    questionToEdit = question;

    questionManagerModal.classList.remove(
        "active"
    );

    questionModal.classList.add(
        "active"
    );

    creatorTitle.textContent =
        "✏️ Edit Question";

    creatorSubtitle.textContent =
        "Update your DATA QUESTZ question and answers.";

    saveQuestionBtn.textContent =
        "💾 Save Changes";

    questionText.value =
        question.question || "";

    answerMode.value =
        question.answerMode ||
        question.type ||
        "single";

    questionHint.value =
        question.hint || "";

    questionExplanation.value =
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

    answerList.innerHTML = "";

    if (answerMode.value === "true-false") {
        const trueAnswer =
            question.answers?.find(
                answer =>
                    answer.text === "TRUE"
            );

        const falseAnswer =
            question.answers?.find(
                answer =>
                    answer.text === "FALSE"
            );

        const trueRadio =
            document.querySelector(
                'input[name="true-false-answer"][value="true"]'
            );

        const falseRadio =
            document.querySelector(
                'input[name="true-false-answer"][value="false"]'
            );

        if (trueRadio) {
            trueRadio.checked =
                trueAnswer
                    ? trueAnswer.correct
                    : true;
        }

        if (falseRadio) {
            falseRadio.checked =
                falseAnswer
                    ? falseAnswer.correct
                    : false;
        }

        if (trueExplanation) {
            trueExplanation.value =
                trueAnswer?.explanation || "";
        }

        if (falseExplanation) {
            falseExplanation.value =
                falseAnswer?.explanation || "";
        }
    }

    else {
        const answers =
            question.answers || [];

        if (answers.length === 0) {
            addAnswerRow();
            addAnswerRow();
        }

        else {
            answers.forEach(answer => {
                addAnswerRow(
                    answer.text || "",
                    answer.correct === true,
                    answer.explanation || ""
                );
            });
        }
    }

    updateAnswerMode();
}


// ==========================================================
// QUESTION MANAGER
// ==========================================================

function openQuestionManager() {
    renderQuestionManager();

    questionManagerModal.classList.add(
        "active"
    );
}

function closeQuestionManager() {
    questionManagerModal.classList.remove(
        "active"
    );
}

function renderQuestionManager() {
    questionManagerList.innerHTML = "";

    const allQuestions =
        getAllQuestions();

    if (allQuestions.length === 0) {
        questionManagerList.innerHTML = `
            <div class="no-questions">
                No questions available.
            </div>
        `;

        return;
    }

    allQuestions.forEach(
        (question, index) => {
            createManagerItem(
                question,
                index
            );
        }
    );
}

function createManagerItem(
    question,
    index
) {
    const item =
        document.createElement("div");

    item.className =
        "question-manager-item";

    let questionTitle =
        question.question;

    if (
        !questionTitle &&
        question.sql
    ) {
        questionTitle =
            question.sql;
    }

    if (!questionTitle) {
        questionTitle =
            "Untitled Question";
    }

    const typeName =
        getQuestionTypeName(question);

    const typeClass =
        getQuestionTypeClass(question);

    const isOriginal =
        questions.some(
            original =>
                original === question
        );

    item.innerHTML = `
        <div class="question-manager-info">

            <h3>
                ${index + 1}. ${escapeHTML(questionTitle)}
            </h3>

            <p class="manager-question-type ${typeClass}">
                ${escapeHTML(typeName)}
            </p>

        </div>

        <div class="manager-question-actions">

            <button
                type="button"
                class="edit-question-btn"
            >
                ✏️ Edit
            </button>

            <button
                type="button"
                class="delete-question-btn"
            >
                🗑️ Delete
            </button>

        </div>
    `;

    const editButton =
        item.querySelector(
            ".edit-question-btn"
        );

    editButton.addEventListener(
        "click",
        () => openQuestionEditor(question)
    );

    const deleteButton =
        item.querySelector(
            ".delete-question-btn"
        );

    deleteButton.addEventListener(
        "click",
        () =>
            askDeleteQuestion(
                question,
                isOriginal
            )
    );

    questionManagerList.appendChild(item);
}


// ==========================================================
// DELETE QUESTION
// ==========================================================

function askDeleteQuestion(
    question,
    isOriginal
) {
    questionToDelete = {
        question,
        isOriginal
    };

    let title =
        question.question;

    if (
        !title &&
        question.sql
    ) {
        title =
            question.sql;
    }

    if (!title) {
        title =
            "this question";
    }

    deleteConfirmationText.textContent =
        `Are you sure you want to delete "${title}"?`;

    deleteConfirmation.classList.add(
        "active"
    );
}

cancelDeleteBtn.addEventListener(
    "click",
    function () {
        questionToDelete = null;

        deleteConfirmation.classList.remove(
            "active"
        );
    }
);

confirmDeleteBtn.addEventListener(
    "click",
    function () {
        if (!questionToDelete) {
            return;
        }

        const question =
            questionToDelete.question;

        const isOriginal =
            questionToDelete.isOriginal;

        if (isOriginal) {
            const originalIndex =
                questions.indexOf(question);

            if (originalIndex !== -1) {
                if (
                    !deletedOriginalQuestions.includes(
                        originalIndex
                    )
                ) {
                    deletedOriginalQuestions.push(
                        originalIndex
                    );
                }

                saveDeletedOriginalQuestions();
            }
        }

        else {
            customQuestions =
                customQuestions.filter(
                    item =>
                        item.id !== question.id
                );

            if (
                !deletedQuestions.includes(
                    question.id
                )
            ) {
                deletedQuestions.push(
                    question.id
                );
            }

            saveCustomQuestions();
            saveDeletedQuestions();
        }

        deleteConfirmation.classList.remove(
            "active"
        );

        questionToDelete = null;

        renderQuestionManager();

        alert(
            "🗑️ Question deleted successfully."
        );
    }
);


// ==========================================================
// BUTTON EVENTS
// ==========================================================

answerMode.addEventListener(
    "change",
    updateAnswerMode
);

addAnswerBtn.addEventListener(
    "click",
    addAnswerRow
);

addQuestionBtn.addEventListener(
    "click",
    openQuestionCreator
);

closeQuestionBtn.addEventListener(
    "click",
    closeQuestionCreator
);

cancelQuestionBtn.addEventListener(
    "click",
    closeQuestionCreator
);

manageQuestionBtn.addEventListener(
    "click",
    openQuestionManager
);

closeManagerBtn.addEventListener(
    "click",
    closeQuestionManager
);

closeManagerBottomBtn.addEventListener(
    "click",
    closeQuestionManager
);

logoutBtn.addEventListener(
    "click",
    function () {
        localStorage.removeItem(
            "dataQuestzRole"
        );

        window.location.href =
            "login.html";
    }
);


// ==========================================================
// MODAL BACKGROUND EVENTS
// ==========================================================

questionModal.addEventListener(
    "click",
    function (event) {
        if (event.target === questionModal) {
            closeQuestionCreator();
        }
    }
);

questionManagerModal.addEventListener(
    "click",
    function (event) {
        if (
            event.target === questionManagerModal
        ) {
            closeQuestionManager();
        }
    }
);


// ==========================================================
// INITIAL SETUP
// ==========================================================

resetQuestionCreator();

questionModal.classList.remove(
    "active"
);

questionManagerModal.classList.remove(
    "active"
);

deleteConfirmation.classList.remove(
    "active"
);

renderQuestionManager();