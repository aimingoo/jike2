const tor = {  // tor的直接使用（注意它必须满足迭代器协议）
    next: Object.create.bind(Object, null, { value: { get: Math.random }, done: { value: false } }),
    [Symbol.iterator]() { return this }
}

let i = 0
for (const k of tor) {
  console.log(k)
  if (i++ > 10) break
}
