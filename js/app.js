import { dictionary } from './dictionary.js';
let attempts = 6;
let length = 5;
let randomWord = pickRandomWord();
console.log(randomWord);

let board = document.getElementById('board');

document.getElementById('check-btn').addEventListener('click', checkGuess);
document.getElementById('reset-btn').addEventListener('click', reset);

startGame();

function startGame() {
    let table = document.createElement('table');
    let i = attempts;
    board.appendChild(table);
    while (i > 0) {
        let row = document.createElement('tr');
        table.appendChild(row);

        for (let j = 0; j < length; j++) {
            let cell = document.createElement('td');
            row.appendChild(cell);
            row.className = 'word_row';
            row.id = 'row_' + i.toString();
            let input = document.createElement('input');
            cell.appendChild(input);
            input.id = i.toString() + j.toString();
            input.setAttribute('maxlength', 1);
            input.disabled = true;
            input.className = 'user_input';
        }
        activateRow('6');
        i--;
    }
}

function pickRandomWord() {
    let random = Math.floor(Math.random() * dictionary.length);
    let randomWord = dictionary[random];
    return randomWord;
}

function activateRow(row) {
    for (let i = 0; i < length; i++) {
        document.querySelectorAll('#row_' + row + ' input')[i].disabled = false;
    }
}

function getCurrentGuess(attempts) {
    let currentGuess = [];
    for (let i = 0; i < length; i++) {
        currentGuess.push(
            document.getElementById(attempts.toString() + i.toString()).value
        );
    }
    return currentGuess;
}

function checkIfWordIsInDictionary(word) {
    if (dictionary.indexOf(word.join('')) > 0) {
        return true;
    } else {
        return false;
    }
}

function checkGuess() {
    if (attempts > 1) {
        let currentGuess = getCurrentGuess(attempts);
        let checkWord = checkIfWordIsInDictionary(currentGuess);
        if (checkWord === false) {
            alert('No such word in the dictionary');
            for (let q = 0; q < length; q++) {
                document.querySelectorAll('#row_' + attempts + ' input')[
                    q
                ].value = '';
            }
        } else {
            if (currentGuess.join('') === randomWord) {
                alert('Congratulations! You won.');
                reset();
            } else {
                let commonLetters = findCommonLetter(currentGuess);
                colorCell(commonLetters, attempts);
                attempts--;
                activateRow(attempts);
            }
        }
    } else {
        if (attempts === 1) {
            alert('Congratulations! You won.');
        } else {
            gameOver(randomWord);
            reset();
        }
    }
}

function findCommonLetter(currentGuess) {
    let coloredArray = [];
    for (let i = 0; i < currentGuess.length; i++) {
        if (currentGuess[i] === randomWord[i]) {
            coloredArray.push('#3c787e');
        } else if (randomWord.indexOf(currentGuess[i]) >= 0) {
            coloredArray.push('#eddea4');
        } else {
            coloredArray.push('#B5B2C2');
        }
    }
    return coloredArray;
}

function colorCell(coloredArray, attempts) {
    for (let i = 0; i < coloredArray.length; i++) {
        document.getElementById(attempts.toString() + i).style.backgroundColor =
            coloredArray[i];
    }
}

function reset() {
    document.location.reload();
    startGame();
}

function gameOver(word) {
    alert(`Game over. The word was "${word}"`);
    return;
}
