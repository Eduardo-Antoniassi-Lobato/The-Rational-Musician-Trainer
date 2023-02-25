const Buttons = Array.from(document.getElementById('startPage'));
const startButton = document.getElementById('startBtn');

function CheckBtns() {
    const moduleChecked = document.querySelector('input[name="module"]:checked');
    const difChecked = document.querySelector('input[name="difficulty"]:checked');
    localStorage.setItem('module', moduleChecked.value);
    localStorage.setItem('difficulty', difChecked.value);

    Buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            let clickedBtn = e.target;
            if (clickedBtn.name == 'module') {
                localStorage.setItem('module', clickedBtn.value);
            } else if (clickedBtn.name == 'difficulty') {
                localStorage.setItem('difficulty', clickedBtn.value);
            }
        });
    });
}

CheckBtns();

function startQuiz() {
    let module = localStorage.getItem('module');

    window.location.assign(`/quiz.html?q=${module}`);
}