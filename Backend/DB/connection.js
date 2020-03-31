const mongoose= require("mongoose");

const URI='mongodb+srv://deepkhajanchi:ubuntu8233@handshakelab2-n8u1j.mongodb.net/test?retryWrites=true&w=majority';

const connectDB= async()=>{
    await mongoose.connect(URI,{
        useUnifiedTopology:true,
        useNewUrlParser: true
    });
    console.log('database is connected!');
};

module.exports= connectDB;
