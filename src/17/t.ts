type A = 'a' | 'b' | string; // 联合、单类型（包括any）

type B = 'a' & string;  // 单类型或never

interface T1 {
    a: string;
    c: number;
}

interface T2 {
    a: string;
    b: boolean;
}

interface T1 {
    a: string;
    c: number;
}

type X = T1 & T2; // 交叉
type T3 = keyof X; // 求值X
type T4 = X['c']; // 求值X
type T5 = X & string;  // 惰性的，或never
type T6 = X | string;  // 惰性的

type U = T1 | T2; // 联合
type T7 = keyof U;  // keyof T1 & keyof T2   （注意keyof的结果是string|numer|...)
type T81 = U['c'|'b']; // 1、检查 ('c' | 'b') in (keyof U)
type T82 = (U | {a: boolean})['a']; // 2、T1['a'] | T2 ['a'] | .. | Tn ['a']
type T9 = U & {a: boolean}; // 惰性的，或never（求值方法：T1 & A | .. | T2 & A）
type T10 = U | {a: boolean}; // 惰性的
