const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token');

    // Verify the token
    try {
        if (token) {
            jwt.verify(token, process.env.JWT_PASSWORD, (error, decoded) => {
                if (error) {
                    res.status(401).json({ msg: 'Token is not valid' });
                } else {
                    req.user = decoded.user;
                }
            });
        }
        next();
    } catch (err) {
        console.error('something wrong with add optional token middleware');
        res.status(500).json({ msg: 'Server Error' });
    }
};
