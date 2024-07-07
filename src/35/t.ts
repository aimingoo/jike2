// NOTE: 列举：参考A的成员，得到B（类型操作逻辑中的“迭代”问题）


// 1）模板字符串字面量的列举（递归）
// type ToUnion<S extends string> = S; // @see jike/21/t.ts, and 27, 28
// type IsTemplateLiteral<T> = T;      // @see jike/33/t.ts
// =================

// ToUnion的实现
type ToUnion<T extends string> =
    T extends `${infer U}${infer V}` ? U | ToUnion<V> : never;

// ReverseString的简化的版本：使用递归来列举字符串和元组
//  - @see jike/27/t.ts
//  - @see jike/28/t.ts
type ReverseString2<T extends string, Result extends string = ''> =
    T extends `${infer C}${infer X}`
        ? ReverseString2<X, `${C}${Result}`>
        : Result
type T20 = ReverseString2<'abcd'>;

// 简单模式：将递归结果直接用于表达式操作数
type ReverseString3<T extends string> =
    T extends `${infer C}${infer X}` ? `${ReverseString3<X>}${C}` : ""
type T21 = ReverseString3<'abcd'>;
type T22 = ReverseString3<`ab${`b` extends string ? true : false}cd`>;
type T23 = ReverseString3<`ab${true}cd`>;
type T24 = ReverseString3<`ab${boolean}cd`>;
type T25 = ReverseString3<`a13b${any}cd${string}o3o${bigint}xx`>;

// TemplateParameters
type TTemplateFields<T> = T extends `${infer C}${infer X}`
    ? [C, ...TTemplateFields<X>]
    : string extends T ? [string] : []; // string is last parameters, or recursive break

type F = TTemplateFields<`a13b${any}cd${string}o3o${bigint}xx`>;
type F2 = TTemplateFields<`xx${string}`>;
type F21 = `${string}` extends `${infer C}${infer X}` ? true : false;  // or string

// strings union vs. templeate of strings
type S1 = 'abcd' | 'defaa';
type S11 = 'abcd';
type S12 = 'defaa';
type S2 = `${'abcd' | 'defaa'}`;
type S3 = `${S11|S12}`;
type S4 = `abc${true}aa`; // string | number | bigint | boolean | true | false | null | undefined

type IsTemplateLiteral<T> = true extends NotAnyNever<T>
    ? T extends `${infer C}${infer X}`
        ? C extends `${infer _}`
            ? (C extends `${infer _ extends bigint}` ? (bigint extends _ ? true : IsTemplateLiteral<X>) :
               C extends `${infer _ extends number}` ? (number extends _ ? true : IsTemplateLiteral<X>) :
               IsTemplateLiteral<X>)
            : true  // any, string, or some Nominal types
        : string extends T ? true : false
    : false;

type SS = IsTemplateLiteral<`xx${string}`>; // true
type SS2 = IsTemplateLiteral<`xx${number|'a'}`>; // boolean, !!! WARRING !!!

// 2）映射过程中成员的筛选（过滤与添加）
// =================
type T = {
    [k: string]: string | number;
    a: string;
    b: number;
    c: 1;
}

// 联合成员的过滤1：extends
type keys = keyof T;
type U1 = 'a' | 'b';
type T4 = {
  [k in keys as (
    k extends U1 ? k : never)]: T[k];  // make a accepted list
}

// 联合成员的过滤2
type T9 = {
[k in keyof T as (  // keyof T 在in的右侧时，求值但不合并
  k extends 'c' ? k : never)]: T[k];
}

// 成员的添加1：利用联合
type T11 = {
    [k in keyof T as k | `_${k}`] : T[k]
}

// 成员的添加与覆盖2：(类似于Object.assign())
// （略）


// 2.1）元组的映射
//  - @see 第23讲（元组的列举处理有三种方法）
// =================
type T5 = [string, number, 1, 2, 'ok'];

type T51 = {
    [k in keyof T5]: T5[k];
}

type MapT<T extends any[]> = {
    [k in keyof T]: k extends `${number}` ? T[k] : never;
}
type T511 = MapT<T5>;

type MapTX<T extends any[], R = T> = {
    [k in keyof T]: k extends `${infer N extends number}` ? R[Extract<k|N, keyof R>] : never;
    // [k in keyof T]: k extends `${number}` ? R[Extract<k, keyof R>] : never;  // Try this with T52
}

