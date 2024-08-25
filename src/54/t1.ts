class MyClass {
    a = 100;
    foo() {
        console.log('foo');
    }
}

// 1) export items
export {
    MyClass
}

// 2) export default item
// export default MyClass;

// 3) export namespace/module as default
function t1() { }
t1.MyClass = MyClass;  // add a property to the function object

module t1 {
    export var a = 100;
}

namespace t1 {
    export var b = 100;
}

export default t1;
// export = t1;

// 4) export namespace with sub-namespace
namespace tt {
    export namespace sub {
        export var c = 100;
    }
}
export { tt }
