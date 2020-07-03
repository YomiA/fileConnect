// 需求：你要封装一个方法，我给你一个要读取文件的路径，你这个方法能帮我读取文件，并且把内容返回给我

const fs = require('fs')

const path = require('path')

//这是普通读取文件的方式，join里面的路径是被写死的
// fs.readFile(path.join(__dirname,'./files/1.txt'),'utf-8',(err,datastr) => {
//     if(err) throw err
//     console.log(datastr)
// });

// 初衷：给定文件路径，返回读取到的文件内容
/*
* 我们可以规定一下：callback 中有俩个参数，第一个参数，是失败的结果，第二个参数是成功的结果；
* 同时，还规定了，如果成功后，返回的结果，应该位于 callback 参数的第二个位置，此时，由于第一个位置没有出错，所以放一个
* null，如果失败了，则 第一个位置放 error 对象，第二个位置放一个 undefined
* */
function getFileByPath(fpath, callback) {
    // 因为是异步方法，主程序不执行,会把它放到队列里面让子程序执行，自己不去管它了，自己就会直接跳到下面的这个方法外面去，由
    // 于20行没有return，这个方法默认返回 undefined
    fs.readFile(fpath, 'utf-8', (err, datastr) => {
        // 如果传进来的链接是不合法的，就会背 err 这边直接终止掉，并抛出异常，所以不管成功还是失败了，结果都交给用户
        // 让用户来处理，所以不管失败还是成功，都把结果通过回调给用户
        // 如果报错了，进入 if 分支后，要让 if 后面的代码 不执行，所以要 return 出去
        if (err) {
            // throw err
           return callback(err)
        } else {
            // console.log(datastr)
            // return datastr
            callback(null,datastr)
        }
    });

}

// 调用方法
// var result = getFileByPath(path.join(__dirname,'./files/2.txt'))
// console.log(result)

getFileByPath(path.join(__dirname, './files/5.txt'), (err,datastr) => {
    // console.log(datastr)
    if (err){
        console.log(err.message)
    } else{
        console.log(datastr)
    }
});