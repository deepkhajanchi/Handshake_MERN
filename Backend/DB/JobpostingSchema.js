var mongoose= require("mongoose");

const JobpostingSchema= new mongoose.Schema({
    title:{
        type: String
    },
    postingdate:{
        type: Date,
        default: Date.now,
    },
    deadline:{
        type: Date
    },
    joblocation:{
        type: String
    },
    salary:{
        type: Number
    },
    jobdesc:{
        type: String
    },
    jobcategory:{
        type: String
    }
})

var jobs= mongoose.model('job',JobpostingSchema);
module.exports={
    jobs, JobpostingSchema
};