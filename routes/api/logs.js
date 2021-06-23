const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')

//Item Model
const Log = require('../../models/Logs')
//User Model - to update days Completed.
//https://stackoverflow.com/questions/39946436/findoneandupdate-increment-instead-of-update-in-mongoose
const User = require('../../models/User')


// @route GET api/logs
// @desc Get All logs
// @access Public
router.get('/',auth,(req,res)=>{
    Log.find({userId: req.user.id})
    .sort({data: -1})
    .then(items=>res.json(items))
    .catch(err=>res.status(403).json({msg:err}))
});

// @route GET api/logs/:userId
// @desc Get All logs from userId
// @access Private
router.get('/:userId',auth,(req,res)=>{
    Log.find({userId:req.params.userId})
    .sort({data: -1})
    .then(items=>res.json(items))
    .catch(err=>res.status(403).json({msg:err}))
});

// @route POST api/logs
// @desc post A log
// @access Public
router.post('/',auth,(req,res)=>{
    const newItem = new Log({
        desc: req.body.desc,
        userId: req.user.id, 
        // add day 
        day: req.body.day == undefined ? 0 : req.body.day,
        // add date
        date: req.body.date == undefined ? new Date() : new Date(req.body.date)
    })

    newItem.save()
    .then(
        item=>{
            User.findOneAndUpdate({"_id":req.user.id},{"$inc":{"days_completed":1}})
            .then(response=>{
                
            })
            .catch(err=>{
                console.log(err)
                return res.status(404).send({msg:err})
            })
        return res.json(item)
        })
    .catch(err=>{
        console.log(err)
        res.status(403).json({msg:err})
    })
});

// @route DELETE api/logs/:id
// @desc Delete A log
// @access Public
router.delete('/:id',auth,(req,res)=>{
    Log.findById(req.params.id)
    .then(item=>item.remove().then(()=>{
    
    //update days_completed
    User.findOneAndUpdate({"_id":req.user.id},{"$inc":{"days_completed":-1}})
            .then(response=>{
                
            })
            .catch(err=>{
                return res.status(404).send({msg:err})
            })


    return res.json({sucess:true})
    }
    ))
    .catch(err=> res.status(400).
    json({msg:err}))
});

// @route POST api/logs/update
// @desc Update a log
// @access Public
router.post('/update',auth,(req,res)=>{
    const {_id,desc} = req.body
    
    Log.findOneAndUpdate({"_id":_id},{"$set":{"desc":desc}})
    .then(response=>{
        res.json({_id:_id,desc:desc})
    })
    .catch(err=>{
        res.status(404).send({msg:err})
    })
})



module.exports = router;