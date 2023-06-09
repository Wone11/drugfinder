const db             =   require('../Config/db')
const Tables         =   require('../Utils/Tables')


/**
 * user class models
 */
class UserModel{

    static async GetAllUsers(){
        try {

            return new Promise(resolve => {
                db.query("select * from users", [], (error, result) => {
                    if (!error) {
                        resolve(result)
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!',error);
            return
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
    static async AddNewUser(userID,email,city,password,role,accessToken,loginStatus,status,authorizationDocument,remark,phoneNumber,fullName,passwordChangedAt){
        try {
            return new Promise((resolve) => {
                db.query(`insert into users(userID,email,city,password,role,accessToken,loginStatus,status,authorizationDocument,remark,phoneNumber,fullName,passwordChangedAt)
                 values(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [userID,email,city,password,role,accessToken,loginStatus,status,authorizationDocument,remark,phoneNumber,fullName,passwordChangedAt], (error, result) => {
                    if (!error)
                        resolve(true)
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
     * check user existense in database
     * @param {Check } email 
     */
    static async CheckExists(email){
        try {

            return new Promise(resolve => {
                db.query("SELECT COUNT(*) AS count FROM users WHERE email = ?", [email], (error, result) => {
                    if (!error) {
                        const count = result[0].count
                        console.log("count : ",count);
                        if(count===1){
                            resolve(result)
                        }
                        else{
                            resolve(false)
                        }
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!',error);
            return
        }
    }

      
    /**
     * check user existense in database using token
     * @param {Check } email 
     */
    static async CheckExistsByToken(accessToken){
        try {
            return new Promise(resolve => {
                db.query("SELECT COUNT(*) AS count FROM users WHERE accessToken = ?", [accessToken], (error, result) => {
                    if (!error) {
                        const count = result[0].count
                        console.log("count : ",count);
                        if(count===1){
                            resolve(result)
                        }
                        else{
                            resolve(false)
                        }
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!',error);
            return
        }
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
                var sql = `UPDATE ${Tables.USER_TABLE} SET ? WHERE userID= ?`;
                db.query(sql, [data,data.userID],(error,result) => {
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
     * Check user duplicates
     * @param {*} email 
     */
    static async CheckUser(email ,token , loginStatus){
        try {

            return new Promise(resolve => {
                db.query("SELECT * FROM users WHERE email = ?", [email], (error, result) => {
                    if (!error) {
                        if(result){
                            resolve(result)
                        }
                        else{
                            resolve(false)
                        }
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
         console.log("error happened during user checking!");
       }
    }

    /**
     * check user existence by user ID....
     * @param {*} userID 
     * @returns 
     */
    static async CheckUserByID(userID){
        try {

            return new Promise(resolve => {
                db.query(`SELECT * FROM ${Tables.USER_TABLE} WHERE userID = ?`, [userID], (error, result) => {
                    if (!error) {
                        if(result){
                            resolve(result)
                        }
                        else{
                            resolve(false)
                        }
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
         console.log("error happened during user checking!");
       }
    }
    
    /**
     * Delete users from Database...
     * @param {*} userID 
     * @returns 
     */
    static async DeleteUser(userID){
        try {

            return new Promise(resolve => {
                db.query(`DELETE FROM ${Tables.USER_TABLE} where userID = ? `, [userID], (error, result) => {
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

    static async ForgotPassword(){
        return Promise((resolve, reject)=>{
            //todos' here something.. . .
        })
    }

    /**
     * All inactive users
     * @returns 
     */
    static async GetAllInActiveUsers(){
        try {

            return new Promise(resolve => {
                db.query(`select * from ${Tables.USER_TABLE} where status = ? `, ['inactive'], (error, result) => {
                    if (!error) {
                        resolve(result)
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!',error);
            return
        }
    }

     /**
     * All inactive users
     * @returns 
     */
     static async GetAllACtiveCustomers(){
        try {

            return new Promise(resolve => {
                db.query(`select * from ${Tables.USER_TABLE} where status = ? `, ['active'], (error, result) => {
                    if (!error) {
                        resolve(result)
                    }else{
                        console.log('Error Happened during active status user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!',error);
            return
        }
    }

     /**
     * All inactive users
     * @returns 
     */
     static async GetAllPendedUsers(){
        try {

            return new Promise(resolve => {
                db.query(`select * from ${Tables.USER_TABLE} where status = ? `, ['pending'], (error, result) => {
                    if (!error) {
                        resolve(result)
                    }else{
                        console.log('Error Happened during user retrieval : ',error);
                        resolve(error)
                    }

                })
            })
        } catch (error) {
            console.log('Error Happened during users retrieval!',error);
            return
        }
    }

    static async Login(email){
        try {
            db.query('SELECT * FROM users WHERE email = ?'), [email], (error, result) => {
                return result
            }
        } catch (error) {
            console.log("error happened during user checking!" + error);
        }
    }

    static async Logout(){

    }
}

module.exports = UserModel;