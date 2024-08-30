// @see https://stackoverflow.com/questions/38189402/generic-classes-constraints-and-inheritance

class Widget<T> {
  public value: T;
}
// w2.value = [T, T, T, ...]


class ArrayWidget<T> extends Widget<T[]> {
}

class ArrayWidget2<T extends any[]> extends Widget<T> {
}

let w = new Widget<string>();
w.value = "abc";

let aw = new ArrayWidget<number>();
aw.value = [1, 2, 3];

let aw2 = new ArrayWidget2<number[]>();
aw.value = [1, 2, 3];

// 1) 复杂的extends ...子句
//  - @see TypeScript/tests/cases/compiler/...


// 2) 如何利用构造界面并反向推断
function ArrayWidgetX<T extends any[]>(...value: T[]): ArrayWidget2<T> {
  let aw = new ArrayWidget2<T>();
  aw.value = value;
  return aw;
}
class ArrayWidget3<T> extends Widget<T[]> {
  constructor(...args: T[]) {
    super();
    this.value = args;
  }
}
let aw3 = new ArrayWidget3(1,2,3);


// 2) 如何重置Symbol.species
//  - NOTE1: TS完全不建议派生Array的子类！
//  - NOTE2: 如果有子类行为，建议使用as接口的方式
class MyArray extends Array<string> {
}

let ma = new MyArray(42);
let ma2 = (new MyArray(42)).map(x => x);

// cases
type T1 = Array<string>[typeof Symbol.iterator]; // Array<string> is type
let x1: Array<string> = new Array(); // pass

type T2 = (typeof Array<string>)[typeof Symbol.species]; // Array<string> is function
let x2 = Array<string>; // pass

type T3 = (typeof MyArray)[typeof Symbol.species];
let x3 = MyArray[Symbol.species]; // pass

console.log(ma instanceof MyArray); // true


// 3) 在子类中重写constructor和Symbol.species
//  - @see t3.ts

export {}
