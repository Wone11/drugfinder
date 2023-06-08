

//import Product model
const ProductModel            =  require('../Models/ProductsModel')

module.exports={

    /**
     * Get all products 
     */
    GetAllProducts:async(req,res,next)=>{
        try {
            const data=await ProductModel
                .find()
                .then((producs) => {
                    if (producs) {
                        res.send(producs)
                    }else{
                        res.status(400).send("no products exists!")
                    }
                })
        } catch (error) {
            console.log("Error happened : ", error);
            next(error)

        }

    },

    GetByCity:async(req,res,next)=>{
        try {
            res.send('Gambia city')
            
        } catch (error) {
            console.log("Error Log",error);
            next(error)
            
        }
    }

}