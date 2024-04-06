document.addEventListener("DOMContentLoaded", function() {
    const quizContainer = document.getElementById("quiz-container");
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit-btn");
    const resultElement = document.getElementById("result");
    const highScoreElement = document.getElementById("high-score");

    let score = 0;
    let selectedAnswer = null;

    const questions = [
        { question: "What is SpongeBob's boss's name?", options: ["Mr. Krabs", "Squidward", "Patrick", "Plankton"], answer: "Mr. Krabs" },
        { question: "What is SpongeBob's pet snail's name?", options: ["Gary", "Larry", "Jerry", "Barry"], answer: "Gary" },
        { question: "Who lives in a pineapple under the sea?", options: ["SpongeBob", "Patrick", "Squidward", "Sandy"], answer: "SpongeBob" },
        { question: "What instrument does Squidward play?", options: ["Clarinet", "Guitar", "Piano", "Drums"], answer: "Clarinet" },
        { question: "What is the name of SpongeBob's best friend?", options: ["Patrick", "Squidward", "Mr. Krabs", "Plankton"], answer: "Patrick" },
        { question: "What is the name of the restaurant where SpongeBob works?", options: ["The Krusty Krab", "The Chum Bucket", "The Salty Spitoon", "Weenie Hut Jr's"], answer: "The Krusty Krab" },
        { question: "Who is SpongeBob's arch-nemesis?", options: ["Plankton", "Mr. Krabs", "Squidward", "Patrick"], answer: "Plankton" },
        { question: "What is SpongeBob's favorite hobby?", options: ["Jellyfishing", "Karate", "Reading", "Cooking"], answer: "Jellyfishing" },
        { question: "What is the name of Sandy's pet caterpillar?", options: ["Wormy", "Slimy", "Fuzzy", "Squiggly"], answer: "Wormy" },
        { question: "What is the name of SpongeBob's driving school teacher?", options: ["Mrs. Puff", "Mrs. Krab", "Mrs. Tentacles", "Mrs. Plankton"], answer: "Mrs. Puff" },
        { question: "What is the name of Squidward's rival artist?", options: ["SpongeBob", "Patrick", "DoodleBob", "Sandy"], answer: "DoodleBob" }
    ];

    // Display quiz question
    function displayQuestion(index) {
        const question = questions[index];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = "";
        question.options.forEach(function(option, i) {
            const optionElement = document.createElement("div");
            optionElement.textContent = `${i + 1}. ${option}`;
            optionElement.classList.add("option");
            optionElement.addEventListener("click", function() {
                selectAnswer(option, optionElement);
            });
            optionsElement.appendChild(optionElement);
        });
    }

    function selectAnswer(option, optionElement) {
        const options = optionsElement.getElementsByClassName("option");
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove("selected");
        }
        optionElement.classList.add("selected");
        selectedAnswer = option;
    }

    // Check user's answer
    function checkAnswer() {
        const currentQuestion = questions[0];
        if (selectedAnswer === currentQuestion.answer) {
            resultElement.textContent = "Correct!";
            score++;
        } else {
            resultElement.textContent = `Wrong! The correct answer is ${currentQuestion.answer}.`;
        }
        displayNextQuestion();
    }

    function displayNextQuestion() {
        if (questions.length > 0) {
            questions.shift();
            if (questions.length > 0) {
                displayQuestion(0);
            } else {
                showScore();
            }
        }
    }

    function showScore() {
        quizContainer.style.display = "none";
        resultElement.textContent = `Quiz ended! Your final score is ${score}.`;
        updateHighScore(score);
    }

    // Update high score
    function updateHighScore(score) {
        let highScore = localStorage.getItem("highScore");
        if (!highScore || score > highScore) {
            localStorage.setItem("highScore", score);
            highScoreElement.textContent = score;
        }
    }

    // Display high score
    function displayHighScore() {
        const highScore = localStorage.getItem("highScore");
        if (highScore) {
            highScoreElement.textContent = highScore;
        }
    }

    submitButton.addEventListener("click", function() {
        if (selectedAnswer !== null) {
            checkAnswer();
            selectedAnswer = null;
        } else {
            resultElement.textContent = "Please select an answer.";
        }
    });

    // Initialize quiz
    displayQuestion(0);
    displayHighScore();
});
