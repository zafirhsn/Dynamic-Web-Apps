var word = ['b','a','s','e','b','a','l','l'];
var guess = [];
var wordSoFar = [];
var numGuess = 0;
var mulFlag = false;
var hangman = "=====||\n  |  ||\n  O  ||\n \\|/ ||\n  |  ||\n / \\ ||\n=====||";

function guessLetter(letter) {
  // User input validation, did they really put a single character?
  if (typeof letter !== 'string' || letter.length !== 1) { 
    console.log('You did not enter the correct input');
    return;
  }
  //Did the user already guess this letter before?
  for (var i = 0; i < guess.length; i++) {
    if (letter === guess[i]) {
      console.log("You already guessed that letter");
      return;
    }
  }
  //Now we know the user didn't guess the same letter twice, let's see if their guess is actually in the word
  for (var i = 0; i < word.length; i++) {
    // if their guess is in the word, let's change mulFlag so we know we got a match, and lets update how much of the word they've guessed so far
    if (letter === word[i]) {
        mulFlag = true;
        wordSoFar[i] = word[i];     
    }
    else {
      // if we come across empty space while we iterate through, let's put a dash there because it's a letter that the user hasn't guessed yet. 
      if (typeof wordSoFar[i] !== 'string') {
        wordSoFar[i] = '_';
      }
    }
  }
  guess.push(letter);
  // If mulFlag is false, we know that the user didn't guess correctly, we'll let them know and update the hangman's lives
  if (!mulFlag) {
    console.log("Nope");
    numGuess++;
  }
  // Otherwise, the user did guess a correct letter, let's reset mulFlag for the next guess
  else { 
    mulFlag = false;
    console.log('You guessed correct!');
  }
  // Let's print out their guesses and the word they guessed so far
  console.log('\nGuesses: ' + guess.join(','));
  console.log("\nWord: " + wordSoFar.join(' '));
  if (wordSoFar.join() === word.join()) {
    console.log('\nYou won!');
  }
  if (numGuess === 6) {
    console.log(hangman);
    console.log('\nYou lost');
    return;
  }  
}

