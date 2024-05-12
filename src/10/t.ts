interface T {
   [key: string]: string|number;
}

class MyClass implements T {
    [key: string]: any;

    a = 'false';
    static x = false;
}

type Foo = {
    (): void;
    [key: string]: any;
}