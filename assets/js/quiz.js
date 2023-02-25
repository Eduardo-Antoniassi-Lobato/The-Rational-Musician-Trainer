const question = document.getElementById('question');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

const correctAnswer = 1;
const numQuestions = 8;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let choices = [];
let questions = [];

window.onload = () => {
    choices = Array.from(document.getElementsByClassName('choice-text'));
    choices.forEach((choice) => {
        choice.addEventListener('click', (e) => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset['number'];

            const classToApply =
                selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === 'correct') {
                incrementScore(correctAnswer);
            }

            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        });
    });

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (params.q) {
        getModuleQuestions(params.q);
    } else {
        alert('no questions found!');
    }
}

const getModuleQuestions = (url) => {
    fetch(`./assets/js/${url}.json`)
        .then((res) => {
            return res.json();
        })
        .then((loadedQuestions) => {
            questions = loadedQuestions;
            startGame();
        })
        .catch((err) => {
            alert('no questions found!')
            console.error(err);
        });
}

const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    startTimerLine();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= numQuestions) {
        return window.location.assign('/congrats.html');
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${numQuestions}`;

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

const incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
};

const startTimerLine = () => {
    const progressBarFull = document.getElementById('progressBarFull');
    const progressBar = document.querySelector('.time_line');
    let audio = new Audio('./assets/sounds/metronome.wav');

    let getDif = localStorage.getItem('difficulty');
    if (getDif == 'Easy') {
        difTime = 22
    } else if (getDif == 'Medium') {
        difTime = 15
    } else {
        difTime = 8
    }
    let interval = difTime;


    let countDown = setInterval(() => {
        interval--;

        let progressWidth = interval / difTime * 100;

        if (interval > 0) {
            progressBar.style.width = progressWidth + '%'
            audio.play();
        } else {
            clearInterval(countDown)
            progressBar.style.width = "0%";
            localStorage.setItem('lastScore', score);
            window.location.assign('/congrats.html');
        }
    }, 1000);
};