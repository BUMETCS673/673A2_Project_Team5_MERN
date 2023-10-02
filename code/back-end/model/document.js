const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Document', documentSchema);