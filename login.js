// ==========================================================
// DATA QUESTZ
// LOGIN SYSTEM
// ==========================================================


// ==========================================================
// DOM ELEMENTS
// ==========================================================

const studentRoleBtn =
    document.getElementById("student-role-btn");

const lecturerRoleBtn =
    document.getElementById("lecturer-role-btn");

const studentLogin =
    document.getElementById("student-login");

const lecturerLogin =
    document.getElementById("lecturer-login");

const studentEnterBtn =
    document.getElementById("student-enter-btn");

const lecturerLoginBtn =
    document.getElementById("lecturer-login-btn");

const lecturerUsername =
    document.getElementById("lecturer-username");

const lecturerPassword =
    document.getElementById("lecturer-password");

const loginMessage =
    document.getElementById("login-message");


// ==========================================================
// LECTURER LOGIN DETAILS
// ==========================================================

const LECTURER_USERNAME = "lecturer";
const LECTURER_PASSWORD = "1234";


// ==========================================================
// ROLE SELECTION
// ==========================================================

studentRoleBtn.addEventListener(
    "click",
    () => {
        studentRoleBtn.classList.add("active");
        lecturerRoleBtn.classList.remove("active");

        studentLogin.classList.remove(
            "hidden-login"
        );

        lecturerLogin.classList.add(
            "hidden-login"
        );

        loginMessage.textContent = "";
    }
);

lecturerRoleBtn.addEventListener(
    "click",
    () => {
        lecturerRoleBtn.classList.add("active");
        studentRoleBtn.classList.remove("active");

        lecturerLogin.classList.remove(
            "hidden-login"
        );

        studentLogin.classList.add(
            "hidden-login"
        );

        loginMessage.textContent = "";
    }
);


// ==========================================================
// STUDENT LOGIN
// ==========================================================

studentEnterBtn.addEventListener(
    "click",
    () => {
        localStorage.setItem(
            "dataQuestzRole",
            "student"
        );

        window.location.href =
            "index.html";
    }
);


// ==========================================================
// LECTURER LOGIN
// ==========================================================

lecturerLoginBtn.addEventListener(
    "click",
    () => {
        const username =
            lecturerUsername.value.trim();

        const password =
            lecturerPassword.value;

        if (
            username === LECTURER_USERNAME &&
            password === LECTURER_PASSWORD
        ) {
            localStorage.setItem(
                "dataQuestzRole",
                "lecturer"
            );

            window.location.href =
                "lecturer.html";
        }

        else {
            loginMessage.textContent =
                "❌ Incorrect username or password.";
        }
    }
);