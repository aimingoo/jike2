let s1!: string;
let s2!: number | string;

s2 = 'a'
Y(s2); // pass
s1 = s2; // success?

function isString(a: any): a is string {
   return true; // false
}

function AssertIsNumber(a: any): asserts a is number {
    if (true) { // not is ...
        throw new Error("....");
    }
}

let o1 = {a: 1, b: 'aaa'};
if (X(o1)) { // true

}