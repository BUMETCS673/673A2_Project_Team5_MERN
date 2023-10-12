const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    document_id: String,
    body: String,
    summary: String,
    last_modified: Date,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Document', documentSchema);