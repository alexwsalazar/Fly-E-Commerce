const router = require('express').Router();
const { response } = require('express');
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all products
  Tag.findAll({
    include: [{model:Product, through:ProductTag}]
  }).then(response => res.json(response) )
  .catch(err => res.json(err) )
  // be sure to include its associated Category and Tag data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    include: [{model:Product, through:ProductTag}],
    where: {id:req.params.id}
  }).then(response => res.json(response) )
  .catch(err => res.json(err) )
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then(response => res.json(response) )
  .catch(err => res.json(err) )
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,
    { where:{ id:req.params.id }
  }).then(response => res.json(response) )
    .catch(err => res.json(err) )
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({where:{id:req.params.id}
  }).then(response => res.json(response) )
    .catch(err => res.json(err) )
});

module.exports = router;
