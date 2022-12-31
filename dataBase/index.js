const mysql = require('mysql2')

const connection = mysql.createConnection ({
    host:'localhost',
    user:'root',
    password:'14052001.Ll',
    database:'thinksyria'
})

module.exports = connection ;