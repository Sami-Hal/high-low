const buttons = document.querySelectorAll('[data-time]');
const submit = document.querySelector('input');
const attempts = document.querySelector('#attempts');
const guesses = document.querySelector('.previousGuesses').lastElementChild
const message = document.querySelectorAll('h2')[1]
let number;
let attempt = 10;
let guess;
let previousAttempt = 10;

function pickNumber(){
    number = Math.round(Math.random() * (100 - 1) + 1)
}
function checkForValid(e){
    if(e < 1 || e > 100){
        message.innerHTML = "Invalid number";
        return;
    } else if ( attempt === 10 && guesses.innerHTML.length > 0 ) {
        guesses.innerHTML = "";
        numberCheck(e);
    }
    else {
        numberCheck(e);
    }
}
function tester(){
    (attempt === previousAttempt) ? guesses.innerHTML = "" : "";
    guesses.innerHTML.length === 0 ? guesses.innerHTML += guess : guesses.innerHTML += ", " + guess
    previousAttempt > 5 ? attempts.innerHTML = 11 - attempt : attempts.innerHTML = 6 - attempt;
}
function numberCheck(e){
    let i = 0
    if(e == number && i < attempt){
        tester();
        attempt--;
        pickNumber();
        attempt = previousAttempt;
        return message.innerHTML = "Congratulations!!! You found the correct number!<br />Your random number and attempts have been reset.";
    } else if(e > number && i < attempt){
        tester();
        attempt--;
        return message.innerHTML = "Your guess is too high";
    } else if(e < number && i < attempt){
        tester();
        attempt--;
        return message.innerHTML = "Your guess is too low";
    } else if(attempt === 0){
        message.innerHTML = `You are out of attempts, the correct number was ${number}.<br />Your random number and attempts have been reset.`
        attempt = previousAttempt;
        return pickNumber();
    }
}
function setAttempts(){
    attempt = parseInt(this.dataset.time);
    previousAttempt = attempt;
    message.innerHTML = "Your random number and attempts have been reset.";
    guesses.innerHTML = "";
    attempts.innerHTML = "";
    pickNumber();
}

document.myForm.addEventListener('submit', function(e) {
    e.preventDefault();
    guess = this.numbers.value;
    checkForValid(guess);
    this.reset();
})

buttons.forEach(button => button.addEventListener('click', setAttempts))