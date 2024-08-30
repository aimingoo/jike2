//  关于 “不要在回调函数中使用可选参数”
function fetchData(callback: (data: string) => void): void {
    // 模拟异步操作
    setTimeout(() => {
        callback("Data fetched successfully")
    }, 1000)
}


// 示例1：正确的参数类型定义
function processDataCorrect(callback: (data: string | undefined) => void) {
    // 模拟可能失败的操作
    const success = Math.random() > 0.5
    callback(success ? 'abc' : undefined)
}


// 示例1.1：正确处理错误情况
function fetchDataWithError(callback: (error: Error | null, data?: string) => void) {
    setTimeout(() => {
        // 模拟可能失败的异步操作
        if (Math.random() > 0.5) {
            callback(null, "Data fetched successfully") // NOTE: 这里接口存在歧义
        } else {
            callback(new Error("Failed to fetch data"))
        }
    }, 1000)
}


// 示例2：不正确的可选参数使用
function processData(callback: (data?: string) => void) {
    // 这可能导致未定义的行为
    callback()
}


// 使用示例(1.8.10-, 2.0.0+@2016.09.22)
//  -- "strictNullChecks": true
processData((data) => {
    console.log(data.toUpperCase());
});

//  -- "strictFunctionTypes": true,
let f1 = ()=>console.log('hi');
let f2 = (data: string)=>console.log(data.toString());
processData(f1);
processData(f2);

type CB = (data?: string) => void;
let f3: CB = (data: string) => {
    console.log(data.toUpperCase());
}
processData(f3);