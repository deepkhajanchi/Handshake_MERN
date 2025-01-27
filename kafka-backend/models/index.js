'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
require('dotenv').config()

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0,
};
mongoose.connect('mongodb+srv://deepkhajanchi:ubuntu8233@handshakelab2-n8u1j.mongodb.net/test?retryWrites=true&w=majority', options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    require(path.join(__dirname, file))
  });
