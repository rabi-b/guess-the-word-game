const guessedLetters = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector("input");
const wordInProgress = document.querySelector(".word-in-progress");
const remainGuessesParagraph = document.querySelector(".remaining");
const remainGuessesSpan = document.querySelector(".remaingin span");
const guessMessage = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = ["m", "a", "g", "n", "o", "l", "i", "a"]//test word before API setup

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = ""; //clear input field
});


