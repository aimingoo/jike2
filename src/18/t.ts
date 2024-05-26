/*
  Examples of ...T
*/

type T = [string, number, 'a'];
type L = T['length'];

// 用法1：展开（spread），T is Tuple
type T2 = [boolean, ...T]; 
type T3 = [...T, boolean]; 
type T4 = [boolean, ...T, 1]; 

// 用法2：剩余元素（rest element），T is Array<>
type T5 = [...string[]];
type T6 = [number, ...string[]];
type T7 = [number, ...string[], boolean];
type T71 = [number, ...T, ...(string|number)[], boolean];
type T8 = [...string[], boolean];
type L8 = T8['length'];
type T9 = [...T8]; // 展开一个无限长的元组

// 用法3：在函数参数（参数名）中总是识别为剩余参数语法（rest parameter）
type F1 = (..._: T) => void;
type F2 = (...$: string[]) => void; // or any[], or other array of types
type F3 = (...args: any) => void;
type F31 = (...args: any[]) => void;
type F4 = (...T: any) => void; // NOTE: WARNNING!

// 带有指定前序个参数，并且后面是任意多个其它参数（不定长元组/无限元组）
type F5 = (...args: [...T, ...any[]]) => void; // How to?

// 其它
let x = [1, 2, 'a'];
let y = {a: 1, b: 2};
type T10 = [...any]; // any[]
type T11 = [...never]; // never
type T12 = [...typeof x]; // T是表达式，先求值
type T13 = [...typeof y]; // 求值的结果不是数组或元组
type T14 = [...T|number[]]; // T是联合，[...T] | [...number[]]
