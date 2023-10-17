const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    title: {
        required: true,
        type: String,
    },
    document_id: String,
    body: {
        type: String,
        default: ''
    },
    summary: {
        type: String,
        default: ''
    },
    last_modified: Date,
    author: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Document', documentSchema);