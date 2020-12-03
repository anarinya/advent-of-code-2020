const fs = require('fs');

export function txtToNumArray(file: string): number[] {
  return fs.readFileSync(file).toString().split('\n').map((n: string) => Number(n));
}

export function txtToArray(file: string): string[] {
  return fs.readFileSync(file).toString().split('\n');
}

export const sortLargeToSmallNums = (arr: number[]): number[] => arr.sort((a, b) => b - a);
export const sortSmallToLargeNums = (arr: number[]): number[] => arr.sort((a, b) => a - b);