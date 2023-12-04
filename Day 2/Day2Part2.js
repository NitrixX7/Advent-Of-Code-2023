const fs = require('fs');

function parseCubes(subset) {
  return subset.split(',').map(cube => {
    const [quantity, color] = cube.trim().split(' ');
    return { quantity: parseInt(quantity, 10), color: color.toLowerCase() };
  });
}

function findMaxQuantities(game) {
  return game.reduce((maxQuantities, subset) => {
    const cubes = parseCubes(subset);
    cubes.forEach(({ quantity, color }) => {
      maxQuantities[color] = Math.max(maxQuantities[color], quantity);
    });
    return maxQuantities;
  }, { red: 0, green: 0, blue: 0 });
}

function calculateTotal(games) {
  return games.reduce((total, game) => {
    const maxQuantities = findMaxQuantities(game);
    total += maxQuantities.red * maxQuantities.green * maxQuantities.blue;
    return total;
  }, 0);
}

function readAndProcessFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    const games = data.split('\n').map(line => line.replace(/^Game \d+: /, '').split(';').map(subset => subset.trim()));
    const result = calculateTotal(games);

    console.log('This is the Sum of the possible game numbers: ', result);
    return result;
  });
}

readAndProcessFile('textFile.txt');
