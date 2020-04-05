var express= require("express");
var mongoose= require("mongoose");
const bcrypt= require('bcrypt-nodejs');
const jwt= require('jsonwebtoken');
var router= express.Router();

const Company= require('../../DB/CompanySchema');

router.post("/companysignup", (req, res)=>{
    Company.find({
        email: req.body.email
    }).exec()
    .then(company=>{
        if(company){
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
                    const company= new Company({
                        companyname: req.body.companyname,
                        email: req.body.email,
                        password: hash,
                        city: req.body.city,
                        state: req.body.state,
                        country: req.body.country
                    });
                    company.save()
                    .then(result=>{
                        console.log(result);
                        res.status(201).json({
                            message: "Company is created"
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