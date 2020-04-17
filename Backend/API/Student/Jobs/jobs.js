var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getJobs', function (req, res) {
    console.log('inside get get jobs');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('select * from Job left join JobRegistry on Job.ID = JobRegistry.JID');
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the jobs', r);
        res.send(r);
    }).catch(e => {
        console.log('get job error', e);
    })
})

app.get('/getAppliedJobs', function (req, res) {
    console.log('inside get get applied jobs');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT Job.title, Job.location, Job.salary, Job.company, JobRegistry.status FROM Job inner join JobRegistry on Job.ID = JobRegistry.JID where JobRegistry.SID = ?', [req.query.SID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the applied jobs', r);
        res.send(r);
    }).catch(e => {
        console.log('get registered event error', e);
    })
})

module.exports=app;