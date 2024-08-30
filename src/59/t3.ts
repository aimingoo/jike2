// @see https://github.com/microsoft/TypeScript/issues/10886
//  and https://github.com/microsoft/TypeScript/issues/5863
//  and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
//  and https://github.com/tc39/proposal-rm-builtin-subclassing

// 忽略错误并以如下编译参数编译执行
//  > npx tsc --target es6 --module es6 --moduleResolution node t3.ts
//  > node t3.js

// @ts-ignore
class MyArray<T> extends Array<T> {
    static [Symbol.species] = MyArray; // NOTE: 类静态成员不能引用类型参数（例如<T> of MyArray/Array）
    static x = this;

    customMethod() {
        console.log('这是 MyArray 的自定义方法');
    }
}

let ma = new MyArray(42);
let ma2 = (new MyArray(42)).map(x => x) as MyArray<string>;
ma2.customMethod();

// Is unknown/any when T is unset of MyArray<T>
let x: InstanceType<typeof MyArray>;
let x2 = (MyArray<number>)["x"];
type X = typeof MyArray.prototype;
type X2 = typeof MyArray extends typeof MyArray<infer T> ? T : never;
