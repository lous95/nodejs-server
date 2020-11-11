const express = require('express');
const router = express.Router();

//users Model

const Users = require('../../models/Posts');

//@routes get api/users
// retrieve all users

router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        if (!users) throw Error('No items');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
// @routes POST api/user
// @ Create new user
router.post('/', async (req, res) => {
    const newUser = new Users(req.body);
    try {
        const user = await newUser.save();
        if (!user) throw Error('Something went wrong');

        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
// @routes delete api/posts/:id
// @desc delete an post

router.delete('/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndDelete(req.params.id);
        if (!user) throw Error('no user found');

        res.status(200).json({ success: true })
    }
    catch (err) {
        res.status(400).json({ msg: err});
    }
})

// @routes update api/posts/:id
// @desc update an user

router.patch('/:id', async (req, res) => {
    try{
        const user = await Users.findByIdAndUpdate(req.params.id, req.body);
        if(!user) throw Error('Something went wrong while updating!');
        res.status(200).json({ success : true})
    }
    catch(err){
        res.status(400).json({ msg : err});
    }
})

// @routes get one user
// @desc GET one user


router.get('/:id', async (req,res) =>{

    try{
        const user = await Users.findById(req.params.id);
        if(!user) throw Error('No user found');
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json({ msg : err});
    }

})



module.exports = router;

