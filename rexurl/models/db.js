const { Sequelize } = require('sequelize');
require('dotenv').config()
// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('db_rexurl', 't', 't', {
//   host: 'localhost',
//   dialect:'sqlite'
// });


// connect to database
// sqlite
// const sequelize = new Sequelize({
//   dialect: process.env.dialect,
//   storage: process.env.storage
// });

// mysql
const sequelize = new Sequelize('db_rexurl', 'root', process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.dialect,
  port: process.env.db_port
});

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
})

module.exports = sequelize;
