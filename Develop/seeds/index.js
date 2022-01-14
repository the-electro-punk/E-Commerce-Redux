// grabbing the info from each file
const seedCategories = require('./category-seeds');
const seedProducts = require('./product-seeds');
const seedTags = require('./tag-seeds');
const seedProductTags = require('./product-tag-seeds');

const sequelize = require('../config/connection');

// combines the information into one
// inputs all the data into the database
const seedAll = async () => {
  // syncing with the specific database
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  // push the data above into the database
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  process.exit(0);
};

seedAll();

// use this to acquire models
// const{Category, Product, Tag}=require("../models")

// takes the data from category.js and parses data / puts data into post
// Category.findAll().then((data)=>{res.json(data)})