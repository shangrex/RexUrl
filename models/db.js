const { Sequelize } = require('sequelize');
require('dotenv').config()
console.log(process.env.storage)
// Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('db_rexurl', 't', 't', {
//   host: 'localhost',
//   dialect:'sqlite'
// });

console.log(process.env.dialect)

// connect to database
const sequelize = new Sequelize({
  dialect: process.env.dialect,
  storage: process.env.storage
});


sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
})

module.exports = sequelize;
