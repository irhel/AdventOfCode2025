"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const fs = __importStar(require("fs"));
const fileStream = fs.createReadStream(`${__dirname}/input.txt`);
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});
let operators = [];
let input = [];
rl.on('line', (line) => {
    let tokenized = line.split(' ');
    if (tokenized.length > 0 && (tokenized[0] === '+' || tokenized[0] === '*')) {
        operators = tokenized.filter(x => x !== '');
    }
    else {
        input.push(line);
    }
});
function add(a) {
    let res = 0;
    for (const num of a) {
        res += num;
    }
    return res;
}
function mul(a) {
    let res = 1;
    for (const num of a)
        res *= num;
    return res;
}
let totalNumber = 0;
rl.on('close', () => {
    let result = 0;
    let operatorsIndex = 0;
    let numbersColumnWise = [];
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
            numbersColumnWise.push(Number(numberColumnWise));
        if (allSpace) {
            let op = operators[operatorsIndex++];
            result += (op === '+' ? add(numbersColumnWise) : mul(numbersColumnWise));
            numbersColumnWise = [];
        }
    }
    result += (operators[operatorsIndex] === '+' ? add(numbersColumnWise) : mul(numbersColumnWise));
    console.log("result", result);
});
