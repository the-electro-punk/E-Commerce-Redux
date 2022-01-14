// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey: "category_id",
  onDelete: "CASCADE"
})

// Categories have many Products
// multiple items per csategory (IE: red and blue shirts)
Category.hasMany(Product, {
  foreignKey: "category_id"
})

// Products belongToMany Tags (through ProductTag)
// blue shirts that fit multiple tags and tags can fit multiple products (shirts or jeans)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id"
})
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: "tag_id"
})
// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
