// 基本逻辑
type L = 1
type R = 2
type X = 3
type Y = 4
type T = L extends R ? X : Y;


/* 以下是惰性求值在【表达式类型】中的情况
  - 某些情况下，是TypeScript中“显示类型的方式”表现出来的“类似于延迟计算”的现象
    @see release-notes/typescript-4.2.html `Type Alias Preservation`
    @see release-notes/typescript-5.0.html `Type display`
*/
//  - 带模板参数的模板字符串字面量类型
type T1 = `_${string}_`;  // `_${string}_` ...
type Trans<T> = T;  // 验证
type TransX = { a: keyof X2 }; // 验证2

//  - 某些keyof T
type X2 = {a: string; b: number};
type T2 = keyof X2;

//  - 某些typeof V
let v = {a: 'a', b: 1};
function FooX() { }
class MyClassX {}
type T3 = typeof FooX;  // 某些情况下（例如FooX或v）是直接求值的

//  - 某些含剩余元素语法的元组
type T4 = [number, ...string[]];
type T41 = [...string[]]; // 这个不是惰性求值的
type T42 = [...T4]; // （同上）

//  - 带惰性求值类型的映射
type T5 = {
    [k in `_${string}_`]: any;
}
type T51 = { [k in string]: any; } // string是单类型（非惰性的、非表达式的），将求值到一个带索引签名的对象类型
type T52 = { [k in keyof T4 as string]: any; } // （同上，求值计算过程之后，结果被优化）

//  - 结构类型的交叉（包括在类型收窄等在内的多数情况下）
type T6 = typeof v & {a: string};

//  - 索引访问由于要检查下标，所以通常“总是”非惰性的
// （略）

//  - 联合类型（对结构类型和表达式类型总是尽量惰性求值）
// （略）


// -------------------- 这里是友好的分割线 --------------------
/* 以下是惰性求值在【单类型】中的情况
  - 带泛型参数的结构类型（单类型）也是惰性求值的，但在语义上是【实例化】一个泛型声明，而不是求值。
*/
type T7<T> = { a: T, b: T | string }
type T8<T> = () => T | null;
class MyClass<X> { foo: T8<X> };
// more ...


// 以下两种，都称为“未实例化的类型”：
//  - A: 如果工具类型的求值结果是返回一个参数化类型的自身，那么该工具类型可以视为“未实例化的类型”。
//  - B: 任何带参数的结构类型，都可以称为“末实例化的类型”。
type A1<T> = {[k in keyof T]: any}; // ex, Record<>
type B1<T> = {a: T};  // ex, Array<>

// 反例（Exclude, ...）
type IsNever<T> = never extends T ? true : false;
type C1 = IsNever<never>;
type IsNever2<T> = T extends never ? true : false;
type C2 = IsNever2<never>;

// -------------------- 分割线+1 --------------------

// 以上所有类型（包括单类型）作为条件表达操作数
//   - 如果是L/R操作数，总是立即求值的（除非L是裸的never类型）
//   - 如果是True/Flase分支，则是在该分支中作为结果被返回的（只作传出没有后续计算时，通常不求值）
type T10 = keyof X extends (typeof v & {a: string}) ? T2 : typeof v & {a: string};
type T11 = {a: 'abc', b: 10} extends (typeof v & {a: string})
    ? keyof X  // try `keyof X2`, or `T2`
    : typeof v & {a: string};

// 如果有未实例化的类型，那么将部分地（尽量地）考虑该类型的可兼容性赋值的状况
//   - 最终有可能返回惰性的求值结果（表达式本身）
class MyClass2<T> {
    foo(x: T) {
        return x;
    }
    func!: { (y: T, ...args: any[]): T[] }
}
type T12 = typeof MyClass2.prototype;
type T13 = T12['foo'] extends T12['func'] ? true : false;


// -------------------- 增强版的分隔线 --------------------
// -------------------- 增强版的分隔线 --------------------
// -------------------- 增强版的分隔线 --------------------
// 【延迟求值 vs. 未实例化类型】
// NOTE：讲述，什么是“严格意义上的”惰性求值（亦即是延迟计算，deferred）

// 1) 所有“未实例化的类型”都是延迟求值的，直到它的参数能被代以确定的类型值为止。
class MyClass3<X> {
    a!: A1<X>; 
    b!: 1;
    constructor(x: X) {}
}
// 实例化的
let x =  new MyClass3('a');
type TypeOfX = typeof x;
// 未实例化的
//   - 注意在这里MyClass2.a是声明了一个“A1”类型，后者显然是映射类型，但是它是“未实例化的”，并且由
//     于类型X未知，所以它在后续运算是“总是”处于未实例化的状态。
type TypeOfX2 = typeof MyClass3.prototype;

// 2) 那么两个“延迟求值的表达式类型”如何比较兼容性呢？
//  - 有泛型参数，并不一定就是延迟计算的 @see release-note/typescript-2.8.html
type Tx1 = TypeOfX2 extends {b: number} ? true : false;
//  - Tx2将是延迟求值的（Deferred）
type Tx2 = <X>() => X extends 'T' ? 1 : 2;
type Tx21 = Trans<Tx2>;
type Tx22 = {
    a: <X>() => X extends 'T' ? 1 : 2;
}
//  - compare 'T1 extends U1 ? X1 : Y1' and 'T2 extends U2 ? X2 : Y2'
type Tx3 = 
    (<X>() => X extends 'T' ? 1 : 2) extends
    (<Y>() => Y extends 'U' ? 1 : 2)
        ? true
        : false
