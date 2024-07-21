// 元组（vs. readonly array）
let tuple: [string, number, boolean] = ["hello", 42, true];
tuple[0] = "world"; // 合法，可以修改单个元素
tuple.push(false); // 错误，元组不允许使用push方法
tuple.pop(); // 错误，元组不允许使用pop方法

// 只读数组
let readonlyArray: readonly number[] = [1, 2, 3];
readonlyArray[0] = 4; // 错误，无法修改元素
readonlyArray.push(5); // 错误，只读数组不允许使用push方法
readonlyArray.pop(); // 错误，只读数组不允许使用pop方法

// 枚举（对象）
enum Color {
    Red = "红色",
    Green = "绿色",
    Blue = "蓝色"
}

let color!: Color; // = Color.Red;
console.log(color); // 输出：color的当前值

// 访问枚举值
console.log(Color.Green); // 输出：绿色

// 在switch语句中使用枚举值
switch (color) {
    case Color.Red:
        console.log("颜色是红色");
        break;
    case Color.Green:
        console.log("颜色是绿色");
        break;
    case Color.Blue:
        console.log("颜色是蓝色");
        break;
    default:
        console.log("未知颜色");
}

// 遍历枚举值
for (let key in Color) {
    if (typeof Color[key] === "string") {
        console.log(key + ": " + Color[key]);
    }
}


// 命名空间（函数的静态成员）
function foo() {
    console.log("Hello from foo!");
}
foo.x = 10;
namespace foo {
    export function bar() {
        console.log("Hello from bar!");
    }
}

// 使用命名空间中的成员
foo.bar(); // 输出：Hello from bar!
console.log(foo.x); // 输出：10
export default foo; // 导出命名空间
