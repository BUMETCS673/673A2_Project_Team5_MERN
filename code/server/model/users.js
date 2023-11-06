const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  user_name: String,
  user_id: String,
  user_pic: String, 
})

module.exports = mongoose.model('User', UserSchema)
