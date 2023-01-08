const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {

    userId:String,
    title:String,
    date:String,
    status:Boolean

  },
  { timestamps: true }
);
//For get fullName from when we get data from database

module.exports = mongoose.model("Todo", todoSchema);
