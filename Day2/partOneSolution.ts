import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});


function hasRepeatingPattern(x: number) {

  let numberAsString:string = x.toString();

  if (numberAsString.length % 2 !== 0)
    return false;

  let leftPart = numberAsString.substring(0, numberAsString.length/2);
  let rightPart = numberAsString.substring(numberAsString.length/2, numberAsString.length);

  return leftPart === rightPart; 

}

let input:string = '';
rl.on('line', (line: string) => {
  input += line;
});

rl.on('close', () => {

  let ranges:string[] = input.split(',');
  let sum: number = 0;

  for(const range of ranges) {

    let [ start, end ] = range.split('-').map(elem => Number(elem));

    for(let i = start; i <= end; i++) {
      if (hasRepeatingPattern(i)) {
        sum += i;
      }
        
    }
    console.log(`Final result is ${sum}`);
  }
});
