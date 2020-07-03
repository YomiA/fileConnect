// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读取文件，并且把内容返回给我

const fs = require('fs');

const path = require('path');

function getFileByPath(fpath, succCb, errCb) {
    fs.readFile(fpath, 'utf-8', (err, datastr) => {
        if (err) {
            return errCb(err)
        } else {
            succCb(datastr)
        }
    });

}

// getFileByPath(path.join(__dirname, './files/3.txt'),function (data) {
//     console.log(data+"今天亏大了，充了1000多")
// },function (err) {
//     console.log("每次充完钱就后悔了"+err)
// })

// 需求：先读取文件1，再读取文件2，最后读取文件3

// 方法一：不保证顺序

// getFileByPath(path.join(__dirname,'./files/1.txt'),function (data) {
//     console.log(data)
// });
//
// getFileByPath(path.join(__dirname,'./files/2.txt'),function (data) {
//     console.log(data)
// });
//
// getFileByPath(path.join(__dirname,'./files/3.txt'),function (data) {
//     console.log(data)
// });

// 方法二：if嵌套
// 回调地狱
// 使用 ES6 中的 Promise 来解决回调地狱的问题
// Promise 就是单纯的为了解决回调地狱的问题，并不能帮我们减少代码量

getFileByPath(path.join(__dirname,'./files/1.txt'),function (data) {
    console.log(data);

    getFileByPath(path.join(__dirname,'./files/2.txt'),function (data) {
        console.log(data)

        getFileByPath(path.join(__dirname,'./files/3.txt'),function (data) {
            console.log(data)
        })
    })
});


// 经过 Promise 处理后变成这样的
// .getile1()
// .then() // 处理文件1
// .then() // 处理文件2
// .then() // 处理文件3