import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

type Range = {
  start: number,
  end: number;
}

let ranges: Range[] = [];
let numberOfFreshIngredients: number = 0;
let parseRange: boolean = true;

rl.on('line', (line: string) => {

  if (line === '') {
    parseRange = false;
    return;
  }
    

  if (parseRange) {

    let [start, end] = line.split('-').map(rangeElement => Number(rangeElement))
    ranges.push({ start, end });

  } else {

    let ingredientID = Number(line);
    for (const range of ranges ) {
      if (ingredientID >= range.start && ingredientID <= range.end) {
        numberOfFreshIngredients++;
        break;
      }
    }
    
  }

});

rl.on('close', () => {
  console.log(numberOfFreshIngredients)
});
