// 在29讲说明过两个话题
//   1）泛型是“基于类型泛化”来构建类型系统，但仅仅拿Array<X>做了示例
//   2）泛型声明，都是“未实例化的类型” ，能“反向推断”（实例化时）传入的类型是它最重要的性质！

// 1) 模板字符串
type TemplateParaments = string | number | bigint | boolean | null | undefined;
type T1<X extends TemplateParaments> = `_${X}_`;

// 2) 元组、数组、记录
// （略）
type T2<X> = [X, ...string[]];

// 3) 对象、带索引签名的对象、映射
type T3<X> = {a: X};
type T4<X> = {  // ts(1337): 索引签名参数类型不能是字面量或泛型
    [k: string]: X;
    a: X;
};
type T5<K extends PropertyKey, X> = {
    [k in K]: X
};

// 4) 接口
interface Intf1<T> {
    a: T;
}

type Intf2<T> = { // 参见“3) 对象类型”
    a: T;
}

// @see globals.d.ts
// ----------------------------------------------------------------------
interface String extends RelativeIndexable<string> {}
interface Array<T> extends RelativeIndexable<T> {}
// ----------------------------------------------------------------------

// 5) 表达式类型：联合，或惰性求值
// （表达式类型的惰性求值：略）
type U<X> = 'a' | number | undefined | X;


// 6) 具名函数、类、函数类型
// （略，第31讲）
