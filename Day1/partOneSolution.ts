import * as readline from 'readline';
import * as fs from 'fs';

const fileStream = fs.createReadStream(`${__dirname}/input.txt`);

const rl = readline.createInterface({
  input: fileStream,
  crlfDelay: Infinity
});

type Rotation = {
  direction: 'R' | 'L';
  positions: number
};

function parseLine(line:string): Rotation {
  return {
    direction: line.charAt(0) as 'R' | 'L',
    positions: Number(line.substring(1))
  }
};

function moveRight(position: number, rotation: Rotation): number {
  for (let i = 0; i < rotation.positions; i++) {
    position++;
    if (position > 99)
      position = 0;
  }
  return position;
}

function moveLeft(position: number, rotation: Rotation): number {
  for (let i = 0; i < rotation.positions; i++) {
    position--;
    if (position < 0)
      position = 99;
  }
  return position;
}

function timesDialMatchesZero(rotations: Rotation[]): number {

  let currentPosition: number = 50;
  let res: number = 0;

  for(const rotation of rotations) {
    
    if (rotation.direction === 'R') {
      currentPosition = moveRight(currentPosition, rotation);

    } else {
      currentPosition = moveLeft(currentPosition, rotation);
    }

    if (currentPosition === 0) {
      res++;
    }
  }
  return res;
}

let rotations: Rotation[] = [];

rl.on('line', (line: string) => {
  rotations.push(parseLine(line));
});

rl.on('close', () => {
  console.time('timesDialMatchesZero');
  let res = timesDialMatchesZero(rotations);
  console.timeEnd('timesDialMatchesZero');
  console.log(res);
});
