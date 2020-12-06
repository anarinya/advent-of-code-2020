const fs = require('fs');

const validCountPolicy1 = (data) => {
  return data.reduce((sum, entry) => {
    const [policy, letter, pass] = entry.split(' ');
    const [min, max] = policy.split('-').map(n => Number(n));
    const check = letter.slice(0, 1);
    const checkCount = pass.split('').reduce((acc, chr) => chr === check ? ++acc : acc, 0);

    return (checkCount >= min && checkCount <= max) ? ++sum : sum;
  }, 0);
};

const validCountPolicy2 = (data) => {
  return data.reduce((sum, entry) => {
    const [policy, letter, pass] = entry.split(' ');
    const [pos1, pos2] = policy.split('-').map(n => Number(n) - 1);
    const check = letter.slice(0, 1);
    const pos1Check = pass.charAt(pos1) === check;
    const pos2Check = pass.charAt(pos2) === check;

    if (pos1Check && !pos2Check || !pos1Check && pos2Check) sum++;
    return sum;
  }, 0);
};

const data = fs.readFileSync('data2.txt').toString().split('\n');

console.log(validCountPolicy1(data));
console.log(validCountPolicy2(data));