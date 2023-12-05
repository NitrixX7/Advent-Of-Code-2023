const fs = require('fs');

const specialCharRegex = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g;
const digitRegex = /\d/;

function containsSpecialCharacters(str) {
    return specialCharRegex.test(str);
}

function identifyPotentialStartingPoints(schematics) {
    const potentialStartingPoints = [];

    for (let r = 0; r < schematics.length; r++) {
        for (let c = 0; c < schematics[0].length; c++) {
            if (schematics[r][c].match(digitRegex) && hasAdjacentSpecialCharacter(schematics, r, c)) {
                potentialStartingPoints.push({ row: r, col: c });
            }
        }
    }

    return potentialStartingPoints;
}

function hasAdjacentSpecialCharacter(schematics, row, col) {
    const offsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],  // up, down, left, right
        [-1, -1], [-1, 1], [1, -1], [1, 1]  // diagonals
    ];

    for (const [offsetRow, offsetCol] of offsets) {
        const newRow = row + offsetRow;
        const newCol = col + offsetCol;

        if (
            newRow >= 0 &&
            newRow < schematics.length &&
            newCol >= 0 &&
            newCol < schematics[0].length
        ) {
            const value = schematics[newRow][newCol];

            if (containsSpecialCharacters(value)) {
                return true;
            }
        }
    }

    return false;
}

function combineDigits(schematics, row, col, memo) {
    const memoKey = `${row}_${col}`;
    if (memo[memoKey]) {
        return memo[memoKey];
    }

    const currentDigit = schematics[row][col];
    const parts = [currentDigit];
    let firstDigitCoords = [row, col];
    let lastDigitCoords = [row, col];

    for (const direction of [-1, 1]) {
        let newCol = col + direction;

        //checks out of bound
        while (newCol >= 0 && newCol < schematics[0].length && schematics[row][newCol].match(digitRegex)) {
            if (direction === -1) {
                parts.unshift(schematics[row][newCol]); //prepend digit
                firstDigitCoords = [row, newCol];
            } else {
                parts.push(schematics[row][newCol]); //append digit
                lastDigitCoords = [row, newCol];
            }
            newCol += direction;
        }
    }

    const result = {
        combinedDigits: parts.join(''),
        firstDigitCoords,
        lastDigitCoords
    };

    memo[memoKey] = result;
    return result;
}

function sumOfPartNumbers(schematics, potentialStartingPoints) {
    let resultSum = 0;
    const encounteredNumbers = new Set();
    const memo = {};

    for (const { row, col } of potentialStartingPoints) {
        const { combinedDigits, firstDigitCoords, lastDigitCoords } = combineDigits(schematics, row, col, memo);

        const coordsKey = `${firstDigitCoords.join('_')}_${lastDigitCoords.join('_')}`;
        if (!encounteredNumbers.has(coordsKey)) {
            console.log('This is the part number: ', combinedDigits);
            resultSum += Number(combinedDigits);
            encounteredNumbers.add(coordsKey);
        }
    }

    return resultSum;
}

function readAndProcessFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const lines = data.split("\n");
        const mapping = lines.map(line => line.replace(/\r/, '').split(''));

        // Identify potential starting points
        const potentialStartingPoints = identifyPotentialStartingPoints(mapping);

        // Calculate the sum using potential starting points
        const result = sumOfPartNumbers(mapping, potentialStartingPoints);

        console.log('This is the total sum of the parts: ', result);
    });
}

readAndProcessFile('textFile.txt');
