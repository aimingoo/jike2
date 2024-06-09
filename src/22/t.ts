// 条件类型：类型检查
type L = 'abc';
type R = string;
type T = L extends R ? true : false;  // L extends R ? X : Y

// 示例，从映射中去除签名
type T1 = { // jike/20/t.ts
  [k: string]: string | number;
  a: string;
  b: number;
  c: 1;
}

type T2 = {
  [k in keyof T1 as (
    string extends k ? never : k
  )]: T1[k];
}

type T21 = Exclude<keyof T1, string>;

// 两种语义（基础类型，注意交换L/R与交换X/Y是不同的）
type Is<T, target> = T extends target ? 'true' : 'false';
type Equal<T, target> = target extends T ? Is<T, target> : 'false'; // WARNING!
type C1 = Is<'abc', string>
type C2 = Equal<string, string>

// 非裸类型参数
type X<T> = T;
type XN1 = `${U}`;
type XN2 = U[];
type XN3 = [U];
type XN4 = X<U>;
type XN5 = Promise<U>;

// 两种特殊的“裸类型参数（naked type parameter）”
//   - 作为“泛型参数”传入
//   - 以“祼类型参数”的形式参与extends左侧运算
type U = 'a' | 2;
type X1 = Is<U, string>;   // X, Y, X|Y
type X2 = Is<never, string>; // never


// any是特殊的（boolean与enum并不特殊，它们都是按联合来处理的）
type X3 = Is<any, false>;
type X31 = any extends false ? 'true' : 'false';
type X4 = Is<boolean, true>;
type X41 = boolean extends true ? 'true' : 'false';
enum E {a, b, c}
type X5 = Is<E, 1>;
type X51 = E extends 1 ? 'true' : 'false';


// 【问题】在类型集合（Collections）中，将基础类型与结构类型分开处理
//  - 表达式类型：联合（包括boolean/enum）
//  - 单类型：数组、元组、string、number、symbol、bigint
//  - 单类型（特殊类型）：any和never
type O1 = { a: 'a' };
class O2 { a: 'a'};
enum O3 {a, b};
function O4() { };
interface O5 { };
type Arr = string[];
type Tuple = [1,2,3];
type B1 = Exclude<
  'a' | 1 | null | 223 | bigint | O1 | O2 | O3 | O5 | Arr | Tuple | typeof O4 | typeof O2,
  object>;
type B2 = Extract<
  'a' | 1 | null | 223 | bigint | O1 | O2 | O3 | O5 | Arr | Tuple | typeof O4 | typeof O2,
  object>;
