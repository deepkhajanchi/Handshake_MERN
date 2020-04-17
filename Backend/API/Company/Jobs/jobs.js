var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getCompanyJobs', function (req, res) {
    console.log('inside get get company jobs');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('select * from Job where companyID =?', [req.query.CID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the company jobs', r);
        res.send(r);
    }).catch(e => {
        console.log('get company job error', e);
    })
})

app.post("/changeAppStatus", function (req, res) {
    console.log('inside post change app status');

    async function register() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('UPDATE JobRegistry SET status=? WHERE JID=? && SID=? ', [req.body.status, req.body.JID, req.body.SID]);
        await connection.end();
    }

    register()
        .then(() => {
            console.log('app status updated successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

app.post("/postJob", function (req, res) {
    console.log('inside post post job');

    async function register() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('INSERT INTO `Job` (title, postingDate, deadline, location, description,salary, category, company, companyID) VALUES (?,?,?,?,?,?,?,?)', [req.body.title, req.body.postingDate, req.body.deadline, req.body.location, req.body.description, req.body.salary, req.body.category, req.body.companyName, req.body.CID]);
        await connection.end();
    }

    register()
        .then(() => {
            console.log('posted job successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

app.get('/getAppliedStudents', function (req, res) {
    console.log('inside get get applied students');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT * FROM Student inner join JobRegistry on JobRegistry.SID = Student.ID where JobRegistry.JID = ?', [req.query.ID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the applied students', r);
        res.send(r);
    }).catch(e => {
        console.log('get applied students error', e);
    })
})

module.exports=app;