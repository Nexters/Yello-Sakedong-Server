const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const Food = require('../db/food');
const Like = require('../db/like');
const Comment = require('../db/comment');

exports.output = function(req, res, next) {
    const inputFoodName = req.query.inputFoodName;

    Food.findOne({
        foodName:inputFoodName
    }).then(data => {
        if(data==null) {
            return res.status(404).json({
                error: 404
            });
        }else {
            Comment.find({food_id: data._id})
            .then(v => {
                console.log(v);
                if(v === null) {
                    return res.status(404).json({
                        error:404
                    });
                } else {
                    return v;
                }
            }).then( d => {
                return res.status(200).json({
                    error: 200,
                    data: data,
                    comments: d
                });
            });
        }
    })
}

exports.comments = function(req, res, next) {
    const foodId = req.query.foodId;
    Comment.find({food_id: foodId})
    .then(v => {
        if(v === null) {
            return res.status(200).json({
                error:200,
                comments: []
            })
        } else {
            return res.status(200).json({
                error:200,
                comments: v
            })
        }
    })
}