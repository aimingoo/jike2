// @see 01/MyTest.ts
let x = {
    id: 1341534,
    name: '张三',
    age: 25
};

type User1 = { // 别名， 1、字面量对象类型（{...}, {}）; 2、匿名的接口类型
    id: number;
    name: string;
    age: number;
}

interface User2 { // 接口
    id: number;
    name: string;
    age: number;
}

let xx: object = { // 对象类型
    id: 1341534,
    name: '张三',
    age: 25
};


class MyClass2 implements User2 {
    id: number;
    name: string;
    age: number;
}

let x3: User1 = new MyClass2;
let x4: User2 = new MyClass2;
let x5: MyClass2 = new MyClass2;



for (var key in x) {
  console.log(key);
}
console.log('id' in x);

console.log(new Function instanceof Object); // true
let f = new Function;
f();

function Foo() {

}
let f2 = new Foo();

class MyClass extends Object {

}
let x2 = new MyClass;
console.log(typeof MyClass); // 'function'


type T1 = string | 'a';  // string

let arr = [1,2,3];
console.log(arr[0]); // string, number, symbol
