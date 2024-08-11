// next() 方法返回一个对象，该对象包含两个属性：value 和 done。
//  - value属性的值为一个getter函数，该函数返回一个随机数。
const iter: Iterable<number> = {
  [Symbol.iterator]: () => ({
    next: () =>
      Object.create(null, {
        value: { get: Math.random },
        done: { value: false }
      })
  })
}

// type T = {
//   [Symbol.iterator]: () => Generator<number>
// }

// next属性声明为一个Object.create的绑定函数
//  - 该函数的第一个参数为null
//  - 第二个参数为一个对象字面量，该对象字面量包含两个属性：value和done。
const iter2 = {
  [Symbol.iterator]: () => ({
    next: Object.create.bind(Object, null, {
      value: { get: Math.random },
      done: { value: false }
    })
  })
} as Iterable<number>;  // Generator<number>

// 迭代器符号的值是一个生成器函数
const iter3 = {
  [Symbol.iterator]: function* () {
    while (0) {
      yield Math.random()
    }
  }
}

// 使用简单方法来限制迭代次数（不推荐）
const iter4 = {
  [Symbol.iterator]: (i = 5) => ({
    next: () =>
      i-- > 0
        ? Object.create(null, {
            value: { get: Math.random },
            done: { value: false }
          })
        : { done: true }
  })
}

// 示例
let i = 0
for (const k of iter) {
  console.log(k)
  //   if (i++ > 10) break
}
