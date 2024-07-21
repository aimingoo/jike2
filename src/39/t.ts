// @see jike/7/t.js
// ----


/**
 * 表示 MyClass 的类，具有各种类型的字段和方法。
 */
class MyClass {
    /** @private {number} 私有实例字段 */
    #a = 10;

    /** @private {function} 私有实例方法 */
    #f() { };

    /** @private {string} 私有 getter 方法 */
    get #f2() { return 'a' }

    /** @private @static {number} 私有静态字段 */
    static #a2 = 10;

    /** @private @static {function} 私有静态方法 */
    static #foo2() { };

    /** @public {number} 公共实例字段 */
    b1 = 100;

    /** @public {string} 公共实例字段 */
    b2 = 'a';

    /** @public {function} 公共实例方法 */
    b3 = () => { };

    /** @public @static {number} 公共静态字段 */
    static d1 = 100;

    /** @public @static {string} 公共静态字段 */
    static d2 = 'a';

    /** @public @static {function} 公共静态方法 */
    static d3 = () => { };

    /** MyClass 的构造函数 */
    constructor() { }

    /** @public {function} 公共实例方法 */
    c1() { }

    /** 
     * 公共 getter 方法
     * @returns {number} 返回数字 1。
     */
    get c2() {
        return 1;
    }

    /** @static 静态块 */
    static { }

    /** @public {number} 公共自动访问器字段 */
    accessor x = 100;
}
