const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

const question = document.querySelector(".question");
const answers = document.querySelectorAll(".list-group-item");

const currentQuestionWrapper = document.querySelector(".current-question");

const quiz = document.querySelector(".list");
const result = document.querySelector(".results");
const average = document.querySelector(".average");
const userScorePoint = document.querySelector(".userScorePoint");

const pointsElem = document.querySelector(".score");
const restart = document.querySelector(".restart");

let index = 0;
let points = 0;
let userAnswers = [];

async function fetchData() {
    try {
        const data = await fetch("https://quiztai.herokuapp.com/api/quiz");
        return await data.json();
    } catch (error) {
        console.log(error);
    }
}

(async () => {
    const preQuestions = await fetchData();

    function setCurrentQuestionNumber(number) {
        currentQuestionWrapper.innerHTML = `${++number}/${preQuestions.length}`;
    }

    function getPreviousAnswer(index) {
        answers.forEach(item => {
            item.classList.remove("correct", "incorrect");
        });

        const question = preQuestions[index];
        const correctAnswerIndex = question.answers.indexOf(
            question.correct_answer
        );
        markCorrect(answers[correctAnswerIndex]);

        if (question.correct_answer !== userAnswers[index]) {
            const incorrectUserAnswer = question.answers.indexOf(userAnswers[index]);
            markIncorrect(answers[incorrectUserAnswer]);
        }
        disableAnswers();
    }

    function setQuestion(index) {
        next.disabled = true;
        if (index < userAnswers.length) {
            getPreviousAnswer(index);
            next.disabled = false;
        }
        setCurrentQuestionNumber(index);
        question.innerHTML = preQuestions[index].question;

        answers.forEach((item, indexNumber) => {
            item.innerHTML = preQuestions[index].answers[indexNumber];
            item.innerHTML === "undefined"
                ? (item.style.display = "none")
                : (item.style.display = "block");
        });
    }

    function activateAnswers() {
        answers.forEach(item => {
            item.addEventListener("click", doAction);
            item.classList.remove("correct", "incorrect");
        });
    }

    function saveToLocalStorage(currentResult) {
        if (localStorage.getItem("score") && localStorage.getItem("gamesPlayed")) {
            localStorage.setItem(
                "score",
                parseInt(localStorage.getItem("score")) + currentResult
            );
            localStorage.setItem(
                "gamesPlayed",
                parseInt(localStorage.getItem("gamesPlayed")) + 1
            );
        } else {
            localStorage.setItem("score", currentResult);
            localStorage.setItem("gamesPlayed", "1");
        }
    }

    function getAverage() {
        return (
            parseInt(localStorage.getItem("score")) /
            parseInt(localStorage.getItem("gamesPlayed"))
        );
    }

    function disableAnswers() {
        answers.forEach(item => {
            item.removeEventListener("click", doAction);
        });
    }

    function quizEnd(points) {
        saveToLocalStorage(points);
        quiz.style.display = "none";
        result.style.display = "block";
        userScorePoint.innerHTML = points;
        average.innerHTML = getAverage();
    }

    function markCorrect(elem) {
        elem.classList.add("correct");
    }

    function markIncorrect(elem) {
        elem.classList.add("incorrect");
    }

    function doAction(event) {
        userAnswers.push(event.target.innerHTML);

        if (event.target.innerHTML === preQuestions[index].correct_answer) {
            points++;
            markCorrect(event.target);
            pointsElem.innerText = points;
        } else {
            markIncorrect(event.target);
        }
        disableAnswers();
        next.disabled = false;
    }

    /* --- */

    setQuestion(0);
    activateAnswers();

    next.addEventListener("click", function() {
        index++;
        if (index >= preQuestions.length) {
            quizEnd(points);
        } else {
            activateAnswers();
            setQuestion(index);
        }
    });

    previous.addEventListener("click", function() {
        if (index !== 0) {
            index--;
            setQuestion(index);
            disableAnswers();
        }
    });

    restart.addEventListener("click", function(event) {
        event.preventDefault();

        index = 0;
        points = 0;
        userAnswers = [];
        userScorePoint.innerHTML = points;
        activateAnswers();
        setQuestion(0);
        pointsElem.innerText = 0;
        quiz.style.display = "block";
        result.style.display = "none";
    });
})();