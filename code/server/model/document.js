const mongoose = require('mongoose')

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
  // date_created: Date,
  date_modified: Date,
})

module.exports = mongoose.model('Document', documentSchema)
