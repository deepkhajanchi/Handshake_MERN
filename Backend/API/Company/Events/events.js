var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getEventOfCompany', function (req, res) {
    console.log('inside get get events');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('select * from Event where companyID=? ORDER BY date ASC ', [req.query.CID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the events of a company', r);
        res.send(r);
    }).catch(e => {
        console.log('get event error', e);
    })
})

app.post("/postEvent", function (req, res) {
    console.log('inside post event');
    console.log("req body", req.body);

    async function post() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('INSERT INTO Event (name,location,description,time,date, eligibility,company, companyID) VALUES (?, ?, ?, ?, ?, ?, ?,?)', [req.body.name, req.body.location, req.body.description, req.body.time, req.body.date, req.body.eligibility, req.body.company, req.body.CID]);
        await connection.end();
    }

    post()
        .then(() => {
            console.log('posted event successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

app.get('/getRegisteredStudents', function (req, res) {
    console.log('inside get get registered students');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT * FROM Student where ID IN (select SID from EventRegistry where EID = ?)', [req.query.ID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the registered students', r);
        res.send(r);
    }).catch(e => {
        console.log('get registered students error', e);
    })
})

module.exports=app;