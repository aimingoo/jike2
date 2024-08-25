import ns from "mocha"; // ns is Mocha, ns2 is {default: Mocha}
import * as ns2 from "mocha"; // BAD CASE! or NOT?
// import ns = require("mocha"); // for cjs
let Mocha = ns;

// for mocha
declare module 'mocha' {
    interface Mocha {  // BAD: NS本身无法被扩展（不能扩展模块本身，例如default）
        hello: string;
    }

    interface Suite {
        hello: string;
    }
}

ns.Suite.prototype.hello = 'Hi'; // OK
let s = new ns.Suite('a')
console.log(s.hello); // "Hi"
s.hello = 'world'; // OK

// for global
declare global {
    interface Mocha {
        hello: string;
    }
}

// WARRING: where is global Mocha?
ns.prototype.hello = 'Hi'; // OK
let x  = new Mocha; // NOTE: Mocha is global name!
console.log(x.hello); // "Hi"
x.hello = 'world'; // OK
