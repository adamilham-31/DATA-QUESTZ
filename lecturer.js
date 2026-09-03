// ==========================================================
// DATA QUESTZ
// LECTURER QUESTION MANAGEMENT
// ==========================================================


// ==========================================================
// 1. LECTURER ACCESS PROTECTION
// ==========================================================

const userRole =
    localStorage.getItem("dataQuestzRole");

if (userRole !== "lecturer") {
    window.location.href = "login.html";
}


// ==========================================================
// 2. QUESTION STORAGE
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
// 3. STORAGE FUNCTIONS
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
// 4. SECURITY HELPER
// ==========================================================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// ==========================================================
// 5. GET ALL ACTIVE QUESTIONS
// ==========================================================

function getAllQuestions() {

    const originalQuestions =
        questions.filter((question, index) => {

            return !deletedOriginalQuestions.includes(index);

        });

    const activeCustomQuestions =
        customQuestions.filter(question => {

            return !deletedQuestions.includes(question.id);

        });

    return [
        ...originalQuestions,
        ...activeCustomQuestions
    ];
}


// ==========================================================
// 6. QUESTION TYPE
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


// ==========================================================
// 7. QUESTION TYPE CSS CLASS
// ==========================================================

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
// 8. DOM REFERENCES
// ==========================================================

// Dashboard buttons

const addQuestionBtn =
    document.getElementById("add-question-btn");

const manageQuestionBtn =
    document.getElementById("manage-question-btn");

const logoutBtn =
    document.getElementById("logout-btn");


// Create question modal

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


// Hint / explanation

const questionHint =
    document.getElementById("question-hint");

const questionExplanation =
    document.getElementById("question-explanation");

const trueExplanation =
    document.getElementById("true-explanation");

const falseExplanation =
    document.getElementById("false-explanation");


// Manager

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
// 9. OPEN CREATE QUESTION
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


// ==========================================================
// 10. CLOSE CREATE QUESTION
// ==========================================================

function closeQuestionCreator() {

    questionModal.classList.remove("active");

    questionToEdit = null;

    resetQuestionCreator();
}


// ==========================================================
// 11. RESET QUESTION CREATOR
// ==========================================================

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
// 12. ADD ANSWER ROW
// ==========================================================

function addAnswerRow(
    text = "",
    isCorrect = false,
    explanation = ""
) {

    const row =
        document.createElement("div");

    row.className =
        "answer-row";


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

    removeButton.type =
        "button";

    removeButton.className =
        "remove-answer";

    removeButton.textContent =
        "🗑️";

    removeButton.title =
        "Remove answer";


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


// ==========================================================
// 13. UPDATE ANSWER CONTROLS
// ==========================================================

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

            checked.forEach((input, index) => {

                if (index > 0) {
                    input.checked = false;
                }

            });

        }

    }
}


// ==========================================================
// 14. UPDATE ANSWER MODE
// ==========================================================

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

    if (mode === "multiple") {

        answerModeDescription.textContent =
            "Add as many answers as you want and mark all correct answers.";

    }

    updateAnswerControls();
}


// ==========================================================
// 15. COLLECT NORMAL ANSWERS
// ==========================================================

function collectAnswers() {

    const rows =
        answerList.querySelectorAll(".answer-row");

    const answers = [];

    rows.forEach(row => {

        const input =
            row.querySelector(".answer-input");

        const correct =
            row.querySelector(".answer-correct");

        const explanationInput =
            row.querySelector(".answer-explanation");

        const text =
            input.value.trim();

        const explanation =
            explanationInput
                ? explanationInput.value.trim()
                : "";

        if (text !== "") {

            answers.push({
                text: text,
                correct: correct.checked,
                explanation: explanation
            });

        }

    });

    return answers;
}


// ==========================================================
// 16. IMAGE PREVIEW
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
// 17. SAVE QUESTION
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


        // TRUE / FALSE

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


        // SINGLE / MULTIPLE

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


        // IMAGE

        let image = "";

        const previewImage =
            imagePreview.querySelector("img");

        if (previewImage) {
            image = previewImage.src;
        }


        // QUESTION DATA

        const questionData = {

            id:
                questionToEdit
                    ? questionToEdit.id
                    : "custom-" + Date.now(),

            type:
                mode,

            answerMode:
                mode,

            question:
                text,

            answers:
                answers,

            hint:
                hint,

            explanation:
                explanation,

            image:
                image

        };


        // SAVE EDIT OR CREATE

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


        // SAVE

        saveCustomQuestions();


        // CLOSE

        closeQuestionCreator();


        // REFRESH MANAGER

        renderQuestionManager();


        alert(
            isEditing
                ? "✅ Question updated successfully!"
                : "✅ Question created successfully!"
        );

    }
);


