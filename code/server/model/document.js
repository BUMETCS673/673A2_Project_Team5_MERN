const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title: String,
    content: String,
    summary: String,
    doc_id: {
        required: true,
        Types: String,
        unique: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // date_created: Date,
    date_modified: Date,
});

module.exports = mongoose.model('Document', documentSchema);