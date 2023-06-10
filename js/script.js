const guessedLettersElement = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesParagraph = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia" //test word before API setup
let guessedLetters = []; //array to contain all guessed letters
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await res.text();
    console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

const placeholder = function (realWord) {
    const placeholderLetters = [] //holds individual letters of the word in an array
    for (const letter of realWord) { //for each letter of the word
        console.log(letter);
        placeholderLetters.push("●"); //a symbol is displayed for each letter in the empty array
    };
    wordInProgress.innerText = placeholderLetters.join(""); //all the symbols are displayed as a string
};

placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault(); //prevents reloding of page
    guessMessage.innerText = ""; //clear message field

    const guess = letterInput.value;
    //console.log(guess);
    const goodInput = validateInput(guess);
    console.log(goodInput);
    if (goodInput) {
        makeGuess(goodInput);
    };

    letterInput.value = ""; //clear input field
});

const validateInput = function (letterInput) {
    //regular expression to ensure the input is a letter
    const acceptedLetter = /[a-zA-Z]/;
    if (letterInput.length === 0) {
        guessMessage.innerText = "Please enter a letter.";
    } else if (letterInput.length > 1) {
        guessMessage.innerText = "Please enter one letter at a time.";
    } else if (!letterInput.match(acceptedLetter)) {
        guessMessage.innerText = "Please enter a letter from A-Z only.";
    } else {
        return letterInput;
    };
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) { //not other way around because 'guess' is a strin and 'guessedLetters' is an array
        guessMessage.innerText = "You have already guessed this letter. Try again.";
    } else {
        guessedLetters.push(guess); //add letter to array
        console.log(guessedLetters);
        countRemainingGuesses(guess);
        guessedLettersDisplay();
        updateWordProgress(guessedLetters);
    };
};

const guessedLettersDisplay = function () {
    guessedLettersElement.innerHTML = "";
    for (letter of guessedLetters) {
        const listItem = document.createElement("li");
        listItem.innerText = letter;
        guessedLettersElement.append(listItem);
    };
};

const updateWordProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split(""); //splits word string into array of letters
    console.log(wordArray);
    const revealWord = []
    //if the guessedLetters include a letter that is in the solution word array, add it to the revealWord array, if not, add a dot symbol in the revealWord array
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase())
        } else {
            revealWord.push("●");
        };
    };
    wordInProgress.innerText = revealWord.join(""); //display the revealWord array as it loops through and updates after each guess
    checkWin();
};


const countRemainingGuesses = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        guessMessage.innerText = `The word doesn't contain a ${guess}. Try again!`;
        remainingGuesses -= 1;
    } else {
        guessMessage.innerText = `Good guess! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        guessMessage.innerHTML = `Sorry, you have no more guesses. The word was <span class=highlight>${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `1 guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        guessMessage.classList.add("win");
        guessMessage.innerHTML = `<p class="highlight">You guessed the word correctly! Congrats!</p>`;
    };
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesParagraph.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    //consider order of code lines
    guessMessage.classList.remove("win");
    remainingGuesses = 8;
    guessedLetters = [];
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessMessage.innerText = ""; //specify what
    guessedLettersElement.innerHTML = ""; //specify what
    getWord();
    guessButton.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});

