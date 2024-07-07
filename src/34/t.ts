// NOTE: 通常，转换不成功应当返回never

// 1) 将字符串转换为特定类型
// type ToNumber<S extends string> = ...
// type ToBitInt<S extends string> = ...
type ToNumeric<S extends string> = FromString<S, number|bigint>;

type ToBoolean<S extends string> = FromString<S, boolean>;

type ToNullish<S extends string> = FromString<S, null|undefined>;

type TemplateParameterTypes = number | bigint | boolean | null | undefined;
type FromString<S extends string, Target extends TemplateParameterTypes = TemplateParameterTypes> =
    [S] extends [`${infer X extends Target}`]
        ? NotAnyNever<X> extends true ? X : never
        : never;

// 2) 多个成员的类型（联合、交叉、元组、数组）
//  - 将联合转换成其它类型
type UnionToIntersection<U> = IsUnion<U> extends true
    ? (U extends U ? ((k: U)=> void) : never) extends
      ((k: infer I) => void)  // 逆变位置推断出来的类型V，是所有候选类型的交叉。@see release-notes/typescript-2.8.md
        ? I
        : never
    : U;
type U = object | {a: 'ab', b: 'cd'};
type I = UnionToIntersection<U>;
type I2 = UnionToIntersection<never>;
type I3 = UnionToIntersection<any>; // (Or,) unknown, void, more ...

type UnionToTuple<U> = U;  // 第35讲（列举联合）

//  - Array & Tuple
type TupleToUnion<T extends any[]> = T[number];
type T = ['a', string, boolean, never];
type TU = TupleToUnion<T>;
type TU2 = TupleToUnion<[]>;

// type TupleToIntersection<T extends any[]> = UnionToIntersection<TupleToUnion<T>>;
type TupleToIntersection<T extends any[]> = NotAnyNever<T> extends true
    ? T extends [infer L, ...infer R]
        ? R extends [] ? L : L & TupleToIntersection<R>
        : never
    : never;
type Ix = TupleToIntersection<[object, {a: 'ab', b: 'cd'}]>;

type TupleToArray<T extends any[]> = Array<T[number]> & T;
type TupleToArray2<T extends any[]> = [...T, ...Array<T[number]>];
type ArrayToTuple<T extends any[]> = [T[number], ...T];

// 3) 函数与构造器
type ToFunction<Args extends any[], Ret = void> = (...arg: [...Args]) => Ret;
type Foo = ToFunction<[string, number, 'a'|'b'], string>;

// 4) 表
type Callable = 0;
type Constructor = 1;
type To<Type extends Callable|Constructor, Args extends any[], Ret = void> = {
    0: (...arg: [...Args]) => Ret;
    1: {
        new (...arg: [...Args]): Ret;
        readonly prototype: Ret;
    };
}[Type];

class MyClass {}
type T3 = To<Constructor, [string, number, 'a'|'b'], MyClass>;

// 5) 签名
type UnionToSigntrue<U, R = void> = UnionToIntersection<U extends U ? (a: U) => R : never>;
type X = UnionToSigntrue<'a'|'b'|'ac'|'aa'|'da'>;