var mongoose= require('mongoose');

const EducationSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    collegeName:{
        type: String,
        required: true
    },
    location:{
        type: String
    },
    degree:{
        type: String
    },
    major:{
        type: String
    },
    yearOfpassing:{
        tye:String
    },
    cgpa:{
        type: Number
    }
})

var education= mongoose.model('education', EducationSchema);
module.exports={
    education, EducationSchema
};



