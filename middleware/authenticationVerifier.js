const jwt = require('jsonwebtoken');
const secret = process.env['SECRET'];



function authenticationVerifier(req, res, next) {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(' ')[1]
    console.log(token)
    try {
        const decodedToken = jwt.verify(token, secret);
        req.user = { userId: decodedToken.userId }
        return next();
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Failed to authenticate token", error: error.message })
    }

}



module.exports = { authenticationVerifier }