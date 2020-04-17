var mongoose= require('mongoose');

const ExperienceSchema= new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    companyName:{
        type: String
    },
    location:{
        type: String
    },
    title:{
        type: String
    },
    startDate:{
        type: Date
    },
    endDate:{
        type: Date
    },
    description:{
        type: String
    }
})

var experience= mongoose.model('experience', ExperienceSchema);
module.exports={
    experience, ExperienceSchema
};



