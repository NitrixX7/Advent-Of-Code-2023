const fs = require('fs');

function possibleGames(input) {
  const totalRed = 12;
  const totalGreen = 13;
  const totalBlue = 14;

  let possibleGamesSum = 0;

  input.forEach((game, index) => {
    let redCount = 0;
    let greenCount = 0;
    let blueCount = 0;
    let isGamePossible = true;

    game.forEach((subset) => {
      const cubes = subset.split(',');
      cubes.forEach((cube) => {
        const [quantity, color] = cube.trim().split(' ');
        const colorLowerCase = color.toLowerCase();
        const parsedQuantity = parseInt(quantity, 10);

        if (colorLowerCase === 'red' && parsedQuantity > redCount) {
          redCount = parsedQuantity;
        } else if (colorLowerCase === 'green' && parsedQuantity > greenCount) {
          greenCount = parsedQuantity;
        } else if (colorLowerCase === 'blue' && parsedQuantity > blueCount) {
          blueCount = parsedQuantity;
        }
      });

      if (redCount > totalRed || greenCount > totalGreen || blueCount > totalBlue) {
        isGamePossible = false;
        return;
      }
    });

    if (isGamePossible) {
      possibleGamesSum += index + 1;
    }
  });

  return possibleGamesSum;
}

fs.readFile('textFile.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  const games = data.split('\n').map(line => line.replace(/^Game \d+: /, '').split(';').map(subset => subset.trim()));

  const result = possibleGames(games);

  console.log('This is the Sum of the possible game numbers: ', result);
  return result;
});
