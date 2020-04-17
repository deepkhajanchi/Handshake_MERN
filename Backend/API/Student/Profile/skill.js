var express= require("express");
var mongoose= require("mongoose");
var app=express();

app.post("/addSkill", function (req, res) {
    console.log('inside post add skill');
    let SID = req.query.ID;
    let skill = req.body.skill;
    console.log('skill to be added', skill)
    async function storeData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('SELECT SkillID FROM Skill where skill = ? LIMIT 1;', [skill]);
        await connection.end();
        console.log('skill found', rows);
        if (Array.isArray(rows) && rows.length) {
            const [updatedrows, fields] = await connection.execute('INSERT INTO `Skill` (SkillID, SID, skill) VALUES (?,?,?)', [rows[0].SkillID, SID, skill]);
        }
        else {
            const [updatedrows, fields] = await connection.execute('INSERT INTO `Skill` (SID, skill) VALUES (?,?)', [SID, skill]);
        }
    }

    storeData()
        .then(() => {
            console.log('skill added successfully');
            res.end();
        }).catch(e => {
            console.log('skill add error:', e)

        })
})

app.post('/updateSkill', function (req, res) {
    console.log('inside post update skill');
    let ID = req.body.ID;
    let SID = req.body.SID;
    let skill = req.body.skill;
    console.log('skill to be updated', ID, skill, req.query.SID)
    async function updateData1() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('UPDATE Skill SET skill=? WHERE SID = ? && SkillID=? ', [skill, SID, ID]);
        await connection.end();
    }

    updateData1()
        .then(() => {
            console.log("skill updated successfully");
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

app.post("/deleteSkill", function (req, res) {
    console.log('inside post delete skill');
    let ID = req.body.ID;
    let SID = req.body.SID;
    console.log("ID to be deleted", ID);

    async function deleteData() {

        const connection = await mysql.createConnection({ host: 'handshakedb.clco8f6rhzmw.us-east-1.rds.amazonaws.com', user: 'admin', password: 'admin123', database: 'handshake_clone', port: 3306 });
        const [rows, fields] = await connection.execute('DELETE FROM `Skill` WHERE `SkillID`=? && SID=?', [ID, SID]);
        await connection.end();
    }

    deleteData()
        .then(() => {
            console.log('skill deleted successfully');
            res.end();
        }).catch(e => {
            console.log(e)
            console.log('error aavi')
        })
})

module.exports=app;