const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    _id : String,
    foodName : String,
    foodOriginName : String,
    foodEnglishName : String,
    foodRegion : String,
    foodImageUrl : String,
    foodComment : String

});

module.exports = mongoose.model('Food', foodSchema);