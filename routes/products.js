const express = require('express')
const router = express.Router()

const products = require('../controllers/products')

router.get('/products', products.show)
router.get('/products/create', products.create)
router.get('/products/:id/edit', products.edit)
router.put('/products/:id', products.update)
router.delete('/products/:id', products.destroy)

module.exports = router