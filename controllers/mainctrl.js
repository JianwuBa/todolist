var todos = require("../models/todo")
var formidable = require("formidable");
exports.getTodo = function (req,res) {
    todos.allTodu(function (data) {
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