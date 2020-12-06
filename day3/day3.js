const fs = require('fs');

const flightPath = (data, right, down) => {
  let posY = 0, posX = 0;
  let rowEnd = data[0].length;
  let treeCount = 0, moveCount = 0;

  for (posY = down, posX = right; posY < data.length; posY += down, posX += right) {
    if (posX >= rowEnd) posX -= rowEnd;
    if (data[posY][posX] === '#') treeCount++;
    moveCount++;
  }
  return {
    moveCount,
    dataLength: data.length,
    treeCount
  };
}

const data = fs.readFileSync('data3.txt').toString().split('\n');
const flights = {
  f1: flightPath(data, 1, 1),
  f2: flightPath(data, 3, 1),
  f3: flightPath(data, 5, 1),
  f4: flightPath(data, 7, 1),
  f5: flightPath(data, 1, 2)
};

const flightSummary = Object.keys(flights)
  .reduce((acc, flight) => acc *= flights[flight].treeCount, 1);

console.log(flightPath(data, 3, 1));
console.log(flightSummary);