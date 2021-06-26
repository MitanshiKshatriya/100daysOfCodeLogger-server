const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const User  = require('../../models/User')


/*
*
https://stackoverflow.com/questions/15691224/mongoose-update-values-in-array-of-objects
const itemId = 2;
const query = {
  item._id: itemId 
};
Person.findOne(query).then(doc => {
  item = doc.items.id(itemId );
  item["name"] = "new name";
  item["value"] = "new value";
  doc.save();

  //sent respnse to client
}).catch(err => {
  console.log('Oh! Dark')
}); 
*/

// @route POST api/goals
// @desc POST All goals
// @access Private
/*
*
reqq.body={
    _id: '',
    goals:[{_id:'',goal:'',completed:''},{_id:'',goal:'',completed:''}]
} 
*/
// @route POST api/goals
// @desc POST All goals
// @access Private
router.post('/',auth,(req,res)=>{
    const goals = req.body.goals
    const _id = req.user.id
    User.findOneAndUpdate({_id:_id},{$set:{goals:goals}})
    .then(response=>{
        res.status(200).send(response)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({msg:err})
    })
})

// @route POST api/goals/update/status
// @desc UPDATE status of goals
// @access Private
router.get('/:id',(req,res)=>{
    User.find({_id: req.params.id})
    .then(
        item=>res.status(200).json(item[0].goals)
    )
    .catch(err=>res.status(403).json({msg:err}))
})

// @route POST api/goals/update/status
// @desc UPDATE status of goals
// @access Private
router.get('/',auth,(req,res)=>{
    User.find({_id: req.user.id})
    .then(
        item=>res.status(200).json(item[0].goals)
    )
    .catch(err=>res.status(403).json({msg:err}))
})

module.exports = router;