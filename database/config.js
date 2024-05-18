// 'use strict';

const mysql = require('mysql')

//local mysql db connection
var connection = mysql.createConnection({
    host        :process.env.host,
    user        :process.env.user,
    password    :process.env.password,
    database    :process.env.database
});

connection.connect()

module.exports = connection