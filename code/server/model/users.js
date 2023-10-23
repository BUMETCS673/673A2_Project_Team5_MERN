const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  user_name: String,
  user_id: String,
})

module.exports = mongoose.model("User", UserSchema)
