let x1: null = null;
let x2: undefined = undefined;

let x3: symbol = Symbol(); // typeof x3 === 'symbol'
let x4: bigint = 1n;
let x5: boolean = true;
let x6: number = 1;
let x7: string = 'abc';

let x8: 'abc' = 'abc'; // 

x7 = 'cde';

let x9 = new String('abc'); // .toString();
x9 = x8;

class StringEx extends String {}
let x10 = new StringEx('abc');

let x11: {
    a: string;
    b: number;
} = {
    a: "xx",
    b: 0,
}

let x12: object = x11;
let x13: {} = {
    a: "xx",
    b: 0,
};
