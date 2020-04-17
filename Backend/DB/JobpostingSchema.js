var mongoose= require("mongoose");

var jobApplicant = new mongoose.Schema({
    studentID: { type: String },
    status: { type: String }
  });

var JobpostingSchema= new mongoose.Schema({
    jobTitle:{
        type: String,
        required: true
    },
    postingDate:{
        type: Date
    },
    applicationDeadline:{
        type: String
    },
    jobLocation:{
        type: String
    },
    salary:{
        type: String
    },
    jobDescription:{
        type: String
    },
    jobCategory:{
        type: String
    },
    jobApplicants:{
        type: Array
    },
    companyId:{
        type: String
    }
})
  
var jobs= mongoose.model('job',JobpostingSchema);
module.exports={
    jobs, JobpostingSchema
};