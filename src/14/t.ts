interface F {
    (v: any): v is string; // true | false
    (v: any, message: string): asserts v is string;   // void | never
}

let f!: F;
let x!: any;

f(x, "HI! is not string!");
console.log('a string:', x)

if (f(x)) {
    console.log('a string:', x)
}