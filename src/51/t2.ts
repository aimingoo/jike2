'use strict';

// 示例: 在构造器方法中使用this类型
class Person { 
    name: string;

    constructor(name: string) {
        this.name = name;
        this.hi();
    }

    hi() { }
}
console.log(new Person("Alice").name); // 输出: Alice



// 示例1: 使用显式的this参数
function printName(this: { name: string }) {
    console.log(this.name);
}

const obj1 = {
    name: "Bob"
};

printName.call(obj1); // 使用call方法将obj2作为this参数传递给printName函数，输出: Bob
printName.call(null); // WARNNING: 类型检查是失效的
let obj11 = {name: 'ahi', printName }; // 将printName函数作为obj21对象的方法
obj11.printName(); // SUCCESS: 类型检查


// 示例2：this引用会导致类型推断错误（无法推断并隐式声明为any）
type T2 = {
    name: string;
    greet: () => void;
}
const obj2: T2 = {
    name: "Alice",
    greet: function(this: T2) { // NOTE: this: typeof obj1
        setTimeout(() => {
            console.log(`Hello, ${this.name}!`); // 使用箭头函数保留了外部函数的this指向
        }, 1000);
    }
};
obj2.greet(); // 输出: Hello, Alice!


// 示例3：Three `this`!
interface T3 {
    printName(this: this): this
}
let obj3: T3 = {
    printName(this) { // NOTE: Must be `T3`?  NO!
        return this; // NOTE: typeof `this`
    }
}
type X = <T>(this: T) => T;

// 示例4: 将 this 声明成 void 类型
//  - 并没有任何特殊的含义，只是为了让TypeScript不再检查this的类型
function getThis(this: void) {
    console.log("1", typeof this);
    return this;
}

let obj4 = { getThis }; // @see obj11 in `示例1`
getThis(); // 输出: undefined
if (obj4.getThis() === undefined) {
    console.log("2", "this is undefined");
}

console.log('-------------------');

// 示例5: 在Promise的then链中使用this类型
//  - @see then() in Promise
class User {
    foo(): this {
        // ...
        return this;
    }
    bar(): this  {
        // ...
        return this;
    }
}
let obj5 = new User();
obj5.foo().bar(); // chain
