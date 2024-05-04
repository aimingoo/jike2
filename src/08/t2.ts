interface IFoo {
  foo(s: string): void;
  foo(n: number): void;
}

class MyClass implements IFoo { // extends
   foo() {

   }
}

class MyClass2 {
   foo() {

   }
}

// MyClass兼容于IFoo
let x1: IFoo = new MyClass(); // 1、MyClass与IFoo是子类型兼容的（继承关系）
let x2: IFoo = new MyClass2(); // 2、MyClass与IFoo是结构兼容的
