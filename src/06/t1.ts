/*
  接口的联合
    - 1、接口联合类型可以被求值（结果是“Bird与Horse的公共父类”）
    - 2、求值并不一定有意义
*/

interface Animal {
    weight: string | number;
    leg: number;
}

interface Bird extends Animal {
    weight: number;
    wings: number;
}

interface Horse extends Animal {
    weight: string;
    id: string;
}

type T = Bird | Horse;
// type Animal = Omit<T, never>; // clone

let bird!: Bird;
let horse!: Horse;

let x1: T = bird;
let x2: Animal = bird;
let x3: Bird | Horse = bird;