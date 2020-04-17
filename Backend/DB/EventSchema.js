var mongoose= require("mongoose");

const EventSchema= new mongoose.Schema({
    eventName:{
        type: String,
        required: true
    },
    eventDescription:{
        type: String
    },
    eventtime:{
        type: Date
    },
    companyId:{
        type: String,
        required: true
    },
    eventLocation:{
        type: String
    },
    eventEligibility:{
        type: String
    },
    registrations:{
        type:Array
    }
})

var events= mongoose.model('event',EventSchema);
module.exports={
    events, EventSchema
};