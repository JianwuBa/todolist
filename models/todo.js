var fs = require("fs")
var path = require("path")
// 公用路径
// __dirname的作用是智能补充我们的路径地址，因为当前的路径不能以相对路径展示
// path.resolve()方法表示智能合并路径，实际作用就是将__dirname和后面的相对路径进行智能合并
var filePath = path.resolve(__dirname,"../database/db.js")
// allTodos就是数据源

exports.allTodu = allTodu = function (callback) {
    // 使用fs模块去读取文件
    fs.readFile(filePath,function (err,data) {
        //排序
        var result = JSON.parse(data.toString());
        result.sort(function (item1,item2) {
            return item1.done - item2.done
        })
        callback(result)
    })
}
//增
// 增加数据,机理就是获取所有的数据后，增加对应的数据然后再写入db.js
exports.addTodo = function (title,callback) {
    // 增加数据是在已有数据的基础之上进行增加
    // 获取已有数据
    allTodu(function (data) {
        let maxId = 0;
        for(var i=0; i<data.length; i++){
            if(data[i].id > maxId){
                maxId = data[i].id;
            }
        }
        //console.log(data)
        // 将数据push给data
        var obj = {"id":maxId+1,"title":title,"done":"0"}
        data.push(obj);
        // 写入到db.js
        // 第一个参数是写入的地址，第二个参数是文件内容，注意必须是字符
        fs.writeFile(filePath,JSON.stringify(data),function () {
            callback()
        })
    })
}
//删
// 删除数据，机理就是获取所有的数据后，删除对应id数据然后再写入db.js
exports.deleteTodo = function (id,callback) { 
    allTodu(function (data) {
        for(var i=0; i<data.length; i++){
            //console.log(data[i])
            if(data[i].id == id){
                // 找到对应的下标删除这一项
                data.splice(i,1)
            }
        }
        console.log(data)
        fs.writeFile(filePath,JSON.stringify(data),function(){
            callback()
        })
    })
}
//修改
// 修改,机理就是获取所有的数据后，修改某一条数据然后再次写入到db.js
exports.updateTodo = function (id,key,value,callback) {
    allTodu(function (data) {
        for(var i=0; i<data.length;i++){
            if(data[i].id == id){
                data[i][key] = value
            }
        }
        console.log(data[id])
        fs.writeFile(filePath,JSON.stringify(data),function () {
            callback()
        })
    })
}
exports.moveTodo = function (staotIdx,endIdx,callback) {
    allTodu(function (data) {
        data.splice(endIdx,0,data.splice(staotIdx,1)[0]);
        console.log(data)
        fs.writeFile(filePath,JSON.stringify(data),function () {
            callback()
        })
    })
}