const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
    _id : String,
    userName : String,
    userRegistDate : { type: Date, default: Date.now },
    yellowSakedongKey : {type: String, required : true}
});

module.exports = mongoose.model('User', userSchema);

