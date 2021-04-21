var todos = require("../models/todo")
var formidable = require("formidable");
// 查询，找出所有的已办和未办的清单
exports.getTodo = function (req,res) {
    todos.allTodu(function (data) {
        // 将得到的数据返回给前端
        res.json({
            "status":"success",
            "data":data
        })
    })
}

//增加
exports.addTodo = function (req,res) {
    var form = new formidable();
    form.parse(req,function (err,fields,files) {
        var obj = fields
        todos.addTodo(obj.title,function () {
            console.log(obj.title)
            res.json({
                "status":"success",
                "data":null
            })
        })
        
    })
}

//删除
exports.deleteTodo = function (req,res) {
    var form = new formidable();
    form.parse(req,function (err,fields,files) {
        //console.log(fields)
        var id = fields.id;
        console.log(id)
        todos.deleteTodo(id,function () {
            res.json({
                "status":"success",
                "data":null
            })
        })
    })
}

//修改
exports.updateTodo = function (req,res) {
    var form = new formidable();
    form.parse(req,function (err,fields,files) {
        //console.log(fields)
        var obj = fields;
        todos.updateTodo(obj.id,obj.key,obj.value,function () {
            res.json({
                "status":"success",
                "data":null
            })
        })
    })
}
//拖拽
exports.moveTodo = function (req,res) {
    var form = new formidable();
    form.parse(req,function (err,fields,files) {
        var obj = fields;
        todos.moveTodo(obj.sIdx,obj.eIdx,function () {
            res.json({
                "status":"success",
                "data":null
            })
        })
    })
}