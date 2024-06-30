// 在泛型参数推断中，支持对函数参数进行【类型标注】
// ---------------------------------------------------------------
type Foo2A = {
    a: string;
    b: number;
    c: string;
    d: 'abc';
    e: string;
    f: 'hi';
    g: boolean | string;
}
type Foo2B = {
    a: string;
    b: number;
    c: string;
    d: 'abc';
    e: string;
    f: 'hi';
    g: boolean | undefined;
}
type Foo2C = {
    a: string;
    b: 'abc';
    c: string;
    d: 'ddd';
    e: string;
    f: 'hi';
    g: undefined;
}
function foo2<T>(a: (Foo2A|Foo2B|Foo2C) & {g: T}, b: boolean): T {
    return a.g
}

let x!:Foo2C;
let x2 = foo2(x, true)
