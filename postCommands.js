const express = require('express');
const router = express.Router();
const PostAdmin = require('../models/adminSchema');
const PostCustomer = require('../models/customerSchema');

// SEARCH AN ADMIN BY NAME
router.get('/admins/:name', async(req, res) => {
    try{
        // const admin = await PostAdmin.findOne({ username : "admin4"});
        const admin = await PostAdmin.findOne({ username : req.params.name});
        req.json(admin);
    } catch(err){
        res.json({ message : err });
    }
});

router.get('/update',(req,res)=>{
    res.send('Done Again');
});
router.get('/add',(req,res)=>{
    res.send('we are on post akura');
});
// ---ADMIN ACTIONS---
// SUBMITS AN ADMIN
router.post('/registerAdmin', async(req, res) => {
    const admin = new PostAdmin({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        mobile: req.body.mobile
    });
    try{
        const savedPost = await admin.save();
        res.json(savedPost);
    } catch(err){
        res.json({ message : err });
    }
});



// GET BACK ALL ADMINS
router.get('/admins', async(req, res) => {
    try{
        const admin = await PostAdmin.find();
        res.json(admin);
    } catch(err){
        res.json({ message : err });
    }
});
// EDIT AN ADMIN
router.put('/editAdmin/:adminId', function(req, res){
    // check *** how edit only one param in once not all ?
    PostAdmin.findByIdAndUpdate(req.params.adminId, 
        {$set : {username: req.body.username, password: req.body.password,
            email: req.body.email, mobile: req.body.mobile}}, 
            {new : true}, function(err,response){
            if(err){
                req.json({ message : 'Database update Failure /n' + err });
            }
            else{
                res.json(response);
            }
        });
});
// DELETE AN ADMIN
router.delete('/deleteAdmin/:adminId', async(req,res) => {
    try{
        const delAdmin = await PostAdmin.findByIdAndDelete(req.params.adminId);
        res.json(delAdmin);
    }
    catch(err){
        res.json({ message : err });
    }
});
// ---CUSTOMER ACTIONS---
// SUBMITS A CUSTOMER
router.post('/registerCustomer', async(req, res) => {
    const customer = new PostCustomer({
        username: req.body.username,
        password: req.body.password
    });
    try{
        const savedPost = await customer.save();
        res.json(savedPost);
    } catch(err){
        res.json({ message : err });
    }
});
// GET BACK ALL CUSTOMERS
router.get('/customers', async(req, res) => {
    try{
        const customer = await PostCustomer.find();
        res.json(customer);
    } catch(err){
        res.json({ message : err });
    }
});
// GET A CUSTOMERS
router.get('/customers/:customerId', async(req, res) => {
    try{
        const customer = await PostCustomer.findById(req.params.customerId);
        res.json(customer);
    } catch(err){
        res.json({ message : err });
    }
});

module.exports = router;