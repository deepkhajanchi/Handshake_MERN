var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.post("/deleteExperience", function (req, res) {
    console.log('inside post delete experience');
    let ID = req.body.ID;
    console.log("ID to be deleted", ID);

    async function deleteData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('DELETE FROM `Experience` WHERE `ID`=?', [ID]);
        await connection.end();
    }

    deleteData()
        .then(() => {
            console.log('experience deleted successfully');
            res.end();
        }).catch(e => {
            console.log('delete experience error', e)
        })
})
app.get('/getExperience', function (req, res) {
    console.log('inside get get experience');
    // console.log(req.body);

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('select ID, companyName,title, location,startDate, endDate, description from Experience where SID = ?', [req.query.ID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        // console.log('experience details found', r);
        res.send(r);
    }).catch(e => {
        console.log(e)
        console.log('error aavi')
    })
})

app.post("/addExperience", function (req, res) {
    console.log('inside post add experience');
    let ID = req.body.ID;
    let companyName = req.body.companyName;
    let title = req.body.title;
    let location = req.body.location;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let description = req.body.description;

    async function storeData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('INSERT INTO `Experience` (SID, companyName, title, location, startDate, endDate, description) VALUES (?,?,?,?,?,?,?)', [ID, companyName, title, location, startDate, endDate, description]);
        await connection.end();
    }

    storeData()
        .then(() => {
            console.log('experience added successfully');
        }).catch(e => {
            console.log('add experience error', e)
        })
})

app.post('/updateExperience', function (req, res) {
    console.log('inside post update experience');
    console.log(req.body)
    let ID = req.body.ID;
    let SID = req.body.SID;
    let companyName = req.body.companyName;
    let title = req.body.title;
    let location = req.body.location;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let description = req.body.description;

    async function updateData1() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('UPDATE Experience SET companyName=?, title=?, location=?, startDate=?, endDate=?, description=? WHERE SID = ? && ID=? ', [companyName, title, location, startDate, endDate, description, SID, ID]);
        await connection.end();
    }

    updateData1()
        .then(() => {
            console.log("experience updated successfully");
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

module.exports=app;