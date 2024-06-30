// A: 函数的泛型声明（简略）
// ===============
type Func<T> = (a: T) => T;

type TFunc<T> = {
    (a: T): T
    new(a: T): T;
};

interface Intf<T> {
  f1: TFunc<T>; // 实例化TFunc<>
  f2: Func<T>;
  f3: Foo;
}


// B: 在JS中的函数实体（构造器、方法、函数与存取器等）的泛型化
//  - 只要是函数，就都可以反向地绑定泛型参数
// ===============

// 函数（泛型函数）
function Foo<T>(a: T): T {
    return a;
}
type Foo2 = typeof Foo;
let x0 = Foo('abc');

// 类（泛型类）
class TMyClass<T> {
    // a: T   // cant initialize
    constructor(
        public a: T
    ) {}

    func<T>(a: T): T {
        return a;
    }
}
type TMyClass2 = typeof TMyClass; // NOTE: is constructor
let x1 = new TMyClass('abc'); // or, as const
x1.func(123); // binding type paramenter


// 匿名的泛型函数和泛型类
let Foo2 = function<T> (a: T): T { // typeof Foo2
    return a;
}
let TMyClass2 = class<T> {  // typeof TMyClass2
    // ...
}

// B1: 实例化（两种模式）
// ===============
// 1) 通过泛型声明使用它们的实例（或子类化）
class MyClassEx extends TMyClass<string> { // 子类化2（派生一个实例的子类）
    constructor(s: string = '') {
        super(s);
    }
}
class TMyClassEx<T> extends TMyClass<T> { // 子类化2（派生泛型类）

}

// 2）通过构造过程来实例化（包括显式绑定）
let obj = new TMyClass(100);
let obj1 = new TMyClass<number>(100);  // （同上）
let obj2 = new MyClassEx('abc');
let obj3 = new TMyClassEx(100);

// NOTE: `TMyClass` is interface of `TMyClass.prototype`
//  - `TMyClass` equal `typeof TMyClass.prototype`
type MyClass = TMyClass<string>;
let obj4: MyClass = new TMyClass('abc');
let obj5: MyClass = new TMyClassEx('abc');
let obj6: MyClass = new MyClassEx(); // with default value

// 3）通过调用过程实例化（包括显式绑定）
let x = Foo('abc');
let y = Foo<number>(123);


// B2: 带泛型参数的函数类型（实现的实体必须是一个“带泛型参数的函数或类”！）
// ===============
// 1) 函数类型
type Foo = <T>(a: T) => T;  // NOTE: A1
type TFoo = { // NOTE: A1
    <T>(a: T): T
};
interface IFoo { // NOTE: A1
    <T>(a: T): T
};

// 2) 对象类型中方法的声明与接口类似
interface IMyClass {
    foo: <T>(a: T) => T; // 函数类型的“属性foo”, NOTE: A4
    foo2: { // 带调用签名的接口, NOTE: A4
        <T>(a: T): T;
    }
    func<T>(a: T): T;  // 方法func<T>
}

// NOTE: Foo === Foo2 === TFoo === IFoo
let f1: Foo = Foo; // success
let f2: Foo = (a: string) => a; // BAD CASE


// 3) 使用原则：如果Foo(x: T)的参数x是泛型的，那么
//    - 原则1（处理x）：如果要处理x，必须通过类型检查（例如类型守护）来处理它作为泛型的多种可能；
//    - 原则2（传出x）：如果要向新的函数调用Foo2()传出x，则要求Foo2()也必须是一个“带泛型参数的函数类型”。
