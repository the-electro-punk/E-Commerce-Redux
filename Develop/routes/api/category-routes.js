const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product]
  }).then((response) => {
    res.json(response)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    // finds data based on id parameter
    where: {
      id: req.params.id
    },
    include: [Product]
  }).then((response) => {
    res.json(response)
  })
});
// this creates a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then((newCategory) => {
    res.json(newCategory)
  })
});
//  using '/:id' alters data based on id
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // only use req.body when there's user input (we're sending info in)
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then((response)=> {
    res.json(response)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then((response)=> {
    res.json(response)
  })
});

module.exports = router;
