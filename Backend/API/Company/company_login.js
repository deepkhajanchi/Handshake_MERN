var express= require("express");
var mongoose= require("mongoose");
var jwt=require('jsonwebtoken');
var passport= require('passport');
var bcrypt= require('bcrypt-nodejs');

var router= express.Router();
const Company= require('../../DB/CompanySchema');

router.post('/companylogin',(req, res)=>{
    var email= req.body.email;
    var password= req.body.password;

    Company.find({email})
    .then((company) => {
    if(!company){
        return res.status(404).json({
            email: "Company not found"
        });
    }     // password hashing and match with the current one
    bcrypt.compare(password, company.password)
    .then(isMatch =>{
        if(isMatch){
            console.log(" credentials matched");
        }else{
            return res.status(400).json({
                password: "Incorrect password"
            });
        }
    });
    });
});

module.exports= router;