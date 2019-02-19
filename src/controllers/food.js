const mongoose = require('mongoose');

const User = require('../db/user');
const Food = require('../db/food');
const Like = require('../db/like');

exports.food_add = (req, res, next) => {
    const food = new Food({
        _id : new mongoose.Types.ObjectId(),
        foodName : req.body.foodName,
        foodImageUrl : req.body.foodImageUrl,
        foodComment : req.body.foodComment,
        foodEmoji : req.body.foodEmoji,
        foodLikeCount : 0
    })
    const like = new Like({
        _id: new mongoose.Types.ObjectId,
        user_id: req.headers.yellosakedongkey,
        food_id: food._id,
        isLike: false
    })

    food.save()
    .then(v =>{
        like.save().then(l => {
            res.status(500).json({
                food: v,
                like: l
            })
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
};