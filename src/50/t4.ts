// Example using generator in Keyed Collections types

function* generatorExample(): Generator<[string, number], number|string|void> {
    yield ['Hello', 1];
    return 0;
}

const map = new Map(generatorExample());
const mapKeys = [...map.keys()];
type TMap = ReturnType<typeof generatorExample> extends IterableIterator<infer T> ? T : never;
type TMap2 = ReturnType<typeof generatorExample> extends Generator<infer T> ? T : never;

// Set example
let iter = generatorExample();
const set = new Set(iter);
const setValue = set.has(['Hello', 1]);

// WeakMap example
// WeakSet example
// ...


// Example using generator in Indexed Collections types
// Array example
// TypedArray example
// ...

// String example
const string = 'Hello, World!';
const x = new Set(string);
console.log(x.has('k'));    // Output: false

// Using Return/Next types
let x2 = iter.return('abcd');
console.log(x2.value);  // Output: 0
let iter3 = generatorExample();
for (const k of iter3) {
    // ...
}