// all class select
const inputs = document.querySelector(".inputs");
const hintTag = document.querySelector(".hint span");
const guessLeft = document.querySelector(".guess-left span");
const wrongLetter = document.querySelector(".wrong-letter span");
const resetBtn = document.querySelector(".reset-btn");
const typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = []; 
//function for random word generating
function randomWord() {
    document.body.style.backgroundImage = "none";
    let randomItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = randomItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6; //maximum guess can be given 
    correctLetters = []; 
    incorrectLetters = [];
    hintTag.innerText = randomItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();
// checking for input
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if (key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";
    setTimeout(() => {
        if (correctLetters.length === word.length) {
            startConfetti();
            document.querySelector(".congrats").innerText="Congratulations You Won !"
        } else if (maxGuesses < 1) {
            document.querySelector(".congrats").innerText="Game over! No remaining guesses";
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

//random color generate
function genetrateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const randomColors = `rgb(${red},${green},${blue})`
    return randomColors;
}

// applying event handler
resetBtn.addEventListener("click", () => {
    const randomColor = genetrateRandomColor();
    document.body.style.backgroundColor = randomColor;
    document.querySelector(".congrats").innerText="";
    stopConfetti();
});
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());