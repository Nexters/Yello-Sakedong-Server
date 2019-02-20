const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id: String,
    user_id: String,
    food_id: String,
    comment: String,
    foodEmoji : {
        type : Number,
        enum : ['감동', '매움', '토', '씀', '윙크', '천국', '띠용', '분노','허걱','뀨']
    },
    likeCount: Number
})

module.exports = mongoose.model("comment", commentSchema);