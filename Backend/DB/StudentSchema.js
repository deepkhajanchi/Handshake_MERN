const mongoose= require('mongoose');

var Education= require('./EducationSchema');
var Experience= require('./ExperienceSchema');

const StudentSchema= new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    collegename: {
        type: String,
        required: true
    },
    dob:{
        type: Date
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
    careerobj:{
        type: String
    },
    education:{
        type: [Education.EducationSchema]
    },
    experience:{
        type: [Experience.ExperienceSchema]
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    skillset:{
        type: String
    },
    profpic:{
        type:String
    }
});

var students= mongoose.model('student',StudentSchema);
module.exports={
    students, StudentSchema
};