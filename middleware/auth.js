const config = require('config')
const jwt = require('jsonwebtoken')
const secret = require('../config/keys').secret


function auth(req,res,next){
    // send a token to frontend ?
    const token = req.header('x-auth-token');

    if(!token)
    {
        // 401 unauthorized
        return res.status(401).json({msg: 'No token, authorization denied'})
    }
    try{
// Verify token
const decoded = jwt.verify(token, secret);
// Add user from payload
req.user = decoded
next()
    }catch(e){
res.status(400).json({msg: 'token is not valid'})
    }
    
}

module.exports = auth;