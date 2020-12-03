import { txtToArray } from './utils';

const data: string[] = txtToArray('./data/data2.txt');

const validCountPolicy1: number = data.reduce((sum: number, entry: string) => {
  const [policy, letter, pass]: string[] = entry.split(' ');
  const [min, max]: number[] = policy.split('-').map(n => Number(n));
  const check: string = letter.slice(0, 1);
  const checkCount: number = pass.split('').reduce((acc, chr) => chr === check ? ++acc : acc, 0);

  return (checkCount >= min && checkCount <= max) ? ++sum : sum;
}, 0);

const validCountPolicy2: number = data.reduce((sum: number, entry) => {
  const [policy, letter, pass]: string[] = entry.split(' ');
  const [pos1, pos2]: number[] = policy.split('-').map(n => Number(n) - 1);
  const check: string = letter.slice(0, 1);
  const pos1Check: boolean = pass.charAt(pos1) === check;
  const pos2Check: boolean = pass.charAt(pos2) === check;

  if (pos1Check && !pos2Check || !pos1Check && pos2Check) sum++;
  return sum;
}, 0);

console.log(validCountPolicy1);
console.log(validCountPolicy2);