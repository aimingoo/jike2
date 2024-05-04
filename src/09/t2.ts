type Foo = {
    (n: number): void;
    (s: string): void;
}

interface IFoo {
    (n: number): void;
    (s: string): void;
}

let f1: IFoo = function() {};
let f2: Foo = () => {};
let f3: {
    (n: number): void;
    (s: string): void;
} = function() {};

function foo(n: number): void;
function foo(s: string): void;
function foo() {
   
}

class MyClass {
    constructor(n: number);
    constructor(s: string);
    constructor() {
        
    }

    foo(n: number): void;
    foo(s: string): void;
    foo() {

    }
}
