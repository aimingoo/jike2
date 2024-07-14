/**
 * 函数“foo”接受字符串输入“a”，并返回“a”与字符串“b”的连接。
 * @param {string} a - `foo`函数中的参数`a`是字符串类型。
 * @returns 函数“foo”以字符串“a”作为输入，并返回与字母“b”连接的输入字符串。
 */
function foo(a: string) {
  return a + 'b'
}

/**
 * 语句 `let x = 100;` 声明了一个变量 `x`，并用值 `100` 初始化它。
 *
 * @type {number}
 */
let x = 100;

/* 类“MyClass”有一个属性“a”，一个将“a”设置为数字的字符串表示形式的构造函数，以及一个返回100的方法“foo”。 */
class MyClass {

  a: string = 'a'

/**
 * 构造函数以数字作为参数，并将其字符串表示形式分配给属性“a”。
 * @param {number} t - 构造函数中的参数`t`是一个数字。
 */
  constructor(t: number) {
    this.a = String(t)
  }

  foo() {
    return 100
  }
}
