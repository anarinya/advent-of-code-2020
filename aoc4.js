const fs = require('fs');

const reqFields = {
  // 4 digit number between 1920 and 2002
  'byr': { regex: /^(19[2-9]\d$|200[0-2]$)/ },
  // 4 digit number between 2010 and 2020
  'iyr': { regex: /^(201\d$|2020$)/ },
  // 4 digit number between 2020 and 2030
  'eyr': { regex: /^(202\d$|2030$)/ },
  // 150-193cm or 59-76in
  'hgt': { regex: /^(1[5-8]\dcm$|19[0-3]cm$|[5-6]\din$|7[0-6]in$)/ },
  // # followed exactly by 6 characters (0-9 or a-f)
  'hcl': { regex: /^(#[0-9a-f]{6}$)/ },
  // amb, blu, brn, gry, grn, hzl, oth
  'ecl': { regex: /^(amb$|blu$|brn$|gry$|grn$|hzl$|oth$)/ },
  // 9 digit number, counting leading 0's
  'pid': { regex: /^(\d{9}$)/ }
}

const data = fs
  .readFileSync('./data/data4.txt')
  .toString()
  .split('\n\n')
  .map(record => record.split(/[\s]/).reduce((acc, pair) => {
    const [key, value] = pair.split(':');
    acc[key] = value;
    return acc;
  }, {}));

const validCountPart1 = data.reduce((count, record) => {
  const valid = Object.keys(reqFields).every(field => record[field]);
  return valid ? ++count : count;
}, 0);

const validCountPart2 = data.reduce((count, record) => {
  const valid = Object.keys(reqFields).every(field => {
    return record[field] && reqFields[field].regex.test(record[field]);
  });
  return valid ? ++count : count;
}, 0);

console.log(validCountPart1);
console.log(validCountPart2);