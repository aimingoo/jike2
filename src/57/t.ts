/*
  上下文/作用域，指的是一个标识符（类型名）起作用的区间或范围
    - 1) 语法范围，例如常见的一对大括号
    - 2) 表达式中的部分区间，例如infer X ? ...
    - 3) 语法占位符（无作用域），例如索引签名“[K: ...]: ...”
*/

// 条件表达式类型的上下文
type T1<A> = A extends infer X ? X : never;  // infer X 只能作用于True分支
type T2<U> = U extends infer u ? u : never;  // u 只对单个分量的迭代有意义（U 在每个迭代中也仅指代分量）

// X 类型参数的作用域（上下文）
function foo<X>(x: X) {
  // ...
}

// （同上）
class MyClass<X> {
    // ...
}

// K 的上下文是整个成员声明语法“Name: Type”
type T3<T> = {
    [K in keyof T]: K;  // { ... }
}

// K 是没有有意义的作用域的
type T4 = {
    [K: string]: any;
}

// 作用域的覆盖
class MyClass2<T> {
    // ...
    foo<T>(x: T): T {  // 注意T类型在类的上下文中的不一致
        return x
    }
}
