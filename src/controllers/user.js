const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../db/user');

exports.user_signup = (req, res, next) =>{
    User.find({yellowSakedongKey:req.headers.yellowsakedongkey})
    .then(user =>{
        if(user.length >=1){
            return res.status(409).json({
                message : "device key exists"
            });
        } else{
            let code = Math.random().toString(16).substring(3);
            const user = new User({
                _id : new mongoose.Types.ObjectId(),
                userId : code,
                yellowSakedongKey : req.headers.yellowsakedongkey
            })
            user.save()
            .then(result =>{
                console.log(result);
                res.status(201).json({
                    message : "user created",
                    userId: result._id
                });
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    error : err
                });
            });
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
};



exports.user_post = (req, res, next) => {
    console.log(req.body);
}