import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

let g: string[][] = [];

type Pos = {
  x: number;
  y: number;
}

function removeableRolls(g: string[][], rows: number, columns: number) : Pos[] {

  let res: number = 0;
  let removeAblePositions: Pos[] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {

      if (g[i][j] != '@') continue;

      // check 8 directions
      let deltaX: number[] = [0, 0, -1, -1, -1, 1, 1, 1]
      let deltaY: number[] = [1, -1, 0, -1, 1, 0, -1, 1]
      let rolls:number = 0;

      for(let ii = 0; ii < 8; ii++) {

        if ((i + deltaX[ii] >= 0 && i + deltaX[ii] < rows) && (j + deltaY[ii] >= 0 && j + deltaY[ii] < columns)) {

          // valid position
          if (g[i + deltaX[ii]][j + deltaY[ii]] === '@')
            rolls++;
        }
      }

      if (rolls < 4) {
        removeAblePositions.push({x: i, y: j});
      }
    }
  }

  return removeAblePositions;
}
rl.on('line', (line: string) => {
  g.push(line.split(''));
});

rl.on('close', () => {

  let columns: number = g[0].length;
  let rows: number = g.length;
  let res: number = 0;

  let result: Pos[] = removeableRolls(g, rows, columns);
  console.log(`can remove ${result.length} rolls`)

  while( result.length > 0 ) {
    res += result.length;
    for (const position of result ) {
      g[position.x][position.y] = 'x';
    }

    result = removeableRolls(g, rows, columns);
  }

  console.log(`${res}`);
});