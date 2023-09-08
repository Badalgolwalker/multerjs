const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/ki")
const userSchema = mongoose.Schema({
  username:String,
  pic:String
})
module.exports = mongoose.model("user",userSchema)