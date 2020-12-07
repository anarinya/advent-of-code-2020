const fs = require('fs');
const file = (__dirname + '/data6.txt');

const data = fs.readFileSync(file).toString().split('\n\n')

// Per group, how many unique questions did anyone answer 'yes' to?
// Add the total from each group together
const anySum = (data) => {
  return data
    .map(record => record.replace(/[\s]/g, '').split(''))
    .reduce((acc, group) => acc + new Set(group).size, 0);
};

// Per group, how many unique questions did ALL members answer 'yes' to?
// Add the total from each group together
const allSum = (data) => {
  return data
    .map(group => group.split('\n'))
    .reduce((acc, group) => {
      const counts = group.join('').split('').reduce((acc, chr) => {
        acc[chr] ? acc[chr]++ : acc[chr] = 1;
        return acc;
      }, {});

      const sum = Object.keys(counts)
        .reduce((acc, chr) => counts[chr] === group.length ? ++acc : acc, 0);
        
      return acc + sum;
    }, 0);
};

console.log(anySum(data));
console.log(allSum(data))