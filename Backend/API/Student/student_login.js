var express= require("express");
var mongoose= require("mongoose");
var jwt=require('jsonwebtoken');
var passport= require('passport');
var bcrypt= require('bcrypt-nodejs');

var app= express();
const Student= require('../../DB/StudentSchema');

app.post('/studentlogin',(req, res)=>{
    var email= req.body.email;
    var password= req.body.password;

    Student.find({email})
    .then((student) => {
    if(!student){
        return res.status(404).json({
            email: "Student not found"
        });
    }     // password hashing and match with the current one
    bcrypt.compare(password, student.password)
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

module.exports= app;