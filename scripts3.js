// Define the questions with options and GIFs for right and wrong answers
const lostQuestions = [];

const questions = [
    {
        question: "Question 1: Do you Love me more than anything?",
        options: ["Yes", "No"],
        correctIndex: 0,
        gifCorrect: "correct1.gif",
        gifWrong: "wrong.gif"
    },
    {
        question: "Question 2: Will you be mine forever?",
        options: ["Forever", "Never"],
        correctIndex: 0,
        gifCorrect: "correct2.gif",
        gifWrong: "wrong.gif"
    },
    {
        question: "Question 3: Promise me that you will never hide your sorrows from me?",
        options: ["Promise", "No"],
        correctIndex: 0,
        gifCorrect: "correct3.gif",
        gifWrong: "wrong.gif"
    },
    {
        question: "Question 4: Do you want any change in me?",
        options: ["Yes", "No"],
        correctIndex: 0,
        gifCorrect: "correct4.gif",
        gifWrong: "wrong.gif"
    },
    {
        question: "Question 5: I need you in my happiness and sadness. DO YOU?",
        options: ["No", "Yes"],
        correctIndex: 1,
        gifCorrect: "correct5.gif",
        gifWrong: "wrong.gif"
    }
];

let currentQuestion = 0;  // Keep track of which question we are on

const questionContainer = document.getElementById("questionContainer");
const resultContainer = document.getElementById("resultContainer");
const resultGif = document.getElementById("resultGif");
const resultMessage = document.getElementById("resultMessage");

// Load the current question and set up event listeners for the answers
function loadQuestion() {
    questionContainer.style.display = "block";
    resultContainer.style.display = "none";
    
    document.getElementById("question").textContent = questions[currentQuestion].question;
    
    document.querySelectorAll(".answer").forEach((button, index) => {
        button.textContent = questions[currentQuestion].options[index];
        button.dataset.correct = (index === questions[currentQuestion].correctIndex).toString();
    });
}

// Handle what happens when the wrong answer is clicked
function showWrong() {
    lostQuestions.push(currentQuestion);  // Store the current question index
    resultGif.src = questions[currentQuestion].gifWrong;
    resultMessage.textContent = "You lost! Try again...";

    // Clear any previous click listeners on the result GIF to avoid stacking multiple listeners
    resultGif.removeEventListener("click", nextQuestion);

    questionContainer.style.display = "none";
    resultContainer.style.display = "block";

    // Show the same question again after a short delay
    setTimeout(() => {
        questionContainer.style.display = "block";
        resultContainer.style.display = "none";
    }, 2000); // Wait for 2 seconds before showing the question again
}

// Handle what happens when the correct answer is clicked
function showCorrect() {
    resultGif.src = questions[currentQuestion].gifCorrect;
    resultMessage.textContent = "Great! Move to the next stage by clicking the IMAGE.";
    
    // Clear any previous click listeners on the result GIF to avoid stacking multiple listeners
    resultGif.removeEventListener("click", nextQuestion);
    
    // Add event listener for clicking the GIF to load the next question
    resultGif.addEventListener("click", nextQuestion);

    questionContainer.style.display = "none";
    resultContainer.style.display = "block";
}

// Move to the next question or finish the game
function nextQuestion() {
    currentQuestion++;  // Move to the next question
    
    if (currentQuestion < questions.length) {
        // Load the next question if there are any left
        loadQuestion();
    } else {
        // All questions answered, show the results
        showResults();  // Call a function to show the results
    }
}


// Show results function
function showResults() {
    // Save lost questions and count to local storage
    localStorage.setItem("lostQuestions", JSON.stringify(lostQuestions));
    localStorage.setItem("lostCount", lostQuestions.length);

    // Redirect to the success page
    window.location.href = "success.html";  // Redirect to a success page or wherever you want
}


// Set up the click listeners for the answers
document.querySelectorAll(".answer").forEach(button => {
    button.addEventListener("click", function () {
        const correct = this.dataset.correct === "true";
        if (correct) {
            showCorrect();
        } else {
            showWrong();
        }
    });
});

// Load the first question when the page is ready
loadQuestion();
