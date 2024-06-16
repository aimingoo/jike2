// 基础语法
type L = 1;
type R = number;
type T = L extends R ? true : false;

//-------------------------------------------------
// 1） 命名（声明临时变量/参数/类型参数）
//-------------------------------------------------
type TRT<T, R = T> = T extends R ? Exclude<R, T> : never;

type TRT2<T> = [T] extends [infer R]
   ? T extends R ? Exclude<R, T> : never
   : never;

type AllKeys2<T> = [T, PropertyKey] extends [infer R, infer X]
   ? T extends R
      ? keyof {
         [k in keyof T as
            (X extends k ? k : never) extends never ? k : never
         ]: T[k]
        }
      : never
   : never;



//-------------------------------------------------
// 2） 在语义上的`x in U`列举
//-------------------------------------------------
// 第26讲 @see jike/26/t.ts
type TTT<T> = T extends infer k ? k : never;


// type X8 = {
//    [k in T as 0]: k    // NOTE: 这里将会出现{ 0: U1| .. |Un }
//  }


//-------------------------------------------------
// 3） 解构（匹配、推断、提取）
//-------------------------------------------------
// 第21讲 @see jike/21/t.ts
//  - 定界符（定界字符串）、其它匹配（通用匹配）
type ToUnion<T extends string> =
    T extends `${infer U}${infer V}` ? U | ToUnion<V> : never;

type S = 'abcdefghijklmnopqrstuvwxyz';
type Low = ToUnion<S>;

// 基础类型可以转换成模板字符串处理
//  - string, number, bigint, boolean, true, false, null, undefined, never
//  - 某些情况下能处理的：any, never
//  - 不能处理的：symbol, unknown/void/this
type T2 = `aafdsf;ajl;dg` extends `${any}s${any}${infer x};${infer y}` ? [x, y] : false;
                              //   .*?   s.     .*?       ;.*
type T3 = never extends `a${infer x}${infer y}b` ? [x, y] : false;

// 结构类型使用匹配/提取的语义
//  - 只能使用一个剩余元素（rest elements）
type T4 = [string, 'a', number, false] extends [infer x, ...infer more] ? [x, more] : never;
type T51 = [string, 'a', number, false] extends [infer x, ...infer more, false] ? [x, more] : never;
type T52 = [string, 'a', number, false] extends [infer x, ...infer more1, number, ...infer more2] ? [x, more1, more2] : never; // BAD CASE

type X6 = {
  a: string;
  b: 1;
  c: 2;
  d: {
    1: string;
    a: number;
  };
};
type T6 = X6 extends {a: infer x; d: infer y} ? [x, y] : false;

type T7 = (a: string) => void extends (a: infer x) => infer y ? [x, y] : never;  // BAD CASE
      //  ----------     ------------------------------------
type T71 = ((a: string) => void) extends ((a: infer x) => infer y) ? [x, y] : never;

//  - 善用Pick<>/Omit<>
// rest properties ?
// type XX3<T> = T extends {'a': any; ...infer props} ? props : never;
type X7<T> = Omit<T, 'a'>;
// type XX4<T1, T2> = {...T1, ...T2};
type X8<T1, T2> = Omit<T1 & T2, never>;
