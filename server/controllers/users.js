const express = require('express');
const router = express.Router();
const User = require('../models/User')

// user index route
router.get('/', async(req, res) =>{
  try{
    const users = await User.all
    res.json({users})
  }catch (err){
    res.status(500).json({err})
  }
})

// router.get('/:id', async(req, res) => {
//   try {
//     const user = await User.findById(parseInt(req.params.id))
//     res.json(user)
//   } catch (error) {
//     res.status(404).json({err})
//   }
// })

module.exports = router
