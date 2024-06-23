//-------------------------------------------------
// 示例：使用递归来列举字符串和元组
//  - NOTE: TS 4.7+
//-------------------------------------------------
type ReverseString<T> = T extends string
   ? ReverseString<[T, ""]>  // warp in tuple and resend
   : T extends [infer T2, infer Result extends string]
        ? T2 extends `${infer C}${infer X}`
            ? ReverseString<[X, `${C}${Result}`]>
            : Result
        : never

type T8 = ReverseString<'abcd'>;
type T81 = ReverseString<['abcd', '']>;
type T82 = "" extends `${infer C}${infer X}` ? [C, X] : never;
type T83 = ReverseString<"">;
type T84 = ReverseString<never>;  // WARNNING: 在第一行检测时即返回
type T85 = ReverseString<any>; // ERROR

//-------------------------------------------------
// 约束的语义1 - “必须是”：限制推断类型（参数传入限制）
//-------------------------------------------------
type X6 = {
    a: string;
    b: 1;
    c: 2;
    d: {
      1: string;
      a: number;
    };
};
type T6  = X6 extends {a: infer x; d: infer y extends object} ? [x, y] : false;


//-------------------------------------------------
// 约束的语义2 - “将会是”：结果的类型
//-------------------------------------------------
type T7 = 'a11.234true1234aabc' extends
    `a${infer x extends `1${infer y}`}true${string}` ? [x, y] : never;
//    .*?                .*?          true.*

type T71 = 'a423true1234aabc' extends
    `a${infer L}${infer X extends number}${true}${infer R}c` ? [L, X, R] : never;
//    .         [0-9]+?                  true   .*


// 取枚举中的数字值（联合）
enum T { A, B, C, D, E='abc', F=5, G='def' }; // 0..3, 5
type T61 = `${Extract<T, number>}` extends `${infer N extends number}` ? N : never;
type T62 = `${Extract<T, string>}` extends `${infer S}` ? S : never;



//-------------------------------------------------
// 更简化的版本：使用递归来列举字符串和元组
//-------------------------------------------------
type ReverseString2<T extends string, Result extends string = ''> =
    T extends `${infer C}${infer X}`
        ? ReverseString2<X, `${C}${Result}`>
        : Result
type T20 = ReverseString2<'abcd'>;
