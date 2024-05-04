interface MyClass {
    x: number;
}

interface MyClassConstructor {
    new(): MyClass;
    (this: MyClass): void;
    prototype: MyClass; // readonly
}

let MyClass = function() {
    this.x = 100;
} as MyClassConstructor;

let x = new MyClass();

