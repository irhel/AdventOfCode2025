import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});


function generateContiguousSubstrings(str: string, substringLength: number): string[] {

  let res:string[] = [];
  let startingIndex: number = 0;

  for (let i = 0; i < str.length; i+=substringLength) {
    res.push(str.substring(startingIndex, Math.min(str.length, startingIndex + substringLength)));
    startingIndex += substringLength;
  }

  return res;
}

function hasRepeatingPattern(x: number) {

  let numAsString = x.toString();
  let longestRepeatingPatternLength:number = Math.floor(numAsString.length / 2);

  for (let patternLength = 1; patternLength <= longestRepeatingPatternLength; patternLength++) {

    let substrings = generateContiguousSubstrings(numAsString, patternLength);
    
    if (substrings.every(substring => substring === substrings[0]) === true)
      return true;
  }

  return false;
}

let input:string = '';
rl.on('line', (line: string) => {
  input += line;
});

rl.on('close', () => {

  let ranges:string[] = input.split(',');
  let sum: number = 0;

  for (const range of ranges) {

    let [ start, end ] = range.split('-').map(elem => Number(elem));

    for (let i = start; i <= end; i++) {
      if (hasRepeatingPattern(i)) {
        sum += i;
      }
        
    }
    console.log(`Final result is ${sum}`);
  }
});
