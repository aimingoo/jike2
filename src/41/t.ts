// 与一般类型相关的概念：类型标注、类型断言(as)
let a: number = 1;  // 类型标注
let b = a as number;    // 类型断言

// 与函数相关的类型签名：函数签名、构造签名、重载签名；断言签名、谓词签名；装饰器（第43讲）
let c: (x: number, y: number) => number = function(x, y) { return x + y; };  // 函数类型
let d!: new (x: number, y: number) => void;  // 构造函数类型

// 接口中的函数签名与构造签名
interface E {
  (x: number, y: number): number;  // 函数签名
  new (x: number, y: number): void;  // 构造签名
}

// 重载签名
function e(x: number, y: number): number;  
function e(x: string, y: string): string;
function e(x: any, y: any): any { return x + y; }  // 实现签名

// 断言签名
function f(x: any): asserts x is string {
    if (typeof x !== 'string') {
        throw new Error('Not a string!');
    }
}

// 谓词签名
function g(x: number): x is number {
    return true;
}  


// 类声明中的扩展语法：构造参数、可见性修饰符、只读（readonly）与覆盖（override）等
class ParentClass {
  toString() { }
}

class H extends ParentClass {
  // 可见性修饰符
  public readonly z: number = 0;

  constructor(public x: number, private y: number) {
    super();
  }

  override toString() { return `${this.x}, ${this.y}, ${this.z}`; }
}

// 与泛型相关的扩展语法：泛型函数、泛型类
function identity<T>(arg: T): T {
  return arg;
}

class GenericClass<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }
}
