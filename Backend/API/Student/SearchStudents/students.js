var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getStudents', function (req, res) {
    console.log('inside get get students');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT * from Student where ID <> ?', [req.query.SID]);
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