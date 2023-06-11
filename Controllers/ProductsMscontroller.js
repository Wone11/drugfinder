const ProductsModels    =   require('../Models/ProductsMsModel')
const UserMsModels      =   require('../Models/UserMSModel')

class ProductsMsController{

    /**
     * Retrieve a products Details
     * @param {*} req 
     * @param {*} res 
     */
    static async GetAllProducts(req,res){
       try {
           var products =await ProductsModels.GetAllDrugs()
        //    console.log('user data : ', products)
           if (products){
            if(products.length===0){
                console.log('there is no record found!')
                res.send('there is no record found!')
            }
            else{
                console.log('successefully retrieved Data : ',products);
                res.send(products)
            }
           }else{
               res.send('There is no products exists!')
           }
        
       } catch (error) {
        console.log('Error Happened : ',error);
       }
    }

    /**
     * add new user (user Registrations!)
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    static async AddDrugs(req,res,next){
        let { ...data } = req.body;
        let productImage = req.file.filename

        try { //try catch to handle crashing server 
            let datas = {
                data: data,
                productImage: productImage
            }
            await UserMsModels.CheckUserByID(datas.data.userID)
                .then((user) => {
                    if (user) {
                        ProductsModels.AddDrugs(datas.data.productID,datas.data.userID,datas.data.businessName,datas.data.city,datas.data.drugName,datas.productImage,datas.data.price,datas.data.amount,datas.data.description,datas.data.soldOut,datas.data.latitude,datas.data.longitude)
                            .then((products) => {
                                console.log('products : ' + products)
                                res.send(products)
                            }).catch(error => { console.log('error catched during product adding ! : ' + error);next(error) })
                    }if(user==="" || user ===undefined){
                        console.log('No authenticated user exists to insert a data ... ');
                        res.send('No authenticated user exists to insert a data ... ');
                        return
                    }
                }).catch(error => { console.log('before deta insertion checking user exists! .if error occured : ' + error); next(error)})
        } catch (error) {
            console.log('error happend during new user registration : ', error);
            next(error)
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    static async UpdateProducts(req,res,next){
        const productID = req.params.productID
        let amount = req.body.amount 
        let soldOut = req.body.soldOut
        amount = amount - soldOut
        if(soldOut > amount){
            res.send('sold amount more than total!')
            return
        }
        const data = {
            productID:productID,
            userID:req.body.userID,
            businessName:req.body.businessName,
            city:req.body.city,
            drugName:req.body.drugName,
            price:req.body.price,
            amount:amount,
            description:req.body.description,
            soldOut:req.body.soldOut,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
        }
       
        try {
            await ProductsModels.updateData(data)
                .then((products ,error)=>{
                    if(error) console.log('error during products update : ' + error)
                    res.json({
                        msg:"success",
                        statusCode:201,
                        data:products
                    })
                }).catch(error=>{console.log('error happened during product updates : ' + error);})
                 
            
        } catch (error) {
            console.log('error occured during products in fo update : ' + error);
        }

    }

    /**
     * Get all drugs by users ID
     */
    static async GetProductsByID(req,res,next){
        const userID = req.params.userID
        console.log('user Id : ' + userID);
        try {
            var products =await ProductsModels.GetDrugByUserID(userID)
         //    console.log('user data : ', products)
            if (products){
             if(products.length===0){
                 console.log('there is no record found!')
                 res.send('there is no record found!')
             }
             else{
                 console.log('successefully retrieved Data : ',products);
                 res.send(products)
             }
            }else{
                res.send('There is no products exists!')
            }
         
        } catch (error) {
         console.log('Error Happened : ',error);
        }
    }

      /**
      * Delete Users
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
      static async DeleteDrugs(req,res,next){
        const  productID = req.params.productID
        console.log('delete user iD : ' + productID);
        try {
            await ProductsModels.DeleteDrug(productID)
                .then((products ,error)=>{
                    if(error) console.log('error during users data delete : ' + error)
                    res.json({
                        msg:"success",
                        statusCode:201,
                        data:products
                    })
                }).catch(error=>{console.log('error happened during users deleting : ' + error);})
        } catch (error) {
            console.log('error occured during users deleting .. : ' + error);
        }

    }

}

module.exports = ProductsMsController