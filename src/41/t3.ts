// 在 TypeScript 4.1+ 之后支持的ES规范（包括草案）的特性有：

// 1. 逻辑赋值运算符 (&&=, ||=, ??=)
let x = 0;
x ||= 5; // 等同于 x = x || 5

// 2. 数字分隔符
const a = 1_000_000_000;

// 3. String.prototype.replaceAll()
"aabbcc".replaceAll('b', '_'); // "aa__cc"

// 4. Promise.any 和 AggregateError
Promise.any([/* promises */]).catch((error: AggregateError) => {
    console.log(error.errors);
});

// 6. 私有方法和访问器
class c {
    #privateMethod() { }
    get #privateAccessor() { return 0; }
}

// 7. 顶层 await
const response = await fetch('https://api.example.com/data');

// 8. 类静态初始化块
class MyClass {
    static {
        // 静态初始化代码
    }
}

// 9. 类字段声明
class Example {
    publicField = 0;
    private privateField = 1;
    #truePrivateField = 2;
    static staticField = 3;
}

// 10. 可选链操作符 (?.)
let obj!: object & { [key: string]: any };
const d = obj?.prop?.method?.();

// 12. BigInt
const f = 1234567890123456789012345678901234567890n;

// 13. globalThis
console.log(globalThis); // 在任何环境下都指向全局对象

// 14. for-in 枚举顺序标准化
// 现在for-in循环的顺序在所有JavaScript引擎中都是一致的

// 15. import.meta
console.log(import.meta.url);

// 16. 数组和对象的解构赋值时允许省略最后一个逗号
const [g1, g2,] = [1, 2];
const { h1, h2, } = { h1: 1, h2: 2 };

// 17. Symbol.prototype.description
const sym = Symbol('描述');
console.log(sym.description); // '描述'

// 19. Object.fromEntries()
const i = Object.fromEntries([['a', 1], ['b', 2]]); // { a: 1, b: 2 }

// 20. 数组的 flat() 和 flatMap() 方法
[1, [2, [3]]].flat(2); // [1, 2, 3]
[1, 2, 3].flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// 21. String.prototype.matchAll()
const j = 'test1test2'.matchAll(/test\d/g);

// 22. Promise.allSettled()
Promise.allSettled([Promise.resolve(1), Promise.reject('error')]);

// 23. 动态 import()
const k = await import('./module.js');

// 24. Nullish Coalescing 操作符 (??)
const l = null ?? 'default string';

// 35. WeakRef 和 FinalizationRegistry
let t1!: object;
const ref = new WeakRef(t1);
const b = new FinalizationRegistry(heldValue => {
    // 清理回调
});
