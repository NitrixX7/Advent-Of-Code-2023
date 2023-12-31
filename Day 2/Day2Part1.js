const fs = require('fs');

function parseCubes(subset) {
  return subset.split(',').map(cube => {
    const [quantity, color] = cube.trim().split(' ');
    return { quantity: parseInt(quantity, 10), color: color.toLowerCase() };
  });
}

function calculateMaxQuantities(game) {
  return game.reduce((maxQuantities, subset) => {
    const cubes = parseCubes(subset);
    cubes.forEach(({ quantity, color }) => {
      maxQuantities[color] = Math.max(maxQuantities[color], quantity);
    });
    return maxQuantities;
  }, { red: 0, green: 0, blue: 0 });
}

function isGamePossible(maxQuantities, totalRed, totalGreen, totalBlue) {
  return maxQuantities.red <= totalRed && maxQuantities.green <= totalGreen && maxQuantities.blue <= totalBlue;
}

function calculatePossibleGamesSum(games, totalRed, totalGreen, totalBlue) {
  return games.reduce((possibleGamesSum, game, index) => {
    const maxQuantities = calculateMaxQuantities(game);
    if (isGamePossible(maxQuantities, totalRed, totalGreen, totalBlue)) {
      possibleGamesSum += index + 1;
    }
    return possibleGamesSum;
  }, 0);
}

function readAndProcessFile(filePath, totalRed, totalGreen, totalBlue) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const games = data.split('\n').map(line => line.replace(/^Game \d+: /, '').split(';').map(subset => subset.trim()));
    const result = calculatePossibleGamesSum(games, totalRed, totalGreen, totalBlue);

    console.log('This is the Sum of the possible game numbers: ', result);
    return result;
  });
}

const totalRed = 12;
const totalGreen = 13;
const totalBlue = 14;

readAndProcessFile('textFile.txt', totalRed, totalGreen, totalBlue);
