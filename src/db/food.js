const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    _id : String,
    foodName : String,
    foodOriginName : String,
    foodEnglishName : String,
    foodRegion : String,
    foodImageUrl : String,
    foodComment : String,
    foodLikeCount: Number,
    foodEmoji : {
        type : Number,
        enum : ['감동', '매움', '토', '씀', '윙크', '천국', '띠용', '분노','허걱','뀨']
    }
});

module.exports = mongoose.model('Food', foodSchema);
