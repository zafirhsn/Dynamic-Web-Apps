
function Hangman() {
  this.word = (Hangman.prototype.wordBank[Math.floor(Math.random() * Hangman.prototype.wordBank.length)]).split("");
  this.guess = [],
  this.wordSoFar = [],
  this.mulFlag = false,
  this.numGuess = 0
}
Hangman.prototype.wordBank = ['baseball', 'dictionary', 'combination', 'lavender', 'strawberry', 'watermelon', 'manhattan', 'transportation', 'capital', 'computer', 'science', 'digital', 'minute', 'second', 'planet', 'system'];
Hangman.prototype.lost = "=====||\n  |  ||\n  O  ||\n \\|/ ||\n  |  ||\n / \\ ||\n=====||";

Hangman.prototype.guessLetter = function(letter) {
  // User input validation, did they really put a single character?
  if (typeof letter !== 'string' || letter.length !== 1) {
    console.log('You did not enter the correct input');
    return;
  }
  //Did the user already guess this letter before?
  for (var i = 0; i < this.guess.length; i++) {
    if (letter === this.guess[i]) {
      console.log("You already guessed that letter");
      return;
    }
  }
  //Now we know the user didn't guess the same letter twice, let's see if their guess is actually in the word
  for (var i = 0; i < this.word.length; i++) {
    // if their guess is in the word, let's change mulFlag so we know we got a match, and lets update how much of the word they've guessed so far
    if (letter === this.word[i]) {
      this.mulFlag = true;
      this.wordSoFar[i] = this.word[i];
    }
    else {
      // if we come across empty space while we iterate through, let's put a dash there because it's a letter that the user hasn't guessed yet. 
      if (typeof this.wordSoFar[i] !== 'string') {
        this.wordSoFar[i] = '_';
      }
    }
  }
  this.guess.push(letter);
  // If mulFlag is false, we know that the user didn't guess correctly, we'll let them know and update the hangman's lives
  if (!this.mulFlag) {
    console.log("Nope");
    this.numGuess++;
  }
  // Otherwise, the user did guess a correct letter, let's reset mulFlag for the next guess
  else {
    this.mulFlag = false;
    console.log('You guessed correct!');
  }
  // Let's print out their guesses and the word they guessed so far
  console.log('\nGuesses: ' + this.guess.join(','));
  console.log("\nWord: " + this.wordSoFar.join(' '));
  if (this.wordSoFar.join() === this.word.join()) {
    console.log('\nYou won!');
  }
  if (this.numGuess === 8) {
    console.log(Hangman.prototype.lost);
    console.log('\nYou lost');
    return;
  }
}
