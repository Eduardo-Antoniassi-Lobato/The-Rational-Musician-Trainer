const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

let buttons = document.querySelector('.button');
const divs = document.querySelectorAll('div');






let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];





 fetch('./assets/js/module1.json')
     .then((res) => {
         return res.json();
     })
     .then((loadedQuestions) => {
         questions = loadedQuestions;
         startGame();
     })
     .catch((err) => {
         console.error(err);
     });


//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    startTimerLine();
};



getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/congrats.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

function startTimerLine() {
    let progressBarFull = document.getElementById('progressBarFull');
    let progressBar = document.querySelector('.time_line');
    let interval = 15;

    let countDown = setInterval(() => {
        interval--;

        let progressWidth = interval / 15 * 100;

        if (interval > 0) {
            progressBar.style.width = progressWidth + '%'

        } else {
            clearInterval(countDown)
            progressBar.style.width = "0%";
            window.location.assign('/congrats.html');
        }
    }, 1000);
}


