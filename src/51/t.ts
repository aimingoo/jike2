// 三种this

// 示例: 在构造器/构造方法中使用this类型
class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

// 1. this指向当前的、静态上下文中的Home Object（例如ES6之后的方法）
class MyClass {
    name: string = "MyClass";
    sayHello() {
        console.log("Hello, " + this.name);
    }
}
const person = {
    name: "person",
    sayHello() {
        console.log("Hello, " + this.name);
    }
};

person.sayHello(); // Output: Hello, person


// 2. this指向用户声明的类型（NOTE：this可以被重写或重定义）
interface Person2 {
    nick: string
}
class MyClass2 {
    name: string;
    nick: string = "MyClass";

    // NOTE: `super` 是通过静态的 Home Object 来推断的，而不是通过实例对象
    sayHello(this: MyClass2|Person2) {
        console.log("Hello, " + this.nick);
    }
}

const person2 = new MyClass2();
let x:Person2 = {} as Person2;
person2.sayHello.call(x)
person2.sayHello(); // NOTE: recheck


// 3. this指向全局或undefined（NOTE：在严格/非严格模式下的区别）
function sayHi() { // NOTE: this: Global | void
    console.log("Hi, " + this);
}

sayHi(); // Output: Hi, [object global] (in non-strict mode)
