// NOTE: 应当确保识别的结果总是“仅仅"返回true/false

// JS中的概念
type Nullish = null | undefined;
type Primitive = string | number | bigint | boolean | symbol | Nullish;
type Falsy = false | "" | 0 | Nullish;

// TS中的概念
type LiteralType = NonNullable<Primitive>;
type Numeric = bigint | number;

// 守护函数
function isNullish(x: any): x is Nullish {
  return x === null || x === undefined;
}

type IsNullish = typeof isNullish;
let f: IsNullish = isNullish;

// 声明其它守护函数的类型（用于预定义一些守护函数，包括谓词签名与断言签名）
type Is<T> = (x: any) => x is T;
type IsTrue = Is<true>;

type Is2 = <T>(x: any) => x is T;
type FromIs2<T> = ReturnType<(a: Is2) => typeof a<T>>;
type IsFalse = FromIs2<false>;


/* =====================================================================================
  - 单类型/基础类型的检测
========================================================================================*/
// @see https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
// @see https://github.com/type-challenges/type-challenges
type IsAny<T> = 0 extends 1 & T ? true : false; // never, 1, any
// type IsNotAny<T> = true extends IsAny<T> ? false : true;

// NOTE: 特例（any作为左侧，且右侧不是any/unknown时，会触发分布式）
//  - any不是祼类型参数，但上述情况下会采用分布式条件类型的逻辑
type IsNever<T> = [T] extends [never] ? true : false;
// type IsNotNever<T> = true extends IsNever<T> ? false : true;

// true, false (, never, any, boolean)
type Not<T extends boolean> = true extends T ? false : true;
type NotAnyNever<T> = false extends IsAny<T> ? Not<IsNever<T>> : false;

type IsUnknown<T> = unknown extends T
  ? Not<IsAny<T>>
  : false;

type IsVoid<T> = [T, IsUndefined<T>] extends [void, false]
  ? NotAnyNever<T>
  : false;

// Primitive types
type IsUndefined<T> = [T] extends [undefined]
  ? NotAnyNever<T>
  : false;

type IsNull<T> = [T] extends [null]
? NotAnyNever<T>
: false;

type IsSymbol<T> = [T] extends [symbol]
? NotAnyNever<T>
: false; // Or, string | number | bigint | boolean

type IsLiteral<T, U extends LiteralType = LiteralType> = [T] extends [U]
  ? IsNever<U extends T ? false : never>
  : false;

type IsInterface<T> = [T] extends [object]
  ? NotAnyNever<T>
  : false; // object, interface, class, function/Function, List(Array/Tuple), more...

type IsTemplateLiteral<T> = T; // 第35讲（列举模板）

/* =====================================================================================
  - 利用推断的检测（包括泛型中的推断）
========================================================================================*/

// NOTE: 这里存在两个潜在的BUG
//  - 1~3 GOOD
type IsUnion_1<T> = [T, T] extends [infer U, infer U2] ? U extends infer t ? ([T] extends [t] ? false : true) : never : never;
type IsUnion_2<T> = T[] extends (infer U)[] ? U extends infer t ? ([T] extends [t] ? false : true) : never : never;
type IsUnion_3<T> = T[] extends (infer U)[] ? T extends infer t ? ([U] extends [t] ? false : true) : never : never;
//  - 4 BUG
type IsUnion_4<T> = [T] extends [infer U] ? U extends infer t ? ([T] extends [t] ? false : true) : never : never;
type T21 = IsUnion_1<'a'|'b'>;
type T22 = IsUnion_2<'a'|'b'>;
type T23 = IsUnion_3<'a'|'b'>;
type T24 = IsUnion_4<'a'|'b'>;

// @see https://stackoverflow.com/a/59687759
// type IsUnion<T, U = T> = T extends T ? [U] extends [T] ? false : true : never;
type IsUnion<T> = IsUnion_3<T>; // recommend
type T2 = IsUnion<any>;  // NOTE: 这是一个特例（any在infer t时不会触发False分支）

