// "1" = '',     // NOTE: An enum member cannot have a numeric name. An associated value can be either constant or computed
// a = Symbol(), // NOTE: Value must be numeric enums or string enums
enum X {
   a = 1,
   b = 2,
   c = 'aa',
}

type T = X;
console.log(X);

const n = 1;
console.log(X.a);
console.log(X[n]);  // 'a'
if (n === X.a) {
    // ...
}