// ==========================================================
// 18. ANSWER MODE CHANGE
// ==========================================================

answerMode.addEventListener(
    "change",
    function () {

        updateAnswerMode();

    }
);


// ==========================================================
// 19. ADD ANSWER BUTTON
// ==========================================================

addAnswerBtn.addEventListener(
    "click",
    function () {

        addAnswerRow();

    }
);


// ==========================================================
// 20. CREATE QUESTION BUTTON
// ==========================================================

addQuestionBtn.addEventListener(
    "click",
    function () {

        openQuestionCreator();

    }
);


// ==========================================================
// 21. CLOSE QUESTION BUTTONS
// ==========================================================

closeQuestionBtn.addEventListener(
    "click",
    function () {

        closeQuestionCreator();

    }
);


cancelQuestionBtn.addEventListener(
    "click",
    function () {

        closeQuestionCreator();

    }
);


// ==========================================================
// 22. OPEN QUESTION EDITOR
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


    questionToEdit =
        question;


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


    // QUESTION

    questionText.value =
        question.question || "";


    // MODE

    answerMode.value =
        question.answerMode ||
        question.type ||
        "single";


    // HINT

    questionHint.value =
        question.hint || "";


    // EXPLANATION

    questionExplanation.value =
        question.explanation || "";


    // IMAGE

    imagePreview.innerHTML = "";

    if (question.image) {

        imagePreview.innerHTML = `
            <img
                src="${question.image}"
                alt="Question image preview"
            >
        `;

    }


    // ANSWER LIST

    answerList.innerHTML = "";


    // TRUE / FALSE

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


    // NORMAL ANSWERS

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
// 23. OPEN QUESTION MANAGER
// ==========================================================

function openQuestionManager() {

    renderQuestionManager();

    questionManagerModal.classList.add(
        "active"
    );

}


// ==========================================================
// 24. CLOSE QUESTION MANAGER
// ==========================================================

function closeQuestionManager() {

    questionManagerModal.classList.remove(
        "active"
    );

}


// ==========================================================
// 25. RENDER QUESTION MANAGER
// ==========================================================

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


// ==========================================================
// 26. CREATE MANAGER ITEM
// ==========================================================

function createManagerItem(
    question,
    index
) {

    const item =
        document.createElement("div");

    item.className =
        "question-manager-item";


    // QUESTION TITLE

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


    // TYPE

    const typeName =
        getQuestionTypeName(question);

    const typeClass =
        getQuestionTypeClass(question);


    // CHECK WHETHER ORIGINAL

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

            <p
                class="manager-question-type ${typeClass}"
            >
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


    // EDIT

    const editButton =
        item.querySelector(
            ".edit-question-btn"
        );

    editButton.addEventListener(
        "click",
        function () {

            openQuestionEditor(
                question
            );

        }
    );


    // DELETE

    const deleteButton =
        item.querySelector(
            ".delete-question-btn"
        );

    deleteButton.addEventListener(
        "click",
        function () {

            askDeleteQuestion(
                question,
                isOriginal
            );

        }
    );


    questionManagerList.appendChild(
        item
    );

}


// ==========================================================
// 27. ASK DELETE QUESTION
// ==========================================================

function askDeleteQuestion(
    question,
    isOriginal
) {

    questionToDelete = {
        question: question,
        isOriginal: isOriginal
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


// ==========================================================
// 28. CANCEL DELETE
// ==========================================================

cancelDeleteBtn.addEventListener(
    "click",
    function () {

        questionToDelete =
            null;

        deleteConfirmation.classList.remove(
            "active"
        );

    }
);


// ==========================================================
// 29. CONFIRM DELETE
// ==========================================================

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


        // DELETE ORIGINAL QUESTION

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


        // DELETE CUSTOM QUESTION

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


        // CLOSE CONFIRMATION

        deleteConfirmation.classList.remove(
            "active"
        );

        questionToDelete =
            null;


        // REFRESH MANAGER

        renderQuestionManager();


        alert(
            "🗑️ Question deleted successfully."
        );

    }
);


// ==========================================================
// 30. MANAGER BUTTON
// ==========================================================

manageQuestionBtn.addEventListener(
    "click",
    function () {

        openQuestionManager();

    }
);


// ==========================================================
// 31. CLOSE MANAGER BUTTONS
// ==========================================================

closeManagerBtn.addEventListener(
    "click",
    function () {

        closeQuestionManager();

    }
);


closeManagerBottomBtn.addEventListener(
    "click",
    function () {

        closeQuestionManager();

    }
);


// ==========================================================
// 32. LOGOUT
// ==========================================================

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
// 33. CLOSE MODALS WHEN CLICKING BACKGROUND
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
// 34. INITIAL SETUP
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