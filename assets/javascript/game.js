// Global Variables
// --------------------------------------------

//Arrays and Variables
var wordOptions = ['CHICAGO', 'SAN FRANSISCO', 'BOSTON', 'SANTA ANA', 'IRVINE', 'SAN DIEGO', 'SEATTLE', 'PORTLAND', 'NASHVILLE',]
var selectedWord = ""; //hold the chosen word
var lettersInWord = []; //what letters are in word
var numBlanks = 0; //calculate number of blanks in word
var blanksAndSuccesses = []; //holds both the blanks and number of guesses 
var wrongLetters = []; //wrong letters

//Game Counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 10;

//sound
var sound = document.getElementById('sound')

// Functions (Reusable blocks of code)
//----------------------------------------------

//start game //math.floor rounds a number down to whole number //math.random picks a random number from 0-1 in decimal form
function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split(""); //splits the selected word into individual string letters
    numBlanks = lettersInWord.length; //gives you number of blanks on screen

    //reset
    
    guessesLeft = 10; //each new game only 10 guesses
    wrongLetters = []; //number of guess is back to zero
    blanksAndSuccesses = []; // blanks are back to zero

    //populate blanks and successes with right number of blanks using a for loop
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("__"); //push adds an item to the end of an array in this case __
    }

    //change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" "); //.join allows you to put spaces inbetween the blanks otherwise we see commas 
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCount").innerHTML = winCount;
    document.getElementById("lossCount").innerHTML = lossCount;
    document.getElementById("wrongGuesses").innerHTML = " "
    
    //testing/debugging
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
    //step one: check if letter is in the word
    var isLetterInWord = false;
    //step two:letter that we are using matches any letter in word
    for (var i = 0; i < numBlanks; i++) {
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    //check where in word letter exists, then populate out blankAndSuccesses array
    if(isLetterInWord) {
        for (var i = 0; i < numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    //letter wasn't found 
    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    //testing/debugging
    console.log(blanksAndSuccesses);

}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + " | Guesses Left: " + guessesLeft)

    //update html to reflect count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");

    //check if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) { //toString converts a number to a string
        winCount++;
        alert("You Guessed Correctly! The City Was: " + selectedWord);
        playAudio ()
        //update win counter in HTML
        document.getElementById("winCount").innerHTML = winCount;
        
        startGame();
    }

    else if (guessesLeft == 0) {
        lossCount++;
        alert("Sorry, You Failed. Go Find a Globe.");

        //update the html
        document.getElementById("lossCount").innerHTML = lossCount;

        startGame();
    }

}

//Main Process
//------------------------------------------------------- 

//Initiates the code the first time
startGame();

//register keyclicks // onkey up event occurs when the user releases a key on the keyboard
document.onkeyup = function(event) { 
    var lettersGuessed = String.fromCharCode(event.keyCode).toUpperCase(); //fromCharCode converts Unicode values into charcters
    checkLetters(lettersGuessed);
    roundComplete();

    //testting/debugging
    console.log(lettersGuessed)
}