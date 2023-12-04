const fs = require('fs');

function convertToDigits(inputString) {
    let currentNumbers = '';
    let currentWord = '';
    const numberMap = {
        'one': '1',
        'two': '2',
        'three': '3',
        'four': '4',
        'five': '5',
        'six': '6',
        'seven': '7',
        'eight': '8',
        'nine': '9',
        'zero': '0',
    };

    for (let i = 0; i < inputString.length; i++) {
        const currentChar = inputString[i];
        currentWord += currentChar;

        let foundNumber = Object.keys(numberMap).find(key => currentWord.endsWith(key));
        if (foundNumber) {
            currentNumbers += numberMap[foundNumber];
            currentWord = '';
            i--;
        } else if (!isNaN(currentChar)) {
            currentNumbers += currentChar;
        } else {
            currentWord + currentChar;
        }
    }

    return currentNumbers;
}

function processLine(inputString) {
    const numbers = convertToDigits(inputString).replace(/\D/g, '');

    if (numbers && numbers.length >= 2) {
        const combined = numbers[0] + numbers[numbers.length - 1];
        return parseInt(combined);
    } else if (numbers && numbers.length === 1) {
        return parseInt(numbers[0] + numbers[0]);
    } else {
        return 0;
    }
}

fs.readFile('textFile.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n');

    const sum = lines.reduce((totalSum, line) => {
        const result = processLine(line);
        return totalSum + result;
    }, 0);

    console.log('Sum of the combined first and last digits for each line:', sum);
    return sum;
});
