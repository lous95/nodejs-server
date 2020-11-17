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
        const allUsers = users.length;
        console.log(allUsers);
        res.status(200).json(users);  
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

router.get('/country', async (req,res) => {
    var palestine = 0;
    var hungary = 0;
    var greece = 0;
    var usa = 0;
    var dubai = 0;
    var total = 0;
    var percentageArr = [];

    try{
        const users = await Users.find();
        if (!users) throw Error('no users');
        users.forEach(function(user){
            total++;
            if( user.country == "Palestine"){
                palestine++;
            }
            if( user.country == "Hungary"){
                hungary++;
            }
            if( user.country == "Greece"){
                greece++;
            }
            if( user.country == "USA"){
                usa++;
            }
            if( user.country == "Dubai"){
                dubai++;
            }
        })
        var palestinePercent = Math.round((palestine / total) * 100) ;
        percentageArr.push(palestinePercent);

        var hungaryPercent = Math.round((hungary / total) * 100);
        percentageArr.push(hungaryPercent);

        var greecePercent = Math.round((greece / total) * 100);
        percentageArr.push(greecePercent);

        var usaPercent = Math.round(( usa / total) * 100);
        percentageArr.push(usaPercent);

        var dubaiPercent = Math.round((dubai / total) * 100);
        percentageArr.push(dubaiPercent);
        res.status(200).json(percentageArr);
    }
    catch(err){
        res.status(400).json({ msg : err})
    }
})

router.get('/count', async(req,res) =>{
    try{ 
        if(req.query.gender == ""){
            const users = await Users.find();
            if (!users) throw Error('No items');
            const allUsers = users.length;
            res.status(200).json(allUsers);
            return;
        }
        if(req.query.gender == "male"){
            let count = 0;
            const users = await Users.find();
            if (!users) throw Error('No items');
            users.forEach(function(user){
                if(user.gender == "Male")
                count++;
            })
            res.status(200).json(count);
           return;
        }
        if(req.query.gender == "female"){
            let count = 0;
            const users = await Users.find();
            if (!users) throw Error('No items');
            users.forEach(function(user){
                if(user.gender == "Female")
                count++;
            })
            res.status(200).json(count);
            return;
        }
    }
    catch(err){
        res.status(400).json( { msg: err} )
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
        res.status(400).json({ msg: err });
    }
})

// @routes update api/posts/:id
// @desc update an user

router.put('/:id', async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id, req.body);
        if (!user) throw Error('Something went wrong while updating!');
        res.status(200).json({ success: true })
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }
})

// @routes get one user
// @desc GET one user

router.get('/:id', async (req, res) => {

    try {
        const user = await Users.findById(req.params.id);
        console.log(req.params.id);
        if (!user) throw Error('No user found');
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400).json({ msg: err });
    }

})





module.exports = router;

