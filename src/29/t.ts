type T<X> = {
    a: X;
}
type T10 = T<number>;

type F<X> = (s: X)=>void;

type A1 = Array<string>;
type T11<X> = [X, string];
type T12<X extends string> = {
    [x in X]: any;
}

interface Intf<T> {
    a: T;
    foo(): T;
}

class MyClass<T> {}

type ToUnion<T extends string> =
    T extends `${infer U}${infer V}` ? U | ToUnion<V> : never;

type S = ToUnion<'abcd'>;
type T1 = S extends ToUnion<infer X> ? X : never;


type A = Array<'abcd'>;
type T2 = A extends Array<infer X> ? X : never;

type RR<T> = {
    a: T;
    b: T | string;
    c: T & {};
}
type R3 = RR<string>;
type T3 = R3 extends RR<infer X> ? X : never;

type R4 = Record<'a'|'n'|1, `_${any}_`>;
type T4 = R4 extends Record<infer K, infer T> ? [K, T] : never;