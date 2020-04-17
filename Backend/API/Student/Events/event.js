var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getEvents', function (req, res) {
    console.log('inside get get events');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('select * from Event where ID NOT IN (select EID from EventRegistry where SID=?) ORDER BY date ASC', [req.query.ID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the events', r);
        res.send(r);
    }).catch(e => {
        console.log('get job error', e);
    })
})

app.post("/registerEvent", function (req, res) {
    console.log('inside post register event');
    console.log("req body", req.body);

    async function register() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('INSERT INTO `EventRegistry` (EID, SID) VALUES (?,?)', [req.body.ID, req.query.SID]);
        await connection.end();
    }

    register()
        .then(() => {
            console.log('registered successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

app.get('/getRegisteredEvents', function (req, res) {
    console.log('inside get get registered events');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT Event.ID, Event.name, Event.description, Event.time, Event.date, Event.location, Event.company FROM Event inner join EventRegistry on Event.ID = EventRegistry.EID where EventRegistry.SID = ? ORDER BY Event.date ASC', [req.query.SID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the registered events', r);
        res.send(r);
    }).catch(e => {
        console.log('get registered event error', e);
    })
})

module.exports=app;