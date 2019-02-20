const mongoose = require('mongoose');

const User = require('../db/user');
const Food = require('../db/food');
const Like = require('../db/like');
const Comment = require('../db/comment');

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
        foodEmoji : req.body.foodEmoji,
        foodLikeCount : 0
    })

    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.headers._id,
        food_id: food._id,
        comment: req.body.foodComment,
        foodEmoji: req.body.foodEmoji,
        likeCount: 0
    })

    const like = new Like({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.headers._id,
        comment_id: comment._id,
        isLike: false
    })

    food.save()
    .then(v =>{
        comment.save().then(c =>{
                like.save().then(l => {
                res.status(200).json({
                    food: v,
                    like: l,
                    comment: c
                });  
            })
        })
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
};


exports.comment_add = (req, res, next) => {
    const comment = new Comment({
        _id: new mongoose.Types.ObjectId(),
        user_id: req.headers._id,
        food_id: req.body.food_id,
        comment: req.body.foodComment,
        foodEmoji: req.body.foodEmoji,
        likeCount: 0
    })

    comment.save().then(result => {
        res.status(200).json({
            comment: result
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
    });
}