import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

// Generalized version, the maximum result is dictated by the max value of the most significant digit
// Read left to right to find the max value and always permit for batteries in the end to remain to make total
// Store the index of the max value and skip over it on the next iteration

function getMaxJoltage(arr: number[], numberOfBateries: number = 2): number {

  let indexOfDigit = 0;
  let res = '';

  for (let i = numberOfBateries; i > 0; i--) {

    let maxMostSignificantDigit = 0;

    for (let j = indexOfDigit; j < arr.length - i + 1; j++ ) {
      if (arr[j] > maxMostSignificantDigit) {
        indexOfDigit = j;
        maxMostSignificantDigit = arr[j];
      }
    }
    // Don't consider that digit again
    indexOfDigit++;
    res += maxMostSignificantDigit;

  }

  return Number(res);
}

let res: number = 0;

rl.on('line', (line: string) => {

  const arr:number[] = line.split('').map(elem => Number(elem));
  res += getMaxJoltage(arr, 12);

});

rl.on('close', () => {
  console.log(res);
});