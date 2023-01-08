const { StatusCodes } = require("http-status-codes");
const Todo = require("../models/todo");
const ObjectId = require("mongoose").Types.ObjectId;

const allTodos = async (req, res) => {
  const { _id } = req.user;

  if (!_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }
  const todos = await Todo.find({ userId: _id });
  if (!todos) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Todos Not Found",
    });
  } else {
    return res.status(StatusCodes.OK).json( todos );
  }
}

const updateTodo= async (req, res) => {
  const { _id } = req.user;
  const todoId = ObjectId(req.query.id);
  
  if (!_id,!todoId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }
  const todos = await Todo.updateOne({ _id:todoId },{$set:{status:true}});
 
  if (todos.modifiedCount==0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Todo Not Found",
    });
  } else {
    return res.status(StatusCodes.OK).json({message:"Todo Update Successfully"});
  }
};


const deleteTodo = async (req, res) => {
    const { _id } = req.user;
    const todoId = ObjectId(req.query.id);
  
  if ((!_id, !todoId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const todo=await Todo.deleteOne({ _id: todoId });
if (todo.deletedCount==0){

return res.status(StatusCodes.BAD_REQUEST).json({message: "Todo Not Found"});

}else{
 return res.status(StatusCodes.OK).json({ message: "Todo Deleted" });
}
};


const addTodo = async (req, res) => {
  const { _id } = req.user;
  const {title,date}=req.headers;

  if (!_id,!title,!date) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

 const todoData = {
   userId: _id,
   title: title,
   date: date,
   status: false,
 };
  Todo.create(todoData).then((data, err) => {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err });
    else
      res
        .status(StatusCodes.CREATED)
        .json({ message: "Todo Added Successfully" });
  });
};

module.exports = { allTodos, addTodo, deleteTodo, updateTodo };
