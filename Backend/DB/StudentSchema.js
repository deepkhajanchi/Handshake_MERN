var mongoose= require('mongoose');

var Education= require('./EducationSchema');
var Experience= require('./ExperienceSchema');

var StudentSchema= new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        required: true
    },
    studentPassword: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    graduationYear: { 
        type: String
    },
    studentProfilePic:{
        type:String
    },
    dob:{
        type: String
    },
    careerObjective:{
        type: String
    },
    skillSet:{
        type: String
    },
    city:{
        type: String
    },
    state:{
        type: String
    },
    country:{
        type:String
    },
    phoneNumber:{
        type: String
    },
    education:{
        type: [Education.EducationSchema]
    },
    experience:{
        type: [Experience.ExperienceSchema]
    },
    registeredEvents:{ 
        type: Array
    },
    jobApplications:{
        type: Array
    },

});

var students= mongoose.model('student',StudentSchema);
module.exports={
    students, StudentSchema
};