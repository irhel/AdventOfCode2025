import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let res: bigint = 0n;

let numbers: number[][] = [];
let ops: string[] = [];

rl.on('line', (line: string) => {

  let tokenized = line.split(' ').filter(x => x !== '')

  if (tokenized.length > 0 && (tokenized[0] === '+' || tokenized[0] === '*')) {
    ops = tokenized;
  } else {
    numbers.push(tokenized.map(x => Number(x)));
  }

});

rl.on('close', () => {

  let partialResult:number = 0;
  let column:number = 0;

  for (const operator of ops) {

    if (operator === '+') {
      partialResult = 0;
      for (const numberRow of numbers) {
        partialResult += numberRow[column]
      }
    } else {
      partialResult = 1;
      for (const numberRow of numbers) {
        partialResult *= numberRow[column]
      }
    }

    res += BigInt(partialResult);
    column++;
  }

  console.log(res);

});
