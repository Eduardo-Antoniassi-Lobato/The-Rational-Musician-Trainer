const tonScores = JSON.parse(localStorage.getItem('tonScores')) || [];
const modScores = JSON.parse(localStorage.getItem('modScores')) || [];
const degScores = JSON.parse(localStorage.getItem('degScores')) || [];
const intScores = JSON.parse(localStorage.getItem('intScores')) || [];

function renderScores(difArray, score, idTable) {
    difArray.push(score)
    difArray.splice(1);
    idTable.innerText = difArray[0].score;
}

// function entriesModuleScores(scoresArray, score, stringMod) {
//     scoresArray.map(score => {
//         if (score.mod == stringMod && score.dif == 'Easy') {
//             renderScores(easyTon, score, tonEasy);
//         } else if (score.mod == stringMod && score.dif == 'Medium') {
//             renderScores(medTon, score, tonMed);
//         } else {
//             renderScores(hardTon, score, tonHard);
//         }
//     });
// };

// entriesModuleScores(tonScores, score, "'tonalities'");

//tonalities
const tonEasy = document.getElementById('tonEasy');
const tonMed = document.getElementById('tonMed');
const tonHard = document.getElementById('tonHard');
let easyTon = [];
let medTon = [];
let hardTon = [];

tonScores.map(score => {
    console.log(score);
    if (score.mod == 'tonalities' && score.dif == 'Easy') {
        renderScores(easyTon, score, tonEasy);
    } else if (score.mod == 'tonalities' && score.dif == 'Medium') {
        renderScores(medTon, score, tonMed);
    } else {
        renderScores(hardTon, score, tonHard);
    }
});

// Modes
const modEasy = document.getElementById('modEasy');
const modMed = document.getElementById('modMed');
const modHard = document.getElementById('modHard');
let easyMod = [];
let medMod = [];
let hardMod = [];

modScores.map(score => {
    if (score.mod == 'modes' && score.dif == 'Easy') {
        renderScores(easyMod, score, modEasy);
    } else if (score.mod == 'modes' && score.dif == 'Medium') {
        renderScores(medMod, score, modMed);
    } else {
        renderScores(hardMod, score, modHard);
    }
});

// Degrees
const degEasy = document.getElementById('degEasy');
const degMed = document.getElementById('degMed');
const degHard = document.getElementById('degHard');

let easyDeg = [];
let medDeg = [];
let hardDeg = [];

degScores.map(score => {
    if (score.mod == 'degrees' && score.dif == 'Easy') {
        renderScores(easyDeg, score, degEasy);
    } else if (score.mod == 'degrees' && score.dif == 'Medium') {
        renderScores(medDeg, score, degMed);
    } else {
        renderScores(hardDeg, score, degHard);
    }
});

// Intervals
const intEasy = document.getElementById('intEasy');
const intMed = document.getElementById('intMed');
const intHard = document.getElementById('intHard');

let easyInt = [];
let medInt = [];
let hardInt = [];

intScores.map(score => {
    if (score.mod == 'intervals' && score.dif == 'Easy') {
        renderScores(easyInt, score, intEasy);
    } else if (score.mod == 'intervals' && score.dif == 'Medium') {
        renderScores(medInt, score, intMed);
    } else {
        renderScores(hardInt, score, intHard);
    }
});