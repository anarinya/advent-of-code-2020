import { txtToNumArray, sortLargeToSmallNums, sortSmallToLargeNums } from './utils';

type ArrayReference = {
  value: number;
  idx: number;
};

type ArrSumOutput = {
  nums: [ArrayReference?];
  multipliedSum: number | null;
  debug: DebugInfo;
}

type DebugInfo = {
  sumCheck: number | null;
  countOfChecks: number;
};

function matchSum1(arr: number[], year: number): ArrSumOutput {
  const sortedDataset1: number[] = sortLargeToSmallNums(arr);
  const sortedDataset2: number[] = sortSmallToLargeNums(arr);
  let output: ArrSumOutput = {
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

function matchSum2(arr: number[], year: number): ArrSumOutput {
  const sortedDataset1: number[] = sortLargeToSmallNums(arr);
  const sortedDataset2: number[] = sortSmallToLargeNums(arr);
  const datasetLength: number = sortedDataset1.length;
  let output: ArrSumOutput = {
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

const data = txtToNumArray('./data/data1.txt');
const summary1 = matchSum1(data, 2020);
const summary2 = matchSum2(data, 2020);

console.log(summary1);
console.log(summary2);