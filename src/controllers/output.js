const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const Food = require('../db/food');

exports.output = function(req, res, next) {
    const inputFoodName = req.body.inputFoodName;
    const userId = req.headers.user_id;

    Food.findOne({
        foodName:inputFoodName
    }).populate('comment')
    .populate('like')
    .exec(err, data => {
        if(data.length < 1) {
            return res.status(404).json({
                error: 404
            });
        } else {

            const commentList = [];
            data.comment.map(v => {
                let isOwner;
                if(v.userPK === userId) {
                    isOwner = true;
                } else {
                    isOwner = false;
                }

                let isLike;
                if(v.like.isLike === 1) {
                    isLike = true;
                } else {
                    isLike = false;
                }
                let value = {
                    "comment": v.comment,
                    "like": v.like,
                    "isOwner": isOwner,
                    "isLike": isLike
                }
                commentList.push(value);
            })

            return res.status(200).json({
                error: 200,
                foodName: data.food.foodName,
                foodOriginalName: data.food.foodOriginalName,
                foodEnglishName: data.food.foodEnglishName,
                comments: commentList
            })
        }
    })
}