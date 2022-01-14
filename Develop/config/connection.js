require('dotenv').config();

// using node on seeds/index.js inputs seed data into database
// use = in .env files
const Sequelize = require('sequelize');
// console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW)

// this pulls the database name and login info from my .env and uses it to connect to mysql
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  // this collects the data from the .env file
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
