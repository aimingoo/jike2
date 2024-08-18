// 使用字符串的模块名
import { b } from './t';


// 使用“名字”的模块名
function t3() {

}
t3.x = b;

// 导出模块（模块名）
export default t3;

namespace t3 {
    export var y = 2;
}