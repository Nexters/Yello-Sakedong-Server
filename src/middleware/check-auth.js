const jwt = require('jsonwebtoken');

const JWT_KEY = 'sdjkaakdkfkenfkdfnl;nl;n2l;dfsaf@djkfasd;fklskd;flxcnmv'

const User = require('../db/user');

module.exports = (req, res, next) => {
    try {
        // const token = req.headers.authorization.split(" ")[1];
        // const decoded = jwt.verify(token, JWT_KEY, { algorithms: ['HS256'] });
        // req.userData = decoded

        User.find({_id : req.headers._id})
        .then(v => {
            console.log(v)
            if(v.length > 0) {
            } else {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
        })
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
