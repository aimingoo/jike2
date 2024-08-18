// 使用字符串的模块名
import { b } from './t';



// 使用“名字”的模块名
module t2 {
    export var x = b;
}
// namespace t2 ...

// 模块与名字空间的区别：模块是一个“实体”，而名字空间是一个“容器”
// （但是，它们也可以概念互换；或者说，它们“可以是”是同义的）
console.log(t2.x);  

// 导出模块（模块名）
export default t2;
