interface MyClass {
    x: string;
}

class MyClass implements MyClass {  // with instance of MyClass
    y: number;
    foo() {
        // ...
    }
    static a: number;
    static b: string;
}
type T = Omit<MyClass, never>
let x = new MyClass;