const { verifyToken } = require("../helpers/jwt");
const { User } = require('../models/index');

const loginAuth = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        console.log(req.headers);
        if (!access_token) {
            throw {name : "INVALID_ACCESS"}
        }

        const validateToken = verifyToken(access_token)
        if (!validateToken) {
            throw {name : "INVALID_ACCESS"}  
        }

        const getUser = await User.findByPk(validateToken.id)
        if (!getUser) {
            throw {name : "INVALID_ACCESS"}
        }

        req.user = {
            id : validateToken.id,
            role: validateToken.role,
            username: validateToken.username
        }
        next()
    } catch (error) {
        console.log(error);
        next(error)
    }
}

module.exports = loginAuth
