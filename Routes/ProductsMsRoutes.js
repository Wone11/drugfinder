const express               =  require('express')
const router                =  express.Router()

//product controllers
const ProductMsController     =  require('../Controllers/ProductsMscontroller')
const upload                  =  require('../Config/ProductMulterConfig')

//get all products
router.get('/products',ProductMsController.GetAllProducts)

//get all the products through user id
router.get('/:userID',ProductMsController.GetProductsByID)

//Get products by city
router.post('/add-product',upload.single('productImage'),ProductMsController.AddDrugs)

//update some specific product details...
router.patch('/update-products/:productID',upload.single('productImage'),ProductMsController.UpdateProducts)

module.exports =router