const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');

const User = require('../db/user');

exports.user_signup = (req, res, next) => {
    User.find({ yellowSakedongKey: req.headers.yellowsakeongkey })
        .then(user => {
            if (user.length >= 1) {
                console.log(user[0])
                return res.status(409).json({
                    message: "device key exists"
                });
            } else {
                function makeid() {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));

                    return text;
                }
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    userName: makeid(),
                    yellowSakedongKey: req.headers.yellowsakeongkey
                })
                user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "user created",
                            userId : result._id 
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

