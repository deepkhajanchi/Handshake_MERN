var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.get('/getAllStudents', function (req, res) {
    console.log('inside get get all students');

    async function getData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [upadatedRows, fields1] = await connection.execute('SELECT Student.ID, Student.name,Student.email, Student.school,Student.profilePicUrl, Student.passingYear,Student.phone,Student.careerObjective, group_concat(Skill.skill) as skills FROM Student left join Skill on Skill.SID = Student.ID group by Student.ID;');
        await connection.end();
        return upadatedRows;
    }

    data = getData()
    data.then((r) => {
        console.log('got all students', r);
        res.send(r);
    }).catch(e => {
        console.log('get all students error', e);
    })
})

module.exports=app;
