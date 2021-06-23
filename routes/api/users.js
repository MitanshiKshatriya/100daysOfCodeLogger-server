const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const secret = require('../../config/keys').secret

//User Model
const User = require('../../models/User')

// @route POST api/users
// @desc Register new users
// @access Public
router.post('/',(req,res)=>{
    const { name,email,password }  = req.body;

    // Simple Validation
    if(!name || !email || !password){
        // 400 is bad request
        return res.status(400).json({msg: 'Please enter all feilds'})
    }
    User.findOne({email})
    .then(user => {
        if(user){
            return res.status(400).json({msg: 'User already exisits'})
        }

        const newUser = new User({
            name,
            email,
            password
        })

        // create salt & hash
        bcrypt.genSalt(10, (err,salt) => {
            bcrypt.hash(newUser.password, salt, (err,hash)=>{
                if(err)
                throw err

                newUser.password = hash;
                newUser.save()
                .then(user=>{
                    // also add token
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
                .catch(err=>{
                    res.status(404).json({msg:err})
                })
            })
        })

    })
});






module.exports = router;