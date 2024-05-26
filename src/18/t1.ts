/*
  Examples of T[K]
*/

interface T1 {
    a: string;
    c: number;
}

interface T2 {
    [k: string]: any;
    a: string;
    b: boolean;
}

// 一般用法
type T3 = T1['a']; // 单类型, subtype of string|number|symbol

// T[K]中，T是表达式
let x = {a: 1, b: 2};
type T4 = typeof x['a']; // 先求值T，再确认K
type T5 = T1['a']['toString']; // （同上）
type T6 = (keyof T2)['toString']; // （同上）

/* （上一讲的内容）
type X = T1 & T2; // 交叉
type T4 = X['c']; // 求值X

type U = T1 | T2; // 联合
type T81 = U['c'|'b']; // 1、检查 ('c' | 'b') in (keyof U)
type T82 = (U | {a: boolean})['a']; // 2、T1['a'] | T2 ['a'] | .. | Tn ['a']
*/

// T[K]中，K是表达式
type X = T1 & T2; // 交叉
type T7 = T1[X]; // （先求值T）求值X
type T8 = T1['a'|'c']; // 联合  
type T81 = T1['a'] | T1['c'];

/*
type X = T1 & T2; // 交叉
type T3 = keyof X; // 求值X

type U = T1 | T2; // 联合
type T7 = keyof U;  // keyof T1 & keyof T2   （注意keyof的结果是string|numer|...)
*/

// 其它1：T[K]中，T是特殊的单类型
type S1 = any['a'];
type S2 = never['toString'];

// 其它2：T[K]中，T是包装类型
type S3 = 'a'['toString'];
type S4 = string['toString'];
type S5 = String['toString'];
type S51 = Exclude<keyof String, never>;
type S6 = 1['toString']; // 1 as Number, more ...

// 其它3：T[K]中，T是枚举类型
enum T10 {a, b, c, d='abc'};   // Enum
type T11 = keyof T10
type T12 = T10['toString'];
