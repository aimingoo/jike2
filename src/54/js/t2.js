import {MyClass} from './t1.js';

let x = new MyClass();

// 1) 子类继承
class MyClassEx extends MyClass {
    b = 200;
    foo() {
        console.log('sub foo');
    }
}

/* for ts only
type TMyClassEx = Omit<MyClassEx, never>;
*/

// 2) 修改原型
MyClass.prototype.b = 200;
MyClass.prototype.foo = function() {
    console.log('sub foo');
};


// 3) 使用全局
if (!('STEP2' in global.ACTIONS)) {
    global.ACTIONS.STEP2 = 'step2';
};


x.foo();