const finalScore = document.getElementById('finalScore');
const moduleAgain = document.getElementById('play-module-again');
const lastScore = localStorage.getItem('lastScore');
const getMod = localStorage.getItem('module');
const getDif = localStorage.getItem('difficulty');
const getScore = localStorage.getItem('lastScore');
let tonScores = JSON.parse(localStorage.getItem('tonScores')) || [];
let modScores = JSON.parse(localStorage.getItem('modScores')) || [];
let degScores = JSON.parse(localStorage.getItem('degScores')) || [];
let intScores = JSON.parse(localStorage.getItem('intScores')) || [];

finalScore.innerText = lastScore;

function orgArray(arr, stringArr) {

    let score = {
        score: getScore,
        mod: getMod,
        dif: getDif,
    };

    arr.push(score);
    arr.sort((a, b) => b.score - a.score);

    arr = arr.filter((value, index, array) =>
        index === array.findIndex((i) => (
            i.score === value.score && i.dif === value.dif
        ))
    );
    arr.splice(21);
    localStorage.setItem(stringArr, JSON.stringify(arr));
}

function getScores() {

    if (getMod == 'tonalities') {
        orgArray(tonScores, 'tonScores');
    } else if (getMod == 'modes') {
        orgArray(modScores, 'modScores');
    } else if (getMod == 'degrees') {
        orgArray(degScores, 'degScores');
    } else {
        orgArray(intScores, 'intScores');
    }
};

getScores();

function startQuiz() {
    let module = localStorage.getItem('module');

    window.location.assign(`/quiz.html?q=${module}`);
}

function showResult() {

    const congratsText = document.getElementById("congratsText");
    if (lastScore == 7) { // if user scored 7
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = `<i class="fa-sharp fa-solid fa-trophy"></i>
        <h3 id="congratsText" >Congratulations !<br>You've got it all !</h3>`;
        congratsText.innerHTML = scoreTag;
    }
    else if (lastScore >= 5) { // if user scored more than 5
        let scoreTag = `<i class="fas fa-walking"></i>
        <h3 id="congratsText" >Great !<br> You're almost there </h3>`;
        congratsText.innerHTML = scoreTag;
    }
    else if (lastScore >= 2) { // if user scored more than 2
        let scoreTag = `<i class="fas fa-bullseye"></i>
        <h3 id="congratsText" class="text-center"> Hey,<br> you're gaining <br> some muscles !</h3>`;
        congratsText.innerHTML = scoreTag;
    }
    else { // if user scored 1 or less
        let scoreTag = `<i class="fas fa-seedling"></i>
        <h3 id="congratsText" class="text-center"> Let's keep practicing,<br> shall we ? </h3>`;
        congratsText.innerHTML = scoreTag;
    }
}

showResult();