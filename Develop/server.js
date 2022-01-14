const express = require('express');
const routes = require('./routes');
const mysql = require('mysql');
// const { sequelize } = require('./models/Product');
const sequelize = require('./config/connection')

// this links to list of products script
// let products = require('./seeds/product-seeds.js')

// this connects the JS code to the database
// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'password',
//   // database: 'ecommerce_db',
//   // port: '3001',
// })

// // this connects to mysql and creates a database
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log('connected');
//   connection.query("CREATE DATABASE ecommerce_db", function(err, result) {
//     if (err) throw err;
//     console.log('database created');
//   })
// })

// this was code from a previous challenge in an attempt to insert data into the table
// connection.query(`INSERT INTO ${tableName}(ID, Employee, Position, Department) VALUES (${empID},'${nameEmp}','${position}','${department}')`, (err,rows) => {
//   if(err) {
//       throw err
//   }
//   else {
//       console.log('data inserted')
//       console.log(rows)
//   }
// })

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force:false}).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });  
})

// be able to connect to a database, download seed data, then input data???