const mongoose = require('mongoose');

const emojiSchema = mongoose.Schema({
    _id : String,
    emoji : {
        type : Number,
        enum : ['']
    }
});

module.exports = mongoose.model('Emoji', emojiSchema);