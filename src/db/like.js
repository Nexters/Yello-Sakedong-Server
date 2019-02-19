const mongoose = require('mongoose');

const likeScheme = mongoose.Schema({
    _id: String,
    user_id: String,
    food_id: String,
    isLike: Boolean
})

module.exports = mongoose.model("Like", likeScheme);