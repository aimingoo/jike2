import Mocha from 'mocha';

// 1) 动态加载类型
function foo() {
    type Mocha = import('mocha');
    let x: Mocha = new Mocha;
}

// 2) 动态导入，然后获取类型
async function foo2() {
    let {default: Mocha} = await import('mocha');  // a class
    type Mocha = typeof Mocha.prototype; // type Mocha = import('mocha');
    let x: Mocha = new Mocha;
}
