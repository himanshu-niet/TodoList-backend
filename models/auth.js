const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  firstname: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },
  lastname: {
     type: String,
     require: true,
     trim: true,
     min: 3,
     max: 20,
  },

  email: {
     type: String,
     require: true,
     trim: true,
     unique: true,
     lowercase: true,
  },
  hash_password: {
     type: String,
     require: true,
  },
  role: {
     type: String,
     enum: ["user", "admin"],
     default: "user",
  },

},{ timestamps: true });
//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function () {
  return `${this.firstname} ${this.lastname}`;
});
userSchema.method({
   
  async authenticate(password) {  
     return bcrypt.compare(password, this.hash_password);
  },
});
module.exports = mongoose.model("User", userSchema);