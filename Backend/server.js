var express= require("express");
var bodyParser= require("body-parser");
var cookieParser= require('cookie-parser');
var session = require('express-session');
const connectDB= require ('./DB/connection');

connectDB();

var passport= require('passport');
console.log("initializing passport auth...");
//app.use(passport.initialize());

var cors= require('cors');
var app= express();

var frontendURL= 'http://localhost:3000';

app.use(cors({
    origin: frontendURL,credentials: true
}));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_lab2',
    resave: false,// Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false,// Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60*60*1000,
    activeDuration: 5*60*1000
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

//Allow Access Control
app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', frontendURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


//student Routing
var student_login= require('./API/Student/student_login');
var student_signup= require('./API/Student/student_signup');

/*
// company Routing
var company_login= require('.API/Company/company_login.js');
var company_signup= require('.API/Company/company_signup.js');
*/

// student route config
app.use('/student_login',student_login);
app.use('/student_signup',student_signup);

/*
// company route config
app.use('/company_login',company_login);
app.use('/company_signup',company_signup);

*/
app.listen(3001);
console.log("Server is listening on port 3001 ...");