// 基本语法与惯例
// --------------------------------------
// 1
type TNT = | never;
type TNT2 = 'a' | never;

// 2
type TTT<T> = T extends T ? T : never;

// 3
type TRT<T, R = T> = T extends R ? Exclude<R, T> : never;

// 4
type TUT<U> = [U] extends [any] ? true : false;
type TUT2<U> = [U] extends [never] ? true : false;


// 与其它表达式的关系与应用（1）
// --------------------------------------

// keyof T
//      ===> keyof T1 & .. & keyof Tn
interface Bird {
  weight: number;
  leg: number;
  wings: number;
}

interface Horse {
  [x: string]: any;
  weight: number;
  leg: number;
  id: string;
}

type U = Bird | Horse;  // Animal
type X = Bird & Horse;  // BirdAndHorse
type T1 = keyof U; // "weight" | "leg"
type T2 = keyof X; // "weight" | "leg" | "wings" | "id"
// BUT, when X equal never ????!


// U extends ...
type AllKeys<T> = T extends T ? keyof T : never;
type T11 = AllKeys<U>;
type T21 = AllKeys<X>;

// remove index signatrues
//  - 映射是处理一个结果集合中存在“可能被联合合并掉的成员”的唯一有效方法
type NoSign<T> = {
  [k in keyof T as
    (string|symbol|number extends k ? never : k)]: T[k]  // 这里需要分布式联合，但却并没有作为祼类型参数（所以不能用）
}
type T22 = NoSign<Bird>;

type AllKeys2<T, X=PropertyKey> = T extends T
  ? keyof {
      [k in keyof T as
        (X extends k ? k : never) extends never ? k : never
      ]: T[k]
    }
  : never;

type AllKeys3<T, X=PropertyKey> = AllKeys<T extends T
  ? {[k in keyof T as
      (X extends k ? k : never) extends never ? k : never
     ]: T[k]
    }
  : never>;

type T3 = AllKeys<any>;
type T4 = AllKeys2<any, number>;
type T41 = AllKeys3<U>;


// 与其它表达式的关系与应用（2）
// --------------------------------------

// T[k]
//      ===> T[k1] | .. | T[kn]
//      ===> T1[k] | .. | Tn[k], k in keyof T
type AllValues<T, K = keyof T> = T extends object
    ? K extends keyof T ? T[K] : never
    : never;

type AllValues2<T, K = AllKeys2<T>> = T extends object
    ? K extends keyof T ? T[K] : never
    : never;

type T5 = AllValues2<X>;
type T51 = AllKeys2<X>;


// `_${T}_`
//      ===> `_${T1}_` | .. | `_${Tn}_`
type U6 = 'a' | 'b';
type T6 = `_${U6}_`;
type PatX<U> = U extends string ? `_${U}_` : never;
// type PatX1<U> = `_${U extends string ? U : never}_`;
// type PatX2<U extends string> = `_${U}_`;
type T61 = PatX<U6>;


// Naked
type PatX3<U extends string> = `${U}` extends string ? [U] : never; // `${U}`是特例
type T63 = PatX3<U6>;

type PatX4<U>                = (U)    extends string ? [U] : never; // （与上例相似的语义）
type T64 = PatX4<U6>;

type Trans<T> = T;
type Trans2<T> = T[][number];
type Trans3<T> = boolean extends true ? never : Trans<T>;
type PatX5<U>                = Trans3<U> extends string ? [U] : never;
type T65 = PatX5<U6 | 'c'>;

type Trans6<T> = T extends T ? T : never;
type PatX6<U>                = Trans6<U> extends string ? [U] : never;
type T66 = PatX6<U6 | 'c'>;


// [...T]
//      ===> [...T1] | .. | [...Tn]
//      ===> [...T1, ...T2, .., ...Tn]   << 这绝对是一个史诗级别的大难题！
// NOTE: 从联合中取出/列举出成员：从多重签名中推断，并使用递归来生成元组（Union To Tuple）
type U7 = ['a'] | ['b']; // U6 = 'a' | 'b';
type T7 = ['c', ...U7];
type T71<U> = U extends any[] ? ['c', ...U] : never;
type T72 = T71<U7>;


// { [k in U as 0]: k }
//      ===> { 0: U1| .. |Un }
type X8 = {
  [k in U6 as string]: k    // NOTE: 这里将会出现{ 0: U1| .. |Un }
}

type X81 = {
  0: "a";
//  0: "b";
//  ...
}
