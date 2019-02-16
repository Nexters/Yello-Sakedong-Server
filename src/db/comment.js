const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: String,
    user_id: String,
    food_id: String,
    comment: String,
    likeCount: Number
})

module.exports = mongoose.Model("comment", commentSchema);