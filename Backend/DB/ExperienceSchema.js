var mongoose= require('mongoose');

const ExperienceSchema= new mongoose.Schema({
    companyname:{
        type: String
    },
    jobtitle:{
        type: String
    },
    companylocation:{
        type: String
    },
    startdate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    workdesc:{
        type: String
    }
})

var experience= mongoose.model('experience', ExperienceSchema);
module.exports={
    experience, ExperienceSchema
};



