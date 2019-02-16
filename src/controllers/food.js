const mongoose = require('mongoose');

const User = require('../db/user');
const Food = require('../db/food');

exports.food_add = (req, res, next) => {
    const food = new Food({
        _id : new mongoose.Types.ObjectId(),
        foodName : req.body.foodName,
        foodImageUrl : req.body.foodImageUrl,
        foodComment : req.body.foodComment,
        foodEmoji : req.body.foodEmoji
    })
    food.save()
    .then(food =>{
        res.status(201).json({
            message : "new food add",
            food
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
};