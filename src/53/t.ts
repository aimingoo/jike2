// 1. TypeScript如何确定.ts文件是否是一个模块？
export { }


// 2. 如果使用import ... from "xxx"，那么TypeScript如何确定xxx是一个模块？
//   NOTE: TypeScript会先明确xxx是一个“模块”，还是一个“包”
//   2.1 如果xxx是相对路径，那如何确定xxx是（内部的/外部的）包或模块？
//   2.2 在浏览器或其它可执行环境中，如何确定xxx是一个模块？
import xxx from 'XXX'; // 目标“XXX”不存在？或XXX的类型信息不可用？
import mocha from 'mocha'; // 目标“mocha”是什么？它的位置如何确定？？
console.log(typeof mocha);
type T = typeof xxx;
console.log(xxx);


// 3. 可以明确指示目标模块是一个cjs模块（编译target module必须为cjs模块）
// import mocha2 = require('mocha'); // 明确地告诉TypeScript，mocha是一个cjs模块
// console.log(typeof mocha2);

// 4. （对于当前项目来说，）TypeScript不会编译项目之外的文件或模块，并且“总是”将文件生成到outDir目录之中！
//   4.1 也就是说，如果模块是相对路径的（但是是外部的），那么TypeScript不会编译它。
//   4.2 当 "moduleResolution":"Node" 时，tsc也会处理父目录中的模块
import 'XXX';
import "../a";

let b = 1;
export { b }


// 5. 导入别名（子名字空间）
import x = mocha.HookFunction

/*
 1. TypeScript如何理解模块？
 2. TypeScript类型系统中的“模块”（注：要尽量使用import/export type）
 3. 名字空间与实体
 4. 作业：“模块”是JavaScript中最大的难题（之一），因为它是一个“动态”的、环境相关的概念（以testcase-outside-import-in-tsnode）为例
 5. 如果一个.ts文件只有import语句，那么它是一个模块吗？
*/
