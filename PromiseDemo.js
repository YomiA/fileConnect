
// 加入 fs 模块
const fs = require('fs');

function getFileByPath(fPath) {
    var promisObj = new Promise(function (resolve, reject) {
        // 里面的路径 最好是用path做下拼接
        fs.readFile(fPath,'utf-8',(err,dataStr) => {
            if (err){
                return reject(err)
            } else {
                resolve(dataStr)
            }
        })
    });
    return promisObj
}

// 需求，读取文件1，在读取文件2，最后再读取文件3
// 注意：通过 .then 指定 回调函数的时候，成功的 回调函数 必须传，失败的回调函数，可以省略不传
// 这是一个错误的示范，千万不能这么用
// getFileByPath('./files/1.txt').then(function (data) {
//     console.log(data)
//
//     getFileByPath('./files/2.txt').then(function (data) {
//         console.log(data)
//
//         getFileByPath('./files/3.txt').then(function (data) {
//             console.log(data)
//         })
//     })
// })

// 在上一个 .then 中返回一个新的 promise 实例，可以继续用下一个 .then 来处理
// 读取文件1
getFileByPath('./files/1.txt').then(function (data) {
    console.log(data)

    // 读取文件2
    return getFileByPath('./files/2.txt')
}).then(function (data) {
    console.log(data)

    // 读取文件3
    return getFileByPath('./files/3.txt')
}).then(function (data) {
    console.log(data)

    // catch的作用：如果前面有任何的 promise 主执行失败，则立即终止所有 promise 的执行，并且马上进入 catch 去处理
    // promise 中抛出的异常
}).catch(function () {
    console.log("这是自己捕获的异常："+err.message)
})


// 当我们有这样的需求时：哪怕前面的 Promise 执行失败了，但是，不能影响后续的 promise 的正常执行，此时，我们可以单独为
// 每个 promise，通过 .then 指定一下失败的回调


// 有时候呢，我们也有这样的需求，跟上面的需求刚好相反，如果后续的 promise 执行，依赖于前面 promise 执行的结果，如果前面
// 的失败了，则后面的就没有继续执行下去的必要了，此时，我们想要实现，一旦有报错，则立即终止所有的 promise 的执行
