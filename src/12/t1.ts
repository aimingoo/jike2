let n!: number;
enum X {
  ["a"],           // success, 常量值（enum member is considered constant）
  "b",             // above
  c,               // above
  d = 5,           // success, 常量值（initialized with a constant enum expression, that is a subset of TypeScript expression, valueType is subset of `string|number`）
  e = "aaa",       // above, (constant enum expression is a literal, or/and math operator, or member of other enum)
  f = Number(10),  // success, 计算值（dynamic computing in js）
  g = n,           // above
  h = 2+1,         // success, Enum member must have initializer after computed member
  i,               // success, above is a number constant
  j = 'a',         // const，常量值（initialized with a constant enum）
  k = 8,           // above
}

const enum Y {
  ["a"],           // success, 常量值（enum member is considered constant）
  "b",             // above
  c,               // above
  d = 5,           // success, 常量值（initialized with a constant enum expression, that is a subset of TypeScript expression, valueType is subset of `string|number`）
  e = "aaa",       // above, (constant enum expression is a literal, or/and math operator, or member of other enum)
  h = 2+1,         // success, Enum member must have initializer after computed member
  i,               // success, above is a number constant
  j = 'a',         // const，常量值（initialized with a constant enum）
  k = 8,           // above
}

console.log(typeof X); // 'object'
console.log(Y.a)

type T = keyof typeof X; // Object.keys(X);
type V = `${X}`;
const Up = 1,
  Down = 2,
  Left = 3,
  Rigth = 4;

enum Directions {
  Up,
  Down,
  Left,
  Rigth
}