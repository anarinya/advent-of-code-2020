import { txtToArray } from './utils';

type FlightOutput = {
  moveCount: number;
  dataLength: number;
  treeCount: number;
};

const flightPath = (data: string[], right: number, down: number): FlightOutput => {
  let posY: number = 0, posX: number = 0;
  let rowEnd: number = data[0].length;
  let treeCount: number = 0, moveCount: number = 0;

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

const data: string[] = txtToArray('./data/data3.txt');
const flights: { [key: string]: FlightOutput } = {
  f1: flightPath(data, 1, 1),
  f2: flightPath(data, 3, 1),
  f3: flightPath(data, 5, 1),
  f4: flightPath(data, 7, 1),
  f5: flightPath(data, 1, 2)
};

const flightSummary: number = Object.keys(flights)
  .reduce((acc, flight): number => acc *= flights[flight].treeCount, 1);

console.log(flightSummary);