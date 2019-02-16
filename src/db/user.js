const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    _id : String,
    userId : String,
    userRegistDate : { type: Date, default: Date.now },
    yellowSakedongKey : String
});

module.exports = mongoose.model('User', userSchema);

