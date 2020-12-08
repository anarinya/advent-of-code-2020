const fs = require('fs');
const file = (__dirname + '/data7.txt');

const bagRules = (data) => {
  return data.reduce((acc, rule) => {
    const [color, contains] = rule.replace(/( bags?\.?)/gi, '').split(' contain ');
    const entries = contains.split(', ').filter(entry => entry.slice(0,2) !== 'no');

     acc[color] = entries.length > 0 ? entries.reduce((obj, bag) => {
      const sIdx = bag.indexOf(' ');
      const [num, bagColor] = [bag.slice(0, sIdx), bag.slice(sIdx + 1)];
      return (obj[bagColor] = Number(num)), obj;
    }, {}) : {};

    return acc;
  }, {});
};

const containsColor = (bags, bag, color, count = 0) => {
  if (!bags[bag]) return count;
  const entries = Object.keys(bags[bag]);

  if (bags[bag][color]) return count += 1;

  for (const entry of entries) {
    if (containsColor(bags, entry, color, count)) {
      return count += 1;
    }
  }
  return count;
};

const countColor = (bags, color) => {
  if (!bags[color]) return 0;
  const entries = Object.entries(bags[color]);
  let bagTotal = 0;

  for (const entry of entries) {
    bagTotal += entry[1] + entry[1] * countColor(bags, entry[0]);
  }
  return bagTotal;
};

// How many bag colors contain at least one shiny gold bag?
const part1 = (data, color) => {
  return Object.keys(data).reduce((count, bag) => {
    return (count += containsColor(bags, bag, color)), count;
  }, 0);
};

// How many individual bags are required inside a shiny gold bag?
const part2 = (data, color) => {
  return countColor(data, color);
};

const data = fs.readFileSync(file).toString().split('\n');
const bags = bagRules(data);

console.log(part1(bags, 'shiny gold'));
console.log(part2(bags, 'shiny gold'));
