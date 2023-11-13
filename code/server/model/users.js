// const mongoose = require('mongoose')
import mongoose from 'mongoose';
const { Schema } = mongoose

const UserSchema = new Schema({
  user_name: String,
  user_id: String,
  user_pic: String,
})

export default mongoose.model('User', UserSchema);
