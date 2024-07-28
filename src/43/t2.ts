/**
 * Decorator Evaluation
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html#decorator-evaluation
 * 
 * NOTE: 
 *    实例成员 > 静态成员 > 构造函数(参数) > 类
 */
function DecoratorLog(target: any, ...args: any[]) {
    console.log(target);
}

// D 类
  @DecoratorLog // 11
class MyClass {
  // C 构造参数
  constructor(@DecoratorLog public name: string) {  // 10
        // ...
  }

  // A 属性
  @DecoratorLog  // 1
  private myProperty1: string;

  @DecoratorLog  // 2
  myProperty2: string;

  // B 静态
  @DecoratorLog // 8
  static staticProperty: string;

  // A 方法 <- A1 参数
  @DecoratorLog  // 4c
  @DecoratorLog  // 4b
  @DecoratorLog  // 4a
  foo(@DecoratorLog a) { };  // 3

  // A 存取器 <- A1 参数
  @DecoratorLog // 6
  set myProperty3(@DecoratorLog v) { } // 5
  //   @DecoratorLog  // 不能多次修饰
  get myProperty3() { return 1 }

  @DecoratorLog  // 7
  accessor myProperty4: number;

  // B 静态
  @DecoratorLog // 9
  static func() { }

  // @DecoratorLog  // fail
  // #myField1: string;

  // @DecoratorLog  // fail
  // static {

  // }
}
