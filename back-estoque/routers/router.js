import express from 'express'
const router = express.Router()

import verify_token from '../middleware/middle.js'

import ProductsMethods from '../controller/products.js'
import CategoriesMethods from '../controller/categories.js'
import CardMethods from '../controller/card.js'
import SearchMethod from '../controller/search.js'

// ProductsMethods
router.get('/products', ProductsMethods.get)
router.post('/products', verify_token, ProductsMethods.post)
router.delete('/products/:id', verify_token, ProductsMethods.delete)
router.get('/product/detail/:id', verify_token, ProductsMethods.getDetail)
router.put('/product/:id', verify_token, ProductsMethods.put)
router.patch('/product/:id', verify_token, ProductsMethods.patch)

// CategoriesMethods
router.get('/categories', verify_token, CategoriesMethods.get)

// CardMethods
router.put('/card/:id/:qtd', verify_token, CardMethods.put)
router.put('/lowerproduct/:id', verify_token, CardMethods.delete)

// SearchMethod
router.get('/search/product/:id/:name', verify_token, SearchMethod.get)

export default router