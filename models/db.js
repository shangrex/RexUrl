const { Sequelize } = require('sequelize');
require('dotenv').config()

// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('db_rexurl', 't', 't', {
//   host: 'localhost',
//   dialect:'sqlite'
// });


// connect to database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.storage
});


sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
})

module.exports = sequelize;
