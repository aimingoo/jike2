// 1）Function类型在使用中的问题
//  - 我知道这里有一个函数，就是不知道它应该是什么函数 
function func(callback: (...args: any[]) => void) {
    return callback();
}
//  - Function的隐式签名
type TFunc = typeof func;
let func1: TFunc = function (callback: Function) {
    return callback();
}
func1(function() { // what's Function?!  ==> 其实这里指的是动态函数的实例
    // success ...
})
//  - bad case
function func2(callback: Function) { // Object, String, Number, Boolean
    return callback();
}
let f = new Function;
func2(f);
let f2 = { ...f };
func2(f2); // WARNNING !


// 2）回调函数的推荐原则“不要在回调函数中使用可选参数”
//  - @see ./t2.ts


// 3）在参数中使用map（和反向推断）
//  - @see TypeScript/lib.dom.d.ts

interface WorkerEventMap extends AbstractWorkerEventMap {
    "message": MessageEvent;
    "messageerror": MessageEvent;
}
interface Worker extends EventTarget, AbstractWorker {
    addEventListener<K extends keyof WorkerEventMap>(
        type: K,
        listener: (this: Worker, ev: WorkerEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions): void;
}

// 3.1） 使用泛型来增强类型安全
function safeOperation<T>(data: T, callback: (processedData: T) => void) {
    // 处理数据
    callback(data)
}
