var mongoose= require("mongoose");

var CompanySchema= new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    companyPassword:{
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
    description:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    websiteUrl:{
        type:String
    },
    companyProfilepic:{
        type: String
    },
    jobs: { 
        type: Array
    },
    events: { 
        type: Array
    }
})

var companies= mongoose.model('company',CompanySchema);
module.exports={
    companies, companySchema
};