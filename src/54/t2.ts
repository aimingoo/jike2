import * as ns from './t1'; // import namespace using es6 module syntax
import t1 from './t1'; // default export is a namespace(with/without named function)
import tt = ns.tt; // alias of sub-namespace


class MyClassEx extends ns.MyClass {
    // ...
}

// 显式地“扩展”模块的类型
//  - 这里的“模块”是指.ts的文件，而不是指ts中的namespace/module
declare module './t1' {
    interface MyClass {
        b: number;
    }

    namespace tt {
        namespace sub {
            var d: number;
        }
    }
}

let x = new t1.MyClass;
x.b = 100; // OK

console.log(ns.tt.sub.c); // 100
ns.tt.sub.d = 100; // OK
