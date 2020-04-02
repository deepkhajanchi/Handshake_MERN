var mongoose= require('mongoose');

const EducationSchema= new mongoose.Schema({
    collegename:{
        type: String
    },
    collegelocation:{
        type: String
    },
    degree:{
        type: String
    },
    major:{
        type: String
    },
    passingyear:{
        tye:String
    },
    cgpa:{
        type: String
    }
})

var education= mongoose.model('education', EducationSchema);
module.exports={
    education, EducationSchema
};



