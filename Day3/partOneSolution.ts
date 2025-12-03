import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let res: number = 0;

rl.on('line', (line: string) => {

  const arr:number[] = line.split('').map(elem => Number(elem));

  // To maximize the result always choose the largest most significant digit right-to-left
  // Ensure one remains at the end to complete 2 digits
  
  let firstNumber: number = 0;
  let firstNumberIndex: number = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > firstNumber) {
      firstNumber = arr[i];
      firstNumberIndex = i;
    }
  }

  let secondNumber = 0;

  for (let i = arr.length - 1; i > firstNumberIndex; i--) {
    secondNumber = Math.max(secondNumber, arr[i]);
  }

  res += Number(firstNumber + '' + secondNumber);

});

rl.on('close', () => {
  console.log(res);
});