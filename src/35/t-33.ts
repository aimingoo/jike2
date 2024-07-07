// Utilities from jike/33/t.ts

type IsAny<T> = 0 extends 1 & T ? true : false;
// type IsNotAny<T> = true extends IsAny<T> ? false : true;

type IsNever<T> = [T] extends [never] ? true : false;
// type IsNotNever<T> = true extends IsNever<T> ? false : true;

// true, false
type Not<T extends boolean> = true extends T ? false : true;
type NotAnyNever<T> = false extends IsAny<T> ? Not<IsNever<T>> : false;

// fixed @see 33/t.ts
type IsUnion<T> = NotAnyNever<T> extends true
    ? T[] extends (infer U)[] ? T extends infer t ? ([U] extends [t] ? false : true) : never : never
    : false;
