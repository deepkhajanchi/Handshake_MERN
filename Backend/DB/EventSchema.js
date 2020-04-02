var mongoose= require("mongoose");

const EventSchema= new mongoose.Schema({
    eventname:{
        type: String
    },
    eventdesc:{
        type: String
    },
    eventtime:{
        type: String
    },
    eventdate:{
        type: Date
    },
    eventlocation:{
        type: String
    },
    eligibility:{
        type: String
    }
})

var events= mongoose.model('event',EventSchema);
module.exports={
    events, EventSchema
};