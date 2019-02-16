const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
    _id : String,


});

module.exports = mongoose.model('Like', likeSchema);