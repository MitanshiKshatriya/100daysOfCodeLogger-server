const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth')

//Item Model
const Log = require('../../models/Logs')


// @route GET api/logs
// @desc Get All logs
// @access Public
router.get('/',auth,(req,res)=>{
    Log.find()
    .sort({data: -1})
    .then(items=>res.json(items))
    .catch(err=>console.log(err))
});

// @route POST api/logs
// @desc post A log
// @access Public
router.post('/',auth,(req,res)=>{
    const newItem = new Log({
        desc: req.body.desc
    })
    newItem.save()
    .then(item=>res.json(item))
    .catch(err=>console.log(err))
});

// @route DELETE api/logs/:id
// @desc Delete A log
// @access Public
router.delete('/:id',auth,(req,res)=>{
    Log.findById(req.params.id)
    .then(item=>item.remove().then(()=>
    res.json({sucess:true})
    ))
    .catch(err=> res.status(400).
    json({sucess:false}))
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
        res.status(404).send({err})
    })
})



module.exports = router;