class MyClass {
    constructor(a: string);
    constructor(b: number);
    constructor() {
        // ...
    }

    foo(a: string): void;
    foo(b: number): void;
    foo() {
        // ...
    }
}

function foo(a: string): void;
function foo(b: number): void;
function foo() {
    // ...
}

interface Foo {
    f(a: string): void;
    f(b: number): void;
}