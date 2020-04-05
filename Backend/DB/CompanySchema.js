var mongoose= require("mongoose");

const CompanySchema= new mongoose.Schema({
    companyname:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    city:{
        type: String,
        required:true
    },
    state:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required:true
    },
    companydesc:{
        type: String
    },
    contact:{
        type: String
    },
    profilepic:{
        type: String
    }
})

var companies= mongoose.model('company',CompanySchema);
module.exports={
    companies, companySchema
};