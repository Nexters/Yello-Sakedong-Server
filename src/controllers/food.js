const mongoose = require('mongoose');

const User = require('../db/user');
const Food = require('../db/food');

exports.food_list = (req, res, next) =>{
    Food.find()
    .then(docs =>{
        const response = {
            FoodList: docs.map(doc =>{
                return {
                    _id : doc._id,
                    foodName : doc.foodName,
                    foodImageUrl : doc.foodImageUrl,
                    foodComment : doc.foodComment,
                    foodEmoji : doc.foodEmoji
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error : err
        });
    })    
};

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