// NOTE: 在T52中如果R的key是number类型，则它必须以number值的key才能存取（例如表达式中的N，小心：不能是字符）
type T52 = MapTX<T5, {1: 'ab', 2: 'cd'}>; // & {[k: number]: undefined} // to fake T521
type T521 = MapTX<T5, ['ab', 'cd']>;


// 3）联合的列举（分布式联合）
//   - keyof兼容类型在映射中的行为是与分布式联合类似的
// =================
type T6<T> = T extends any ? [T] : never;
type T61<T> = T extends any
    ? T extends Exclude<PropertyKey, symbol> ? [T] : never  // no symbols
    : never;
type T611<T> = T extends infer X extends Exclude<PropertyKey, symbol> ? [T] | `_${X}`: never; // no symbols
type T612<T> = T extends Exclude<PropertyKey, symbol> ? [T] | `_${T}` : never; // no symbols
type T62<T> = T extends any ? [T] | `_${Exclude<T & PropertyKey, symbol>}`: never; // all + `no symbol` filter
type T7 = T6<keyof T5>; //  & {[k: string]: any}


// 4）元组的列举（递归）
// =================
// @see https://github.com/Microsoft/TypeScript/issues/26223
// type TupleN<N, base = unknown> = [base, ...base[]] & { length: N };
type TupleN<N extends number, base = unknown, R extends base[] = []> = NotAnyNever<N> extends true
    ? R extends {length: N} ? R : TupleN<N, base, [base, ...R]>
    : never;

// @see https://github.com/inocan-group/inferred-types/blob/master/src/types/tuples/FixedLengthArray.ts
// @see https://github.com/inocan-group/inferred-types/blob/master/src/types/numeric-literals/Increment.ts
type Add<N> = [...TupleN<N&number>, unknown]['length'];
type Dec<N> = TupleN<N&number> extends [...infer L, any] ? L["length"] : never;
type T53 = MapTX<TupleN<5>, {1: 'ab', 2: 'cd'}>; // `& {[k: number]: undefined}>` to fake T521
type T54 = Add<10>;

// 4.1）联合转换到元组
// type UnionToTuple<U> = U;  // @see jike/34/t.ts
// =================
type UnionPop<U> = IsUnion<U> extends true
    ? UnionToSigntrue<U> extends (a: infer X)=>void ? X : never
    : U;

type UnionToTuple<U> = UnionPop<U> extends infer t
    ? [t, ...([U] extends [t] ? [] : UnionToTuple<Exclude<U, t>>)]
    : never;

type T8 = UnionToTuple<"a" | "b" | "ac">;
type T81 = UnionPop<"a" | "b" | "ac">;

// 5) 签名
type Func = {
    (a: "a"): void;
    (a: "b"): void;
    (a: "ac"): void;
}

type Func2 = {
    (a: "a"): void;
} & {
    (a: "b"): void;
} & {
    (a: "ac"): void;
}

type Func3 = (a: "a" | "b" | "ac") => void;

type FT1 = Func3 extends Func ? true : false; ; // true
type FT2 = Func2 extends Func ? true : false; ; // true
type FT3 = Func extends ((a: infer X) => void) ? X : false;  // 'ac'

// 5.1）联合到签名
type UnionToIntersection<U> = IsUnion<U> extends true
    ? (U extends U ? ((k: U)=> void) : never) extends
      ((k: infer I) => void)  // 逆变位置推断出来的类型V，是所有候选类型的交叉。@see release-notes/typescript-2.8.md
          ? I
          : never
    : U;

type UnionToSigntrue<U, R = void> = UnionToIntersection<U extends U ? (a: U) => R : never>;
type X = UnionToSigntrue<'a'|'b'|'ac'|'aa'|'da'>;

// 5.2）元组到签名
//  - 不存在从元组转换到签名然后再UnionPop的需求（因为这等同于元组的pop）
type TupleToSigntrue<T extends any[], R = void> = TuplesToSigntrue<{
    [k in keyof T]: k extends `${number}` ? [T[k]] : never;  // to Tuples
}>;

type TuplesToSigntrue<T extends Array<any[]>, R = void> = UnionToIntersection<{
    [k in keyof T]: k extends `${number}` ? ((...args:[...T[k]]) => R) : never;
}[number]>
