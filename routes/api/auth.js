const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secret
const auth = require('../../middleware/auth')

//User Model
const User = require('../../models/User')

// @route POST api/auth
// @desc Auth new users
// @access Public
router.post('/',(req,res)=>{
    const { email,password }  = req.body;

    // Simple Validation
    if(!email || !password){
        // 400 is bad request
        return res.status(400).json({msg: 'Please enter all feilds'})
    }
    User.findOne({email})
    .then(user => {
        if(!user){
            return res.status(400).json({msg: 'User does not exisits'})
        }
        
        // Validate passowrd
        bcrypt.compare(password, user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})
            // signing token
            jwt.sign(
                { id: user.id },
                secret,
                {expiresIn: 3600*24*3},
                (err, token) => {
                    if(err) throw err;
                    res.status(200).json({
                        token,
                        user:{
                            id: user.id,
                            name:user.name,
                            email: user.email,
                            days_completed: user.days_completed
                        }
                    })
                }
            )
            
        })

       

    })
});

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user',auth,(req,res)=>{
User.findById(req.user.id)
.select('-password')
.then(user=>{
    console.log(user)
    res.json(user)
})
.catch(err=>res.status(401).json({msg:err}))
})





module.exports = router;