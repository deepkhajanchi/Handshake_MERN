var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getEducationDetails', function (req, res) {
    console.log('inside get get education details');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT `ID`,`school`,`schoolLocation`,`degree`,`major`,`passingYear`,`gpa` FROM `EducationDetails` WHERE `SID`=(?) ORDER BY `passingYear` DESC', [req.query.ID]);

        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        res.send(r);
    }).catch(e => {
        console.log(e)
        console.log('get educatio error', e)
    })
})

app.post('/updateEducationDetails', function (req, res) {
    console.log('inside post abcd update education details');
    console.log(req.body)
    let ID = req.body.ID;
    let school = req.body.school;
    let schoolLocation = req.body.schoolLocation;
    let degree = req.body.degree;
    let major = req.body.major;
    let passingYear = req.body.passingYear;
    let gpa = req.body.gpa;

    async function updateData1() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('UPDATE `EducationDetails` SET `school`= (?), `schoolLocation`= (?), `degree` = (?), `major` = (?), `passingYear` = (?), `gpa`= (?) WHERE `SID` = (?) && `ID`=(?) ', [school, schoolLocation, degree, major, passingYear, gpa, req.query.SID, ID]);
        await connection.end();
    }

    updateData1()
        .then(() => {
            console.log("education updated successfully");
        }).catch(e => {
            console.log('update education error', e)
        })
})

app.post("/addEducationDetails", function (req, res) {
    console.log('inside post add education details');
    let ID = req.body.ID;
    let school = req.body.school;
    let schoolLocaiton = req.body.schoolLocation;
    let degree = req.body.degree;
    let major = req.body.major;
    let passingYear = req.body.passingYear;
    let gpa = req.body.gpa;

    async function storeData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('INSERT INTO `EducationDetails` (SID, school, schoolLocation, degree, major, passingYear, gpa) VALUES (?,?,?,?,?,?,?)', [ID, school, schoolLocaiton, degree, major, passingYear, gpa]);
        await connection.end();
    }

    storeData()
        .then(() => {
            console.log('education added successfully');
        }).catch(e => {
            console.log('add education error', e)
        })
})

app.post("/deleteEducationDetails", function (req, res) {
    console.log('inside post delete education details');
    let ID = req.body.ID;
    console.log("ID to be deleted", ID);

    async function deleteData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('DELETE FROM `EducationDetails` WHERE `ID`=?', [ID]);
        await connection.end();
    }

    deleteData()
        .then(() => {
            console.log('education deleted successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

module.exports=app;