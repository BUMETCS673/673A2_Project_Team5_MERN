const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    emails: {
        type: String,
        require: true,
        unique: [true, 'This email address has been used.']
    }
})

module.exports = mongoose.model('User', UserSchema);