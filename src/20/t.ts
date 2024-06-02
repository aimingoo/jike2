/* 前置知识
1、keyof只返回 string|number|symbol|never 以及它们的子类型的联合。
2、'a' 能赋值给 string，但反过来string不能赋值给'a'；etc. 
3、A extends B ? X ：Y的简单语义。
*/
type T = {
    [k: string]: string | number;
    a: string;
    b: number;
    c: 1;
}

// 一般使用
type T1 = {
  [k in keyof T]: T[k]; // readonly or optional ..
}

// 自定义的联合
type U = Exclude<keyof T, 'b'>; // or any union type
type T2 = {
  [k in U]: any; // or any types
}

// 断言语法
type T3 = {
  [k in U as string]: any;  // k as string
}

type T31 = {
  [k in string]: any;
}

type T32 = {
  [k: string]: any;
}

// 联合成员的过滤1：extends
type keys = keyof T;
type U1 = 'a' | 'b';
type T4 = {
  [k in keys as (
    k extends U1 ? k : never)]: T[k];  // make a accepted list
}

/*
// 当声明string类型的签名时，number是隐式声明的
type T5 = Omit<T, never>;
type T6 = Exclude<keyof T, never>

// 数组或元组是带索引签名的，并且keyof中的数字索引是转换成字符串key的
type T7 = Exclude<keyof [string, number, boolean], never>;
*/

// 联合成员的过滤2：keyof T 在in的右侧时，求值但不合并
type T9 = {
  [k in keyof T as (  // keyof T 在in的右侧时，求值但不合并
    k extends 'c' ? k : never)]: T[k];
}

// 非联合成员：模板字符串字面类型
type P = `a${string}b`
type T10 = {
  [k in P]: any;
}
...
