import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let operators: string[] = [];
let input: string[] = [];

rl.on('line', (line: string) => {

  let tokenized = line.split(' ')

  if (tokenized.length > 0 && (tokenized[0] === '+' || tokenized[0] === '*')) {
    operators = tokenized.filter(x => x !== '')
  } else {
    input.push(line);
  }

});


function add(a: number[]) : number {
  let res = 0;
  for (const num of a) {
    res += num;
  }
  return res;
}

function mul(a: number[]) : number {
  let res = 1
  for (const num of a) 
    res *= num
  return res;
}

let totalNumber = 0;

rl.on('close', () => {

  let result = 0;

  let operatorsIndex = 0;

  let numbersColumnWise: number[] = [];

  for (let i = 0; i < input[0].length; i++) {

    let numberColumnWise = '';
    let allSpace = true;

  
    for (const row of input) {
      if (row[i] !== ' ') {
        allSpace = false;
        numberColumnWise += row[i];
      }
    }

    if (numberColumnWise !== '')
      numbersColumnWise.push(Number(numberColumnWise))
  
    if (allSpace) {

      let op = operators[operatorsIndex++];

      result += (op === '+' ? add(numbersColumnWise) : mul(numbersColumnWise))
      numbersColumnWise = [];
    }    
  }

  result += (operators[operatorsIndex] === '+' ? add(numbersColumnWise) : mul(numbersColumnWise))
  console.log("result", result)

});


