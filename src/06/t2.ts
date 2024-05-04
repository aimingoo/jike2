/*
  接口的交叉
    - 1、会深度遍历每一个成员的交叉（例如weight的类型交叉结果是never）
    - 2、交叉类型总是尽量向never收敛的
*/

interface Bird {
    weight: number;
    leg: number;
    wings: number;
}

interface Horse {
    weight: string;
    leg: number;
    id: string;
}

type T = Bird & Horse; // & undefined & void & null & ...
type BirdAndHorse = Omit<T, never>; // clone

// class MyClass implements T {
// class MyClass implements Bird, Horse {
class MyClass implements BirdAndHorse {
    weight: never;
    leg: number;
    id: string;
    wings: number;
}

let x:MyClass = new MyClass;