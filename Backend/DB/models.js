const mongoose= require('mongoose');
const connection =require ('./connection');

const studentSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String,
})