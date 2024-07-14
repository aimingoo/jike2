function foo(a) {
    return a + 'b';
}
var x = 100;
var MyClass = /** @class */ (function () {
    function MyClass(t) {
        this.a = 'a';
        this.a = String(t);
    }
    MyClass.prototype.foo = function () {
        return 100;
    };
    return MyClass;
}());
