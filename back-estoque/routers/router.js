import express from 'express'
const router = express.Router()

import ProductsMethods from '../controller/products.js'
import CategoriesMethods from '../controller/categories.js'

router.get('/products', ProductsMethods.get)
router.get('/categories', CategoriesMethods.get)
router.post('/products',ProductsMethods.post)
router.delete('/products/:id', ProductsMethods.delete)
router.get('/product/detail/:id', ProductsMethods.getDetail)

export default router