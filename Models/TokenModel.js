const db             =   require('../Config/db')

/**
 * user class models
 */
class TokenModel{

    static async GetToken(email){
        try {

            return new Promise(resolve => {
                db.query("select * from tokens where email = ?", [email], (error, result) => {
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
    * Add new user access controller token
    * @param {*} userID 
    * @param {*} email 
    * @param {*} token 
    * @returns 
    */
    static async AddToken(email,accessToken){
        try {
            return new Promise((resolve) => {
                db.query(`insert into tokens(email,accessToken)values(?,?)`, [email,accessToken], (error, result) => {
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
}

module.exports = TokenModel