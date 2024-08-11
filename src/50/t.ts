function* generatorExample() {
    yield 'Hello';
    yield 'World';
    yield '!';
}

const generator = generatorExample();

// for ... of loop of generator
for (const k of generator) {
    console.log(k); // Output: Hello World!
}

// for ... of loop of object with Symbol.iterator
console.log(generator[Symbol.iterator] === generatorExample.prototype[Symbol.iterator]); // Output: true
console.log(Object.getPrototypeOf(generator) === generatorExample.prototype); // Output: true
for (const k of {[Symbol.iterator]: generatorExample}) {
    console.log(k); // Output: Hello World!
}

// Spread operator
const x = [...generatorExample()];
console.log(x); // Output: [ 'Hello', 'World', '!' ]

// delegate generator
function* delegator(x) {
    yield* x;
}
const y = delegator(['abc', 'def', 'ghi']);
console.log(...y); // Output: [ 'abc', 'def', 'ghi' ]
