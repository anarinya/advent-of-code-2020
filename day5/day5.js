const fs = require('fs');

const genId = (seat) => {
  const ref = { F: 0, B: 1, L: 0, R: 1 };
  const binary = seat.split('').map(chr => ref[chr]).join('');
  return parseInt(binary, 2);
};

const part1MaxSeatId = (data) => {
  const seatIds = data.map(seat => genId(seat));
  return Math.max(...seatIds);
};

const part2MySeatId = (data) => {
  const seatIds = data.map(seat => genId(seat));
  const dict = seatIds.reduce((acc, seat) => (acc[seat] = seat, acc), {});
  const maxSeatId = Math.max(...seatIds);
  
  return Array.from(Array(maxSeatId).keys())
    .filter(key => dict[key-1] && dict[key+1] && !dict[key]);
};

const data = fs.readFileSync('data5.txt').toString().split('\n');

console.log(part1MaxSeatId(data));
console.log(part2MySeatId(data));