// 声明名字（类型名）
namespace A { }

interface T { }

enum x { }

type T2 = T;

function foo() { }

class MyClass { }

type T3 = string | 12 & number;  // 类型表达式

let y: keyof typeof MyClass

/** other
class ...
function ...
import ...
import type ...
*/