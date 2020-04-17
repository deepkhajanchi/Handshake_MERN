var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.post('/apply', upload.single('resume'), function (req, res) {
    console.log("apply job api")
    console.log('req body', req.body)
    let SID = req.body.SID;
    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.path;
    let sql = 'Insert into JobRegistry (JID, SID, resume, status) values (?,?,?,?)';
    console.log('imagepath', imagepath);
    async function updateData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute(sql, [req.body.ID, SID, imagepath, 'Pending']);
        await connection.end();
    }
    updateData()
        .then((r) => {
            console.log("uploaded resume successfully");
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
});

module.exports=app;