// 推断、约束与缺省，都是“类型参数”上的相关技术或语法特性。什么是类型参数？
// ---------------------------------------------------------------
type A<T> = keyof T; // or interface

type B = '' extends infer T ? T : never; // `_${infer T}_` or more

function Foo<T>(a: T): T {
    return a
}
type C = <T>(a: T) => T;  // typeof Foo


// 回顾“28 | 约束（constraint）”中的内容
// ---------------------------------------------------------------
// 更简化的版本：使用递归来列举字符串和元组
type ReverseString2<T extends string, Result extends string = ''> =
    T extends `${infer C}${infer X}`
        ? ReverseString2<X, `${C}${Result}`>
        : Result
type T20 = ReverseString2<'abcd'>;

// 在第28讲中讨论的约束，是在`infer X extends ...`这个语法中约束X的类型用的，它有两个作用
//   - X “必须是” ...
//   - X “将会是” ...
type T1 = '114a314' extends `${string}a${infer X extends number}` ? X : never;

type T2<X extends string> = {
   // 这里的“约束”有且仅有一个语义：限制`X 必须是...`
}

interface Animal {
    weight: number;
}
interface Bird {
    weight: number;
    leg: number;
    wings: number;
}
function func<T extends Animal>(a: T): T {
  return a
}

// “推断”包括：1、TS的一般推断（如果没有声明类型，那么就推断类型）；2、使用infer的显式推断；3、在函数界面上的隐式推断；4、NoInfer<X>;
//  （类型标注、类型识别和类型推断，是TS中“作用于JS变量时的”三种主要类型应用/功能/行为）
// ---------------------------------------------------------------

let x = 'abc';

function foo<T>(a: NoInfer<T>, b: T) {

}

function foo2<T>(a: {x: T}): T {
    return a.x
}
let x1 = {x: 'abc'};
let x3 = foo2(x1)



// 只有两种泛型参数可以缺省
// ---------------------------------------------------------------
// CASE0 - 泛型声明（或泛型工具）中的缺省参数
type T3<T = Object> = keyof T;
type T4 = T3;

// CASE1 - 泛型函数中的“缺省的泛型参数”的用法
function foo3<T, U = T extends {a: infer X} ? X : never>(a: T, b?: U) {
    let x!: T;
    return x as unknown as U;
}

foo3({a: 123})

// CASE2 - 为参数标注合适的类型（并同时支持反向地推断类型）
function foo4<T, U, X>(a: T extends {a: infer U, b: infer X}) { // 这是一个假设的语义

}

// CASE2.1 - 利用缺省参数
type D = {a: string, b: number}
function foo41<
    T extends D,
    U = T extends {a: infer U} ? U : never,
    X = T extends {b: infer X} ? X : never
>(a: T): X {
    return a.b
}