//  - 就目前来说，我们讨论的泛型有两个大类：声明的，求值的（泛型工具）
// 1）利用泛型的反向推断
type IsArray1<T> = [T] extends [unknown[]] ? true : false;  // BAD CASE, tuple?
type IsArray<T> = IsArray1<T>;

type T9<T> = T extends Array<infer A> ? A : never;
type T91 = T9<string[]>;
type T10<T> = T extends (infer A)[] ? A : never;
type T101 = T9<[string, number]>;

type IsArray2<T> = [T] extends [any[]] ? Not<IsTuple<T>> : false; // BAD CASE
type X = IsArray2<never[]>

type IsTuple1<T> = [T] extends [ReadonlyArray<any>] ? number extends T['length'] ? false : true : false; // BAD CASE
type IsTuple<T> = IsTuple2<T>;
type Func = (a: string, b: boolean, ...args: any[]) => void;
type FuncArgs = Parameters<Func>;
type T = IsTuple<FuncArgs>;

// @see https://github.com/gvergnaud/ts-pattern
type IsTuple2<T> = T extends
  | readonly []
  | readonly [any, ...any]
  | readonly [...any, any]
  ? true
  : false

// @see https://github.com/lifaon74/observables
// @see https://stackoverflow.com/a/75944995
type TupleIsFinite<T extends any[]> = number extends T['length'] ? false : true;

type IsRecord<T, base = any> = [T] extends [Record<infer Keys, infer X>] ? [X] extends [base] ? true : false : false;
type R = Record<'a'|'b'|'o', 1>;
type RT = IsRecord<R, number>;
type RT1 = IsRecord<any>; // NOTE: 注意any和{}特例
type RT7 = IsRecord<{}>; // NOTE: 注意any特例

type FromRecord<T, of extends 'base'|'keys'> = [T] extends [Record<infer Keys, infer Base>]
  ? of extends 'base' ? Base : Keys // {base: Base, keys: Keys}[of]
  : never;
type FromRecord2<T, of extends 'base'|'keys'> = [T] extends [Record<infer Keys, infer Base>]
  ? {
      base: Base,
      keys: Keys
    }[of]
  : never;
type RT2 = FromRecord<R, 'keys'>;
type RT3 = FromRecord<R, 'base'>;
type RT4 = [FromRecord<any, 'keys'>, FromRecord<any, 'base'>];
type RT5 = [FromRecord<never, 'keys'>, FromRecord<never, 'base'>];  // ?
type RT6 = [FromRecord<{}, 'keys'>, FromRecord<{}, 'base'>];  // ?

// 2）函数作为结构类型的处理
type IsCallable<T> = T extends (...args: any) => any
  ? NotAnyNever<T>
  : false;

type IsConstructor<T> = T extends abstract new (...args: any) => any
  ? NotAnyNever<T>
  : false;

/* =====================================================================================
  - 利用特殊类型处理来实现“类型绝对等值检测”
========================================================================================*/

// @see jike/22/t.ts
// type Is<T, target> = T extends target ? 'true' : 'false';
// type Equal<T, target> = target extends T ? Is<T, target> : 'false'; // WARNING!
type Equal<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false;
type IsRecord2<T, base = any> = T extends Record<infer Keys, infer X> ? Equal<X, base> : false;

// @see https://github.com/type-challenges/type-challenges/issues/225
// @see https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650

// BAD CASE 1 - any/never/unknown参与比较会带来难以预知的结果
type C = Equal<any, 1>;
type G = Equal<[any], [number]>;
type I = Equal<[any, number], [number, any]>;

// BAD CASE2 - （惰性求值的）表达式类型与其结果类型会不等
//   - typeof x
//   - 某些交叉
class MyClass {}
type X1 = typeof MyClass;
type X2 = (new() => MyClass) & {
  readonly prototype: MyClass;
}
type X3 = {
  new(): MyClass;
  readonly prototype: MyClass;
}
interface X4 {
  new(): MyClass;
  readonly prototype: MyClass;
}

// @see src in TypeScript project at https://github.com/microsoft/TypeScript
//  - The keywords `Two conditional types` in src/compiler/checker.ts
type Equal2<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
    ? true
    : false;
type T3 = Equal2<X1, X2>;
