// 1. 在控制台 输入 console.dir(Promise) 我们会发现 Promise 是一个首字母大写的方法(function) 这说明 Promise 是一个构造函数
// 既然是构造函数，那么，我们就可以 new Promise() 得到一个 Promise 实例

// 2. 在 Promise 有两个函数，分别是 resolve(成功之后的回调函数) 和 reject(失败之后的回调函数)

// 3. 在 Promise 构造函数的 Prototype 属性上，有一个 .then() 方法，也就是说，只要是 Promise 构造函数创建的实例，都可以
// 访问到 .then 方法

// 4. Promise 表示一个 异步操作，每当我们 new 一个 Promise 实例，这个实例就表示一个具体的异步操作

// 5. 既然 Promise 创建的实例，是一个异步操作，那么，这个 异步操作的结果，只能有两种状态：
//    5.1 状态1：异步执行成功了；需要再内部调用，成功的回调函数 resolve 把结果返回给调用者，
//    5.2 状态2：异步执行失败了，系统在内部调用，失败的回调函数 reject 把结果返回给调用者；
//    5.3 由于 Promise 的实例是一个异步操作，所以内部拿到操作的结果后，无法使用 return 把操作结果返回给调用者
//        这时候只能使用 回调 函数的形式，来把成功 和 失败的结果，返回给调用者

// 6. 我们可以再 new 出来的 Promise 实例上，调用 .then() 方法，预先为这个 Promise 异步操作，指定成功(resolve)和
//    失败(reject)的回调函数


// 这里new出来的 promiseObj 只是代表 [形式上] 的一个 异步操作

// 异步操作就是我们只知道他是一个异步操作，但是具体做什么的异步事情，目前还不清楚

// var promiseObj = new Promise()

// 这是一个 具体的异步操作，其中，使用 function 指定一个具体的异步操作
// var promiseCb = new Promise(function () {
    // 这个 function 内部写的就是具体的异步操作
// })

// 加入 fs 模块
const fs = require('fs');

// 每当 new 一个 Promise 实例的时候，就会 立即执行 这个异步操作的代码
// 也就是说，new的时候，除了能够得到一个 promiseObj 实例之外，还会立即调用我们为 promise 构造函数传递的那个 function
// 并且执行这个 function 中的异步操作代码
var promisObj = new Promise(function () {
    // 里面的路径 最好是用path做下拼接
    fs.readFile('./files/2.txt','utf-8',(err,dataStr) => {
        if (err){
            throw err
        } else {
            console.log(dataStr)
        }
    })
});

// 在 js 中除了 function 可以按需调用之外，其他的都是立即执行，所以如果想要他的时候就用，不想要他的时候就不用，所以要给他一个function

// 初衷：给对应的路径，返回 读取到的内容(是返回，并不是直接throw或者console)
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

var p = getFileByPath('./files/3.txt')

// p.then(resolve(data),reject(err))

p.then(function (data) {
    console.log(data+"------------")
},function (err) {
    console.log(err.message)
})