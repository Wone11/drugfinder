const Sequelize = require('sequelize');
// const dotenv    = require('dotenv');

// dotenv.config();

const db =  new Sequelize("drugfinder",'mysql',"", {
  host: '127.0.0.1',
  user:'root',
  password:'',
  dialect: "mysql",
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

db.authenticate()
   .then(()=>{console.log("Mysql connected successefully!")})
   .catch(error=>console.log("Error Happened during database connection : "+error))
module.exports  =db