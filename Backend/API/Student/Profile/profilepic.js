var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.post('/updateProfilePic', upload.single('profilePic'), function (req, res) {
    console.log("Inside update profile picture");
    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.path;
    // console.log('imagepath- ', imagepath, " & type of imagehath- ", typeof (imagepath));
    console.log('sid', req.body.SID)

    Students.findByIdAndUpdate({ _id: req.body.SID }, { profilePic: imagepath, name: imagepath }, { new: true })
        .then(student => {
            if (student) {
                console.log('profilePicURL: ', student.profilePic);
                res.redirect("http://localhost:3000/studentprofile");
            }
            else {
                console.log('wrong student id')
                res.status(401).end("wrong student id")
            }
        })
        .catch(error => {
            console.log('update profile picture error', error)
        })
});

app.get('/getProfilePic', function (req, res) {
    // console.log('req body', req.query)
    Students.findById({ _id: req.query.SID })
        .then(student => {
            if (student) {
                res.status(200).end(student.profilePic);
            }
            else {
                console.log('wrong student id')
                res.status(401).end("wrong student id")
            }
        })
        .catch(error => {
            console.log('update profile picture error', error)
        })
});

module.exports=app;