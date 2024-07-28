/**
 * 编译器会自动为装饰器添加以下几种类型的元数据：
 *  design:type：用于标记属性或方法参数的类型。
 *  design:paramtypes：用于标记类构造函数或方法的参数类型数组。
 *  design:returntype：用于标记方法的返回类型。
 * 
 * @see https://github.com/rbuckton/reflect-metadata
 * @see https://rbuckton.github.io/reflect-metadata/
 */

import "reflect-metadata";  // @see "ts-node" in tsconfig.json


// 获取属性的类型
function PropertyDecorator(target: any, propertyKey: string | symbol) {
  const type = Reflect.getMetadata("design:type", target, propertyKey);
  console.log("1", type);
}

// 置一个自定义的元数据
function PropertyDecoratorSetter(target: any, propertyKey: string | symbol) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);
    const data = Object.assign(Reflect.getMetadata('prop-init', target) || {}, {
        [String(propertyKey)]: `init as ${type}` ,
    });
    Reflect.defineMetadata("prop-init", data, target);
    console.log("2", "defined"); // 输出属性的类型
}

// 打印收集到的"prop-init"元数据
function printPropInit(target: any) {
    console.log("3", "instane members", Reflect.getMetadata("prop-init", target.prototype));
    console.log("4", "class members", Reflect.getMetadata("prop-init", target));
}

@printPropInit
class MyClass {
  @PropertyDecorator
  myProperty1: string;

  @PropertyDecoratorSetter
  myProperty2: string;

  @PropertyDecoratorSetter
  myProperty3: string | 1;

  @PropertyDecoratorSetter
  static x: number;
}
