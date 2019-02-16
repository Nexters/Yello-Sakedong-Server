const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    _id : String,
    user_id: String,
    foodName : String,
    foodOriginalName : String,
    foodEnglishName: String,
    foodRegion : String,
    foodImageUrl : String,
});

module.exports = mongoose.model('Food', foodSchema);
