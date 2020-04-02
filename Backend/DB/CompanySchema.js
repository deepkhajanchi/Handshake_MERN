var mongoose= require("mongoose");

const CompanySchema= new mongoose.Schema({
    name:{
        type: String
    },
    companylocation:{
        type: String
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