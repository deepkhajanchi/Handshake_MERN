var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getCompanyDetails', function (req, res) {
    console.log('inside get get company details');
    // let ID = localStorage.getItem("ID");

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT * from Company where ID=?', [req.query.CID]);
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got the company details', r);
        res.send(r);
    }).catch(e => {
        console.log('get company details error', e);
    })
})

app.post("/updateCompanyContact", function (req, res) {
    console.log('inside post update company contact');
    console.log("req body", req.body);
    let hash = bcrypt.hashSync(req.body.password, salt);

    async function register() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('UPDATE Company SET email=?, phone=?, password=? WHERE ID=? ', [req.body.email, req.body.phone, hash, req.body.CID]);
        await connection.end();
    }

    register()
        .then(() => {
            console.log('update contact successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

app.post("/updateCompanyDetails", function (req, res) {
    console.log('inside post update company details');
    console.log("req body", req.body);
    async function register() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('UPDATE Company SET companyName=?, location=?, description=? WHERE ID=? ', [req.body.companyName, req.body.location, req.body.description, req.body.CID]);
        await connection.end();
    }

    register()
        .then(() => {
            console.log('update company details successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

module.exports=app;