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
let res = 0n;
let numbers = [];
let ops = [];
rl.on('line', (line) => {
    let tokenized = line.split(' ').filter(x => x !== '');
    if (tokenized.length > 0 && (tokenized[0] === '+' || tokenized[0] === '*')) {
        ops = tokenized;
    }
    else {
        numbers.push(tokenized.map(x => Number(x)));
    }
});
rl.on('close', () => {
    let partialResult = 0;
    let column = 0;
    for (const operator of ops) {
        if (operator === '+') {
            partialResult = 0;
            for (const numberRow of numbers) {
                partialResult += numberRow[column];
            }
        }
        else {
            partialResult = 1;
            for (const numberRow of numbers) {
                partialResult *= numberRow[column];
            }
        }
        res += BigInt(partialResult);
        column++;
    }
    console.log(res);
});
