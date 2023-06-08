const MYSQL = require('mysql')

const db = MYSQL.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'drugfinder'
});

db.getConnection(()=>{console.log("Connected to db successefully!");})

module.exports=db;