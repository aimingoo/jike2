// BAD CASE
type SingleUnion = any | never | unknown | void | null | undefined | 1 | 'a' | string | true | false | boolean;
type U1 = SingleUnion extends 'a' ? true : false;
type U2 = {
    [key in SingleUnion]: SingleUnion extends SingleUnion[key] ? true : false;
}

// Tuple based
type Singles = [any, never, unknown, void, null, undefined, 1, 'a', string, true, false, boolean];
type X = Omit<Singles, never>;

type T = {
    [k in keyof Singles as (  // Singles is Tuple
        k extends symbol
            ? never
            : k extends infer X extends string
                ? `${X}` extends `${number}`
                    ? k
                    : never
                : never
    )]: Singles[k] extends 'a' ? true : false
};

type T1 = {
    [k in keyof Singles as (
        k extends string
            ? `${k}` extends `${number}`  // k extends `${number}`
                ? k
                : never
            : never
    )]: Singles[k] extends 'a' ? true : false
};

type T2 = {
    [k in keyof Singles as (
        k extends string & `${number}`
            ? k
            : never
    )]: Singles[k] extends 'a' ? true : false
};

type T3 = {
    [k in keyof Singles as Extract<k, `${number}`>]: // `${number|'length'}`
        Singles[k] extends 'a' ? true : false
};

type T4 = {
    [k in keyof Singles]: k extends `${number}`
        ? Singles[k] extends 'a' ? true : false
        : Singles[k]
};


// -------------- 我是分隔线 --------------

type T6<T> = {
    [k in keyof T]: k extends `${number}`
        ? T[k] extends 'a' ? true : false
        : T[k]
}
type T61 = T6<Singles>;

// 在泛型工具的出口，映射类型会做一些后续处理，例如将结果修正为元组或数组。参见如下
//  @see release-notes/typescript-3-1.html#mapped-types-on-tuples-and-arrays
//  @see https://devsuhas.com/2018/11/18/typescript-3-1/
// 必须是1、是用keyof来操作的裸类型参数；2、是完全映射（即使是`... as k`也是不行的）
type MapT<T> = {
    [k in keyof T]: T[k]
}/*  */
type T7 = MapT<Singles>;
type T71 = MapT<T4>;

type MapTX<Source, T> = {
    [k in keyof Source]: k extends keyof T ? T[k] : Source[k]
}
type T72 = MapTX<Singles, T2>; // ObjectToTuple<>

type MapMartix<Source> = {
    [k in keyof Source]: k extends `${number}`
        ? MapTX<Source, {
            [i in Extract<keyof Source, `${number}`>]:
                Source[k] extends Source[i] ? true : false
          }>
        : Source[k]
}
type T8 = MapMartix<Singles>;
