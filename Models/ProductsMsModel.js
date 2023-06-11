const db      =   require('../Config/db')
const Tables  =   require('../Utils/Tables')

/**
 * user class models
 */
class ProductsMsModel{

    static async GetAllDrugs(){
        try {

            return new Promise(resolve => {
                db.query(`SELECT * FROM ${Tables.PRODUCT_TABLE}`, [], (error, result) => {
                    console.log("here are error~", error);
                    if (!error) {
                        resolve(result)
                    }
                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!');
        }
    }

    /**
     * Get all drugs belongs to ones company owner!
     * @param {*} userID 
     * @returns 
     */
    static async GetDrugByUserID(userID){
        try {

            return new Promise(resolve => {
                db.query(`SELECT * FROM ${Tables.PRODUCT_TABLE} WHERE userID =${userID}`, [], (error, result) => {
                    console.log("here are error~", error);
                    if (!error) {
                        resolve(result)
                    }
                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!');
        }
    }

    /**
     * 
     * @param {*} drugName 
     */
    static async GetProductByName(drugName){

    }

    /**
     * Get all drugs for a company
     * @param {*} userID 
     */
    static async GetDrugByCompany(userID){
        try {

            return new Promise(resolve => {
                db.query(`SELECT * FROM ${Tables.PRODUCT_TABLE} WHERE userID = ?`, [userID], (error, result) => {
                    console.log("here are error~", error);
                    if (!error) {
                        resolve(result)
                    }
                    resolve(false)
                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!');
        }
    }

      /**
     * Delete users from Database...
     * @param {*} userID 
     * @returns 
     */
      static async DeleteDrug(productID){
        try {

            return new Promise(resolve => {
                db.query(`DELETE FROM ${Tables.PRODUCT_TABLE} where productID = ? `, [productID], (error, result) => {
                    if (!error) {
                        resolve(result)
                    }else{
                        console.log('Error Happened during user deletion : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users deletion!',error);
            return
        }
    }

    /**
     * Get Near by drug shops
     * @param {*} location 
     */
    static async GetNearByDrugShop(location){

    }

    /**
     * update products data...
     * @param {*} table 
     * @param {*} obj 
     * @param {*} callback 
     */
    static async updateData(data) {
        try {
            return new Promise((resolve) => {
                var sql = `UPDATE ${Tables.PRODUCT_TABLE} SET ? WHERE productID= ?`;
                db.query(sql, [data,data.productID],(error,result) => {
                    if (!error)
                        resolve(result)
                    else {
                        console.log("Error Happened : ", error);
                        resolve(false)
                    }
                })


            })
        } catch (error) {
            console.log('error happened during user creation : ', error);
        }
    }

    /**
     * User registration Model
     * @param {*} userName 
     * @param {*} city 
     * @param {*} email 
     * @param {*} password 
     * @param {*} token 
     * @param {*} loginStatus 
     * @param {*} status 
     * @returns 
     */
    static async AddDrugs(productID,userID,businessName,city,drugName,productImage,price,amount,description,soldOut,latitude,longitude){
        // console.log('inserting data + ' + data.datas.userID);
        try {
            return new Promise((resolve) => {
                db.query(`INSERT INTO ${Tables.PRODUCT_TABLE} values(?, ?,?, ?,?, ?, ?, ?, ?, ?, ?,?) `,
                 [productID,userID,businessName,city,drugName,productImage,price,amount,description,soldOut,latitude,longitude], (error, result) => {
                    if (!error)
                        resolve(result)
                    else {
                        console.log("Error Happened : ", error);
                        resolve(false)
                    }
                })
            })
        } catch (error) {
            
            console.log(`error happened during creation of data :😁 `, error);
        }
    }
}

module.exports =ProductsMsModel