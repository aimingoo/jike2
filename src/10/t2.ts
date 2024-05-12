type Arr1 = string[];
type Arr2 = Array<string>;

let arr: string[] = [];

type T = Omit<Arr1, never>;

type TArr = {
    [x: number]: string;
    // ...
}

let x: [string, number] = ['a', 1];
type TupleX = [string, number]; // x.length = 2, [1], [2]
// type TX = Omit<TupleX, never>;
interface TX extends Array<string|number> {
    readonly length: 2;
    0: string;
    1: number;
}

function foo(a: string, b: number): void {

}

type TFooArgs = [a: string, b: number];
