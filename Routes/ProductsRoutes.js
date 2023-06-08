const express               =  require('express')
const router                =  express.Router()

//product controllers
const ProductController     =  require('../Controllers/ProductsControllers')

//get all products
router.get('/',ProductController.GetAllProducts)

//get drugs by user who own a company
// router.get('/',ProductController.GetAllProductsByID)

//Get products by city
router.get('/city',ProductController.GetByCity)



module.exports =router