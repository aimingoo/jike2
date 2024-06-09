// 基本逻辑
type L = 1
type R = 2
type X = 3
type Y = 4
type T = L extends R ? X : Y;  // L&R, X, Y, X | Y, never

// @see release-notes/typescript-4.9.html
interface Animal { type: string }
interface Zoo<T extends Animal> {
  // ...
}
type MakeZoo<A> = A extends Animal ? Zoo<A> : never;
                                  // ^b1
// case 1
type Pig = { type: 'pig', leg: 4 };
type Pig2 = Omit<Animal &Pig, never>;
type b1 = Pig extends Animal ? true : false;
type b2 = Pig & Animal extends Animal ? true : false;

// case 2
type Tx<L, R> = L extends R ? ['X', L, R] : ['Y', L, R];
type b4 = Tx<boolean, true>
type b3 = Tx<any, never>; // ["X", never, never] | ["Y", any, never]
// X = L = L & R

// -------------------- 我是友好的分割线 --------------------

// keyof T
//   - 求值结果T：anything
type T1 = keyof 's' extends string ? true : false; // BAD CASE
type T2 = keyof ('s' extends string ? true : false);


// T[x]
//   - 求值结果T：anything
//   - 求值结果x：never | string | symbol | number ｜subset union，And x in keyof T，
type A = {a: string; b: number; c: 1}
type T3 = A['s' extends string ? 'a' : false]; // NOTE: 注意false分支在这里是无意义的
type T4 = ('s' extends string ? 'a' : never)['toString']; // NOTE: 注意never，同上。

// A | B
//   - 求值结果：anything
type T5 = {} | ('s' extends string ? {a: string} : {})

// A & B
//   - 求值结果：anything
type T6 = {} & ('s' extends string ? {a: string} : {})

// A extends B ...
//   - 求值结果：anything
type T7 = 's' extends string
            ? `${number}` extends string
              ? true
              : false
            : never;
type T71 = ('s' extends string ? {a: string} : {}) extends
            ('' extends `${number}` ? {a: string} : {}) ? true : false;
type T711 = {a: string} extends  {} ? true : false;

// ...T
//   - 求值结果：never | array | tuple | union
type T8 = [...('s' extends string ? [] : never)];

// `${...}`
//   - 求值结果：never | string | number | bigint | boolean | null | undefined ｜subset
//   - any
type T9 = `...${'s' extends string ? any : never}`;

// x in U as K
//   - 求值结果U：never | string | symbol | number ｜subset union，@see x in T[x]
//   - 求值结果K：（同上）
type T10 = {
    [k in 's' extends string ? {a: string} : {} as
      's' extends string ? keyof {a: string} : keyof {}]: any
}

// 结构类型的成员类型
type T11 = {
  a: 's' extends string ? [] : never;
}
