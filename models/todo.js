var fs = require("fs")
var path = require("path")
var filePath = path.resolve(__dirname,"../database/db.js")

exports.allTodu = allTodu = function (callback) {
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
exports.addTodo = function (title,callback) {
    allTodu(function (data) {
        let maxId = 0;
        for(var i=0; i<data.length; i++){
            if(data[i].id > maxId){
                maxId = data[i].id;
            }
        }
        //console.log(data)
        var obj = {"id":maxId+1,"title":title,"done":"0"}
        data.push(obj);
        fs.writeFile(filePath,JSON.stringify(data),function () {
            callback()
        })
    })
}
//删
exports.deleteTodo = function (id,callback) { 
    allTodu(function (data) {
        for(var i=0; i<data.length; i++){
            //console.log(data[i])
            if(data[i].id == id){
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