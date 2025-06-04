import express from 'express'
const router = express.Router()

import ProductsMethods from '../controller/products.js'
import CategoriesMethods from '../controller/categories.js'

// ProductsMethods
router.get('/products', ProductsMethods.get)
router.post('/products',ProductsMethods.post)
router.delete('/products/:id', ProductsMethods.delete)
router.get('/product/detail/:id', ProductsMethods.getDetail)
router.put('/product/:id', ProductsMethods.put)
router.patch('/product/:id', ProductsMethods.patch)

// CategoriesMethods
router.get('/categories', CategoriesMethods.get)

export default router