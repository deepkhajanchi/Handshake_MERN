var mongoose= require('mongoose');

const ApplicationSchema= new mongoose.Schema({
    status:{
        type: String
    },
    resume:{
        type: String,
        required: true
    },
    applicationdate:{
        type: Date
    }
})

var applications= mongoose.model('application', ApplicationSchema);
module.exports={
    applications, ApplicationSchema
};