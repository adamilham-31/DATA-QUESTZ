let gameActive = false;

let currentLevel = 0;

let score = 0;

let lives = 3;

let time = 30;

let timer;

const startBtn=document.getElementById("start-btn");

const restartBtn=document.getElementById("restart-btn");

const startScreen=document.getElementById("start-screen");

const scoreText = document.getElementById("score");

const livesText = document.getElementById("lives");

const levelText = document.getElementById("level");

const queryText = document.getElementById("query");

const cards = document.getElementById("cards");

const message = document.getElementById("message");

const database = document.getElementById("database");

const trash = document.getElementById("trash");

const nextBtn = document.getElementById("next-btn");

const timerText = document.getElementById("timer");

const progress = document.getElementById("progress-bar");



const hintBtn = document.getElementById("hint-btn");

const hintText = document.getElementById("hint-text");

const lesson = document.getElementById("lesson");

const resultTable = document.querySelector("#result-table tbody");



let remaining = 0;



let currentResults = [];





function startLevel(){

    gameActive = true;

    clearInterval(timer);


    time = 30;


    timerText.innerHTML = time;



    timer = setInterval(()=>{


        time--;


        timerText.innerHTML=time;



        if(time<=0){

            loseLife();

        }


    },1000);



    cards.innerHTML="";

    message.innerHTML=
    `
    Choose the correct records based on the SQL query.
    `;



    currentResults=[];

    updateResultTable();



    let question = questions[currentLevel];



    queryText.innerHTML =

    `

    <div class="sql-animation">

    ${question.sql}

    </div>

    `;



    lesson.innerHTML = question.lesson;



    hintText.innerHTML =
    `
    Press the hint button when you need help.
    `;



    hintBtn.onclick=()=>{


        hintText.innerHTML = question.hint;


    };



    levelText.innerHTML=currentLevel+1;



    progress.style.width =

    ((currentLevel)/questions.length)*100+"%";



    let shuffled=[...students]

    .sort(()=>Math.random()-0.5);



    remaining=shuffled.length;



    shuffled.forEach(student=>{


        createCard(student);


    });


}





function createCard(student){


    let card=document.createElement("div");


    card.className="card";


    card.draggable=true;



    card.innerHTML=

    `

    <h3>${student.name}</h3>

    <p>Age: ${student.age}</p>

    <p>Passed: ${student.passed}</p>

    <p>GPA: ${student.gpa}</p>

    `;



    card.student=student;



    card.addEventListener(

    "dragstart",

    ()=>{

        card.classList.add("dragging");

    });



    card.addEventListener(

    "dragend",

    ()=>{

        card.classList.remove("dragging");

    });



    cards.appendChild(card);


}





function checkAnswer(card,correct){


    let student=card.student;


    let question=questions[currentLevel];


    let answer=question.check(student);



    if(correct===answer){



        score+=50;



        currentResults.push(student);



        message.innerHTML=

        `

        ✅ Correct! +50 points

        <br><br>

        ${question.explanation(student)}

        `;


        updateResultTable();



    }


    else{


        score = Math.max(0, score - 20);;


        lives--;


        message.innerHTML=

        `

        ❌ Incorrect!

        <br><br>

        ${question.explanation(student)}

        `;


    }



    scoreText.innerHTML=score;


    livesText.innerHTML=lives;



    card.remove();


    remaining--;



    if(lives<=0){

        gameOver();

    }



    if(remaining===0){


        nextBtn.style.display="block";


        clearInterval(timer);


    }


}





function updateResultTable(){


    resultTable.innerHTML="";



    currentResults.forEach(student=>{


        let row=document.createElement("tr");



        row.innerHTML=

        `

        <td>${student.name}</td>

        <td>${student.age}</td>

        <td>${student.passed}</td>

        <td>${student.gpa}</td>

        `;



        resultTable.appendChild(row);



    });


}







function setupBin(bin,type){



    bin.addEventListener(

    "dragover",

    e=>{

        e.preventDefault();

    });



    bin.addEventListener("drop",()=>{

    if(!gameActive) return;

    let card=document.querySelector(".dragging");

    if(card){
        checkAnswer(card,type);
    }

});


}







function loseLife(){


    lives--;


    livesText.innerHTML=lives;


    time=30;



    if(lives<=0){

        gameOver();

    }


}






function gameOver(){

    gameActive = false;

    clearInterval(timer);

    message.innerHTML = `
        💀 Mission Failed
        <br><br>
        Final Score: ${score}
    `;

    restartBtn.style.display = "block";

}







nextBtn.onclick=()=>{


    currentLevel++;


    nextBtn.style.display="none";



    if(currentLevel<questions.length){


        startLevel();


    }


    else{


        progress.style.width="100%";



        message.innerHTML=

`
🏆 SQL Master!

<br><br>

You completed all database missions.

<br>

Final Score:
${score}

`;

restartBtn.style.display="block";



    }



};







setupBin(database,true);

setupBin(trash,false);



nextBtn.style.display="none";

restartBtn.style.display="none";



startBtn.onclick=()=>{


    startScreen.style.display="none";

    startLevel();


};




restartBtn.onclick=()=>{


    location.reload();


};