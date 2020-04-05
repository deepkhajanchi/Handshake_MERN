var express= require("express");
var mongoose= require("mongoose");
const bcrypt= require('bcrypt-nodejs');
const jwt= require('jsonwebtoken');
var router= express.Router();

const Student= require('../../DB/StudentSchema');

router.post("/studentsignup", (req, res)=>{
    Student.find({
        email: req.body.email
    }).exec()
    .then(student=>{
        if(student){
            return res.status(400).json({
                message: "Email is already exist!"
            });
        }else{
            bcrypt.hash(req.body.password, 10, (err,hash) => {
                if(err){
                    return res.status(500).json({
                        error: err
                    });
                }else{
                    const student= new Student({
                        collegename: req.body.collegename,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        email: req.body.email,
                        password: hash
                    });
                    student.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message: "Student is created"
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                         error:err
                        });
                    });
                }
            });
        }
    });
});

module.exports= router;