let a = 100;
let b = 200;

function foo() {
    console.log(a - b);
}

class MyClass {
    sayHello() {
        console.log("Hello");
    }
}

// export {}

// 模块声明与（模块中的）导出
//  - 你不可以“声明”一个字符串的模块名
declare module aaa {
    let a: string
 }
 
// 模块代码（注意模块名的合并）
module aaa {
    export let b: string;
    let c: string = 'abc';
    console.log(c);
}


// 模块扩展（或环境模块声明）
declare module "t55" {
    let a: string;
}
declare module "t56" {
    export * from "t55"
}
