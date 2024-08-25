import ns from "mocha";

let s = new ns.Suite('a');
console.log(s.hello); // "Hi" ???
s.hello = 'world'; // OK
