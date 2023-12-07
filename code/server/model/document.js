// const mongoose = require('mongoose')

import mongoose from 'mongoose'
const { Schema } = mongoose

const documentSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  document_id: String,
  content: {
    type: String,
    default: '',
  },
  imageSrc: {
    type: String,
    default: 'https://img.icons8.com/color/96/file.png',
  },
  summary: {
    type: String,
    default: '',
  },
  last_modified: Date,
  author: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date_created: Date,
  //date_modified: Date,
})

export default mongoose.model('Document', documentSchema);
