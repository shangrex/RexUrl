const { DataTypes, Model } = require('sequelize');
const sequelize = require('./db')

// define the database schema
const Url = sequelize.define('Url', {
  // Model attributes are defined here
  true_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  short_url: {
    type: DataTypes.TEXT,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  timestamps: false,
  // Other model options go here
});


// if the table not exist in the database, then create one(dose nothing if already existed)
Url.sync(); 

module.exports = Url;