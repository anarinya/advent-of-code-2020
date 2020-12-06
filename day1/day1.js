const fs = require('fs');

const sortLargeToSmallNums = (arr) => arr.sort((a, b) => b - a);
const sortSmallToLargeNums = (arr) => arr.sort((a, b) => a - b);

const matchSum1 = (arr, year) => {
  const sortedDataset1 = sortLargeToSmallNums(arr);
  const sortedDataset2 = sortSmallToLargeNums(arr);
  let output = {
    nums: [],
    multipliedSum: null,
    debug: {
      countOfChecks: 0,
      sumCheck: null
    }
  };

  for (let i = 0; i < sortedDataset1.length; i++) {
    for (let j = sortedDataset2.length; j > 0; j--) {
      output.debug.countOfChecks++;
      if (sortedDataset1[i] + sortedDataset2[j] === year) {
        output.nums.push({ value: sortedDataset1[i], idx: i });
        output.nums.push({ value: sortedDataset2[j], idx: j });
        output.debug.sumCheck = sortedDataset1[i] + sortedDataset2[j];
        output.multipliedSum = sortedDataset1[i] * sortedDataset2[j];
        return output;
      }
    }
  }
  return output;
}

const matchSum2 = (arr, year) => {
  const sortedDataset1= sortLargeToSmallNums(arr);
  const sortedDataset2 = sortSmallToLargeNums(arr);
  const datasetLength= sortedDataset1.length;
  let output = {
    nums: [],
    multipliedSum: null,
    debug: {
      countOfChecks: 0,
      sumCheck: null
    }
  };

  for (let i = 0; i < datasetLength; i++) {
    for (let j = datasetLength; j > 0; j--) {
      for (let k = datasetLength; k > 0; k--) {
        output.debug.countOfChecks++;
        if (sortedDataset1[i] + sortedDataset2[j] + sortedDataset2[k] === year) {
          output.nums.push({ value: sortedDataset1[i], idx: i });
          output.nums.push({ value: sortedDataset2[j], idx: j });
          output.nums.push({ value: sortedDataset2[k], idx: k });
          output.debug.sumCheck = sortedDataset1[i] + sortedDataset2[j] + sortedDataset2[k];
          output.multipliedSum = sortedDataset1[i] * sortedDataset2[j] * sortedDataset2[k];
          return output;
        }
      }
    }
  }
  return output;
}

const data = fs.readFileSync('./data1.txt').toString().split('\n').map(n => Number(n));
const summary1 = matchSum1(data, 2020);
const summary2 = matchSum2(data, 2020);

console.log(summary1);
console.log(summary2);