const mongoose = require('mongoose');

const emojiSchema = mongoose.Schema({
    _id : String,
    
    bigEmojiUrl : String,
    middleEmojiUrl : String,
    smallEmojiUrl : String,

    //감동-0, 매움-1, 토-2, 씀-3, 윙크-4, 천국-5, 띠용-6, 분노-7, 허걱-8, 뀨-9
    bigEmoji : {
        type : Number,
        enum : ['감동', '매움', '토', '씀', '윙크', '천국', '띠용', '분노','허걱','뀨']
    },
    middleEmoji:{
        type : Number,
        enum : ['감동', '매움', '토', '씀', '윙크', '천국', '띠용', '분노','허걱','뀨']
    },
    smallEmoji:{
        type : Number,
        enum : ['감동', '매움', '토', '씀', '윙크', '천국', '띠용', '분노','허걱','뀨']
    }
});

module.exports = mongoose.model('Emoji', emojiSchema);