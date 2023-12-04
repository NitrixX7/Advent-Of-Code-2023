const fs = require('fs');

function processLine(inputString) {
    const numbers = inputString.replace(/\D/g, '');

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
