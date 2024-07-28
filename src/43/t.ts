const DEBUGGING = true;

function NOP() {}
function DBG<T>(f: T): T {
  return DEBUGGING ? f : NOP as T;
}

/**
 * Class Decorator
 * @param target 类的构造函数
 */
function logClass(target: Function) {
  console.log("Class decorator called", target);
}

// @logClass
@DBG(logClass)  // NOTE: A expression!
class MyClass {
  constructor(public name: string) {}
}

/**
 * Method Decorator
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param key 方法的名称
 * @param descriptor 属性描述符，包含value(方法的值)、writable(是否可写)、enumerable(是否可枚举)、configurable(是否可配置)
 */
function logMethod(target: any, key: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Method ${key} called with arguments: ${args}`);
    return originalMethod.apply(this, args);
  };
}

class MyClass1 {
  @logMethod
  add(a: number, b: number) {
    return a + b;
  }
}

/**
 * Property Decorator
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param key 属性的名称
 */
function logProperty(target: any, key: string) {
  let _val: any;
  const getter = function () {
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  };
  const setter = function (newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  };
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class MyClass2 {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

/**
 * Parameter Decorator
 * @param target 对于静态成员来说是类的构造函数，对于实例成员是类的原型对象
 * @param key 成员的名字
 * @param index 参数在函数参数列表中的索引
 */
function logParameter(target: any, key: string, index: number) {
  console.log(`Parameter decorator called for ${key} at index ${index}`);
}

class MyClass3 {
  greet(@logParameter message: string, @logParameter sender: string) {
    console.log(`${sender} says: ${message}`);
  }
}

