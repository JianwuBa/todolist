var express = require("express");
var app = express()
//静态化文件
app.use(express.static("assets"))
var mainctrl = require("./controllers/mainctrl.js")
var todos = require("./models/todo")
var formidable = require("formidable");
app.get("/todolist",mainctrl.getTodo)
//增加
app.post("/todolist",mainctrl.addTodo)
//删除
app.delete("/todolist",mainctrl.deleteTodo)
//修改
app.patch("/todolist",mainctrl.updateTodo)
//拖拽
app.move("/todolist",mainctrl.moveTodo)
app.listen(3000)