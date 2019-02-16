const jwt = require('jsonwebtoken');

const JWT_KEY = 'sdjkaakdkfkenfkdfnl;nl;n2l;dfsaf@djkfasd;fklskd;flxcnmv'

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY, { algorithms: ['HS256'] });
        req.userData = decoded
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
