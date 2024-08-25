// 1) 重载（多重签名）的实现
function greet(person: string): string
function greet(person: string[]): string[]
function greet(person: string | string[]): string | string[] {
    if (typeof person === "string") {
        return `Hello, ${person}!`
    } else if (Array.isArray(person)) {
        return person.map(name => `Hello, ${name}!`)
    }
    throw new Error("Invalid argument")
}

type T1 = [a: string, b: string];
type T2 = [a: number, b: boolean];
type T3 = [a: string];
type T4 = [a: 'aa', b: string, c: ()=>void];

type T = T1 | T2 | T3 | T4;
type TT = [a: string|number, b?: boolean|string, c?: ()=>void];
type funcs = T extends infer U ? U extends infer u extends any[] ? ((...args: u)=>void) : never : never;
type ALL<U, T> = U extends T ? true : false;
type X1 = ALL<T, TT>; // all T is TT
type X2 = ALL<funcs, (...args: TT)=>void>; // all funcs is (...args: TT)=>void


// 2) 在参数中使用解构（NOTE: 反向推断的使用）
//  - @see jike/32/t1.ts
type Points<X, Y> = { x: X; y: Y };
function printCoordinates<X, Y>({ x, y }: Points<X, Y>): void {
    console.log(`X: ${x}, Y: ${y}`)
}

// 3) 缺省参数与可选参数，以及回调函数的参数
// (第58讲)


// 4) 类型的“变型”问题 / 变型注解
// --------------------------------------------------------------------
// 4.1) “函数的”参数在处理“类型兼容”时的检查逻辑（子类型可以赋给父类型）
function f(s: string): string {
    return 'abc';
}
f('abc');

// 4.2) “函数类型的”参数缺省时是双向协变的
let func!: (s: string) => void;
let foo!: (s: 'abc') => void;
func = foo;  // WARNNING: func('xxx')
foo = func;

type A = typeof func;
type B = typeof foo;
type T10 = A extends B ? true : false;
type T11 = B extends A ? true : false;

// 4.3) F<T>是逆变的
type F<in T> = (s: T) => void; 
type F1 = F<1>;
type F2 = F<number>;
