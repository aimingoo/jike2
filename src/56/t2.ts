// @see jike/35/t.ts

// 5）in/out参数
//  - NOTE: “方法参数”总是双向协变的
function swap<T>(a: { value: T }, b: { value: T }): void {
    const temp = a.value
    a.value = b.value
    b.value = temp
}
type Swap = <T>(a: {value: T; }, b: { value: T; }) => void

// 类、接口或类型别名的类型参数
type Swap2<in T> = (a: T, b: { value: T; }) => void
class MyClass<out T> {
    constructor(public value: T) {}
    // f: (a: T) => void;
    foo(x: T) {
        return ''
    }
}

// 变型修饰符（方差注释，变型注解）
//  - “in”修饰符只能出现在类、接口或类型别名的类型参数上ts(1274)
//  - 仅结构类型（包括对象、函数、构造函数、映射类型）的类型别名支持方差注释。ts(2637)
interface MyInterface<in T> {
    // value: T;
    value: (x: T)=>void;
    foo<T>(x: T): void;
}


// 协变
type X1<out T> = [T, T];  // 元组/数组的成员
type X11<out T> = T[];  // 数组的成员
type X12<out T extends any[]> = [...T];  // 被展开的类型
type X2<out T> = {x: T};  // 对象、接口或类的成员
type X4<out T> = ()=>T;  // 函数或构造签名的返回
type X5<out T, out X extends keyof T> = {
    a: T[X];  // 下标存取中的类型T与X
}

// 逆变
type X7<in T> = {
    a: keyof T;  // keyof的类型
}

type X8<in T extends PropertyKey> = {
    [k in T]: string;  // 映射中被映射的类型
}

type X9<in T> = (x: T) => void; // 函数参数
type X91<in T> = {
    (x: T): void
}
