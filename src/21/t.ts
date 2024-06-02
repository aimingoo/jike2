// 模板字面量类型
type T = `abc`; // 简单字符串

// （带模板参数的）模板字面量类型
type T1 = `a${string}c`; // 模板字面量类型


// ----------------------------------------
// 将模板字符串用于其它类型表达式
// ----------------------------------------

// interface, object literal or alias types with index signature
type T2 = {
    [x: T1]: number; // deny type T
    abc: 1;
    abbc: 2;
    abac: boolean;
    abaaac: 4;
    abb: 5;
    abokn: boolean;
}

type P2 = T2[T1]; // support template with variables/parameters, but will pre-check `keyof T1`

// mapping, as index signature
type T3 = {
    [k in T1]: number; // support
    // 'abc': 1;       // deny
}

// keyof T
type U2 = keyof T2;   // support

type T4 = T3 & {
    // [x: T1]: number;
    abc: 1;
    abbc: 2;
    abac: boolean;
    abaaac: 4;
    abb: 5;
    abokn: boolean;
};
type P6 = T4[`a${string}c`];

// mapping with intersection
type T5 = {
    [k in keyof T4]: T4[k];
}

// A | B
type T6 = `a${string}c` | 'ab' | 'abb' | 'ac' | 'abc'; // support and merged

// A & B
type T7 = `a${string}c` & 'abc'; // support and converged


// ----------------------------------------
// 将其它类型表达式用作模板参数
// ----------------------------------------
type U = 'a' | 'b';
type T10 = `a${U}b`

type X = keyof T2; // 1、keyof T和`...`总是安全的；2、typeof V，T[K]，A & B总是预先求值；3、映射与展开总是不兼容的
type T11 = `a${X}b`; // 总是求值X，并确定X是否满足“模板参数”的条件


// ----------------------------------------
// 多模板参数的情况
//  - 可以用正则表达式来表达！(注意如下的空格只是用来排版的)
//  - 模板变量（类型）：subtype of 'string | number | bigint | boolean | null | undefined ｜ never'
// ----------------------------------------
// 1) 如果string、number或bigint用作最后一个模板变量
type T201 = `a${string}b`; // .*
type T202 = `a${number}b`; // [0-9.]{1,}, more... ex: 112.2e3
// 如果是一个超过数字边界（超大的）数字，那么它会被理解为number类型来参与匹配（也就是说，数字的有效范围被一定程度上是忽略的）
let x1: T202 = 'a11999999999999999999999999999999934513590134519999999999999999999999999999999999999999999999999999999999999999999999999999999999999999935094135135134511b'; // pass
// bigint字面量会被作为一般数字类型解析（末尾没有n）
let x2: `a${bigint}b` = 'a1134514b'; // let x = 1134514n;

// 2）与定界符或其它变量的交互作用
//  - 字符串字面量和true/false/null/undefined总是作为“有限个确定字符的字符串（定界符）”去匹配
//  - 在右侧没有有效“定界符（字面量）”的情况下，${string}、${bigint}和${number}有着额外的处理逻辑
//  - ${string}、${number}、${bigint}和${infer X}都不能作为“定界符”。这使得它们
//     * 是最后一个模板变量时，就采用贪婪匹配（采用.*）；
//     * 右侧是非定界时，就采用尽量少的匹配（采用.）；
//     * 右侧是定界且还有其它非定界时，就采用非贪婪匹配（采用.*?）。
type T21 = `a${U}   ${number}b`;    // (U1|U2|...|Un)
        // `a(U1|U2)${number}b`
type T22 = `a${string}XXXX`;        // .*
        // `a.*       XXXX`;
type T23 = `a${string}${number}b`;  // .
        // `a.        ${number}b`
type T24 = `a${string}X${number}b`; // .*? （非贪婪）
        // `a.*?      X${number}b`

let X22: T22 = 'a1bbbca43asdfasd134513f12aaa34134bbbc43XXXX';
let X23: T23 = 'aa111234b';
let X24: T24 = 'a1ba111abbcX43b';


// 3) 0-3个字符
type CH_A = 'A';
type CH_B = 'B';
// ...
type CH_Z = 'Z'; // @see faker-js/faker/src/modules/string/index.ts
type CH = CH_A | CH_B | CH_Z; // A..Z
type NUL = ""
type CHS = `${CH|NUL}${CH|NUL}${CH|NUL}`


// 本讲最后的示例就是“字符表”的生成
type upper = CH_A | CH_B; // ... | CH_Z
type lower = Lowercase<upper>;
type alpha = upper | lower;
type digit = 0 | 1 | 2; // ... | 9
type alnum = alpha | digit;
type space = ' ' | '\t';
type blank = space | '\n' | '\r' | '\v' | '\f'; // ... | `\u00a0\u1680\u2000\u200a\u2028\u2029\u202f\u205f\u3000\ufeff`

// [:alnum:] - 字母数字字符
// [:alpha:] - 字母字符
// [:digit:] - 数字: '0 1 2 3 4 5 6 7 8 9'
// [:lower:] - 小写字母: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
// [:upper:] - 大写字母: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z'
// [:blank:] - 空字符: 空格键符 和 制表符
// [:space:] - 空格字符: 制表符、换行符、垂直制表符、换页符、回车符和空格键符
// [:punct:] - 所有标点符号: .,;:!?./-"\'#{([-|\\@)]=}*+
// Separators - 字符分隔符: `${space}${numeric}-_.`
type ToUnion<T extends string> =
    T extends `${infer U}${infer V}` ? U | ToUnion<V> : never;

type S = 'abcdefghijklmnopqrstuvwxyz';
type Low = ToUnion<S>;

