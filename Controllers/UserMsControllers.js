const UserMsModel         =   require('../Models/UserMSModel')
const TokenModel          =   require('../Models/TokenModel')
const bcrypt              =   require('bcryptjs')
const asyncHandller       =   require('express-async-handler')
const {JOISchema}         =   require('../Common/Validations')
const createError         =   require('http-errors')
const crypto              =   require('crypto')

//controllers body
const {SignAccessToken,SignRefreshToken, VerifyRefreshToken}   =   require('../Common/JwtToken')
const SendMail                                                 =   require('../Common/EmailController')
const client                                                   =   require('../Common/RedisConnection')
const dateTime                                                 =   require('../Common/CurrentTime')

/**
 * all about user controller class
 */
class UserMsControllers{


    /**
     * Retrieve a users Details
     * @param {*} req 
     * @param {*} res 
     */
    static GetAllUsers =asyncHandller(async (req,res)=>{
        try {
            var users =await UserMsModel.GetAllUsers()
         //    console.log('user data : ', users)
            if (users){
             res.json(users)
            }
            else{
                res.json({
                 msg:'There is no users exists!',
                 success:"Failed"
             })
            }
         
        } catch (error) {
         console.log('Error Happened : ',error);
        }
     })
 
     /**
      * add new user (user Registrations!)
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     static async AddNewUser(req,res,next){
         let {userID,email,city,password,role,accessToken,loginStatus,status,remark,phoneNumber,fullName}=req.body
         console.log('password during registration : ' + password + "email : " + email );
         try {  
             await UserMsModel.CheckExists(email)
                 .then((data) => {
                     if(data){
                         res.json({
                             status:403,
                             msg:'these user exists ! please try onother email '
                         })
                     }
                     if(!data){
                         bcrypt.hash(password,10)
                         .then((hashPassword)=>{
                             password = hashPassword
                             let passwordChangedAt = dateTime
                             let authorizationDocument = req.body.authorizationDocument
                             // if(authorizationDocument.fileName === './')
                             console.log("Authorization Document : "+authorizationDocument ,"password  : "+ password);
                             if(authorizationDocument===null || authorizationDocument ===undefined){
                                 res.json({
                                     msg:"There is no autorization document attached ..."                                })
                             }
                             UserMsModel.AddNewUser(userID,email,city,password,role,accessToken,loginStatus,status,authorizationDocument,remark,phoneNumber,fullName,passwordChangedAt)
                             .then((users)=>{
                                 console.log('user addeded data : ' + users);
                                 if(users){
                                     const data = {
                                         text: ` you have registered successefully and wait for to actiave + contact +251990909900 `,
                                         subject: 'Success Registration Notification',
                                         html: 'you have registered successefully and wait for to actiavation. for more information contact +251990909900',
                                         to: email
                                     }
                                     SendMail(data, req, res, next)
                                         .then((datas) => {
                                             res.json({
                                                 msg:'u have registered successeffuly!'
                                             })
 
                                         }).catch(error=>{console.log('error to send registration notifications through email : ' + error)})
                                     
                                 }else{
                                     res.send('registration failed!')
                                     return
                                 }
                             })
                         }).catch(error=>{console.log("error during password hash : ",error)})
                         
                                               
                     }else{
                         res.json({
                             msg:"User email exists, try another address!",
                             success:false
                         })
                     }
                 }).catch(error=>{console.log("error during add new user : " + error)});          
            
         } catch (error) {
             console.log('error happend during new user registration : ',error);
         }
     }
 
     /**
      * Patch user informations
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     static async UpdateUser(req,res,next){
         //todo here somethings
         const userID = req.params.userID
         const authorizationDocument = req.body.authorizationDocument
         let email = req.body.email
         console.log('user ID :' + userID + 'ad : '+authorizationDocument);
         const data = {
             userID:userID,
             email:email,
             city:req.body.city,
             password:req.body.password,
             role:req.body.role,
             refreshToken:req.body.refreshToken,
             loginStatus:req.body.loginStatus,
             status:req.body.status,
             remark:req.body.remark,
             phoneNumber:req.body.phoneNumber,
             fullName:req.body.fullName,
             loginAt:req.body.loginAt,
             logoutAt:req.body.logoutAt,
             loginTryCount:req.body.loginTryCount,
             passwordChangedAt:req.body.passwordChangedAt,
         }
         
         try {
             await UserMsModel.CheckExists(data.email)
                 .then((user) => {
                     console.log('exists user email : ' + data.email);
                     if (data.status === 'active') {
                         if (data.status !== user[0].status) {
                             UserMsModel.updateData(data)
                                 .then((products, error) => {
                                     //send an email notifications for you are activated ...
                                     const mail = {
                                         text: ` your account active. have a full user access for more informstion contact an admin - contact address : +25190909090909 `,
                                         subject: 'Giving an access privillages on Online Drug store',
                                         html: 'your account active. have a full user access for more informstion contact an admin - contact address : +25190909090909',
                                         to: email
                                     }
                                     console.log('after mail success ' + mail.to);
 
                                     SendMail(mail, req, res, next)
                                         .then((datas) => {
                                             res.json({
                                                 msg:'updated successefully!'
                                             })
                                         }).catch(error => { console.log('error to send notifications through email : ' + error) })
 
                                 }).catch(error => { console.log('error happened during users updates : ' + error); })
 
                         } else {
                             UserMsModel.updateData(data)
                                 .then((updates) => {
                                      res.json({
                                         msg:'updated successefully!'
                                      })
                                 }).catch(err => { console.log('error during update data : ' + err); })
                         }
                     } else {
                         UserMsModel.updateData(data)
                             .then((updates) => {
                                 res.json({
                                     msg:'updated successefully!'
                                 })
                             }).catch(err => { console.log('error during update data : ' + err); })
                     }
                 })     
             
         } catch (error) {
             console.log('error occured during users in fo update : ' + error);
         }
 
     }
      
     /**
      * Delete Users
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     static async DeleteUser(req,res,next){
         const  userID = req.params.userID
         console.log('delete user iD : ' + userID);
         try {
             await UserMsModel.DeleteUser(userID)
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
 
     /**
      * all inactive users...
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     static async InactiveUsers(req,res,next){
         try {
             var users =await UserMsModel.GetAllInActiveUsers()
          //    console.log('user data : ', users)
             if (users){
              res.json(users)
             }
             else{
                 res.json({
                  msg:'There is no users exists!',
                  success:"Failed"
              })
             }
          
         } catch (error) {
          console.log('Error Happened : ',error);
         }
         
     }
 
      /**
      * all inactive users...
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
      static async ACtiveCustomers(req,res,next){
         try {
             var users =await UserMsModel.GetAllACtiveCustomers()
          //    console.log('user data : ', users)
             if (users){
              res.json(users)
             }
             else{
                 res.json({
                  msg:'There is no users exists!',
                  success:"Failed"
              })
             }
          
         } catch (error) {
          console.log('Error Happened : ',error);
         }   
     }
 
     /**
      * All pended users...
      * @param {*} req 
      * @param {*} res 
      * @param {*} next 
      */
     static async PendedUsers(req,res,next){
         try {
             var users =await UserMsModel.GetAllPendedUsers()
          //    console.log('user data : ', users)
             if (users){
              res.json(users)
             }
             else{
                 res.json({
                  msg:'There is no users exists!',
                  success:"Failed"
              })
             }
          
         } catch (error) {
          console.log('Error Happened : ',error);
         }
         
     }
     
     static async Login(req,res,next){
         const { email, password } = req.body
         const check = await JOISchema.validateAsync(req.body);
         if (!check) {
             res.json({
                 msg:'password or email is not meet a criterial + we sen a criteria through an email address!'
             })
         }
         try {
            
             await UserMsModel.CheckUser(email)
                 .then((user) => {
                     if (user) {
                         if(user[0].status ==='inactive'){
                             console.log('in active user trying to logegIN!');
                             res.json({
                                msg: 'you have to contact a system admin : you are inactive now!',
                                status:207
                             })
                         }
                         if(user[0].status ==='pending'){
                             console.log('your account is suspended ...');
                             res.json({
                                 msg:'you have to contact a system admin : you account has been  pended now!',
                             })
                         }
                         SignAccessToken(user[0].email, user[0].userID, user[0].role)
                             .then((accessToken) => {
                                 bcrypt.compare(password, user[0].password)
                                     .then((match) => {
                                         console.log('match chcek : ' + match);
                                         if (match) {
                                             SignRefreshToken(user[0].email, user[0].userID, user[0].role)
                                                 .then((refreshToken) => {
                                                     let data = {
                                                         userID: user[0].userID,
                                                         loginStatus: 'logedIn',
                                                         refreshToken: refreshToken,
                                                         loginAt : dateTime
                                                     }
                                                     UserMsModel.updateData(data)
                                                         .then((data, error) => {
                                                             if (error) {
                                                                 console.log('error updating user data ' + error);
                                                             }
                                                              res.json({
                                                                 accessToken: accessToken,
                                                                 refreshToken: refreshToken,
                                                                 msg:'successefully logedin'
                                                             })
 
                                                         }).catch(error => { console.log('error catched during token save' + error)})
                                                 }).catch(error => { console.log("Error happened during referesh Token : " + error)})
                                         } else {
                                             let loginTryCount = user[0].loginTryCount
                                             loginTryCount +=1 ;
                                             let data ={
                                                 userID:user[0].userID,
                                                 loginTryCount:loginTryCount
                                             }
                                             if(loginTryCount >=3){
                                                 let data ={
                                                     userID:user[0].userID,
                                                     status:'pending'
                                                 }
                                                 UserMsModel.updateData(data)
                                                 .then((datas)=>{
                                                     data = {
                                                         text: ` you have tried wrong password or email address many times.So , your count pended for now until verified your identitiy... please contact admin center - contact address - +251990909900 `,
                                                         subject: 'Account Pending ',
                                                         html: 'you have tried wrong password or email address many times.So , your count pended for now until verified your identitiy... please contact admin center - contact address - +251990909900',
                                                         to: user[0].email
                                                     }
                                                     SendMail(data, req, res, next)
                                                         .then((data) => {
                                                             res.send(data)
                                                             return
                                                         }).catch(error => { console.log('error to send registration notifications through email : ' + error) })
             
                                                 }).catch(err=>{console.log('error during user data updates : ' + err)})
                                             }
                                         }
                                     }).catch(error => { console.log("wrong done during password comparison " + error)})
                             }).catch(err => { console.log("access accessToken problem : " + err)})
 
                     } else {
                         res.send({
                             msg: "this user address does not exists!",
                             success: false
                         })
                     }
                 }).catch(error => {
                     console.log("Error happened during checking user existence : " + error)
                 })
         } catch (error) {
             console.log("error happened during login : " + error);
         }
     }
 
     static async RefreshAccessToken(req,res,next){
         try {
             const { refreshToken } = req.body
 
             // const check = await JOISchema.validateAsync(req.body);
             if(!refreshToken) throw createError.BadRequest()
             const payload = await VerifyRefreshToken(refreshToken)
             console.log('payload : ' + payload.email + " : "+ payload.userID + " : " + payload.role);
             const userID = payload.userID;
             const email = payload.email;
             const role = payload.role;
             SignAccessToken(email,userID,role)
             .then((accessToken)=>{
                 SignRefreshToken(email,userID,role)
                 .then((refreshToken)=>{
                     res.json({ accessToken :accessToken, refreshToken:refreshToken })
                 }).catch(err=>{console.log("error occured during sign refresh token : " + err)})
             }).catch(err=>{console.log("error occured during sign access token ! : " + err)})
             
         } catch (error) {
             console.log("error happened during login : " + error);
         }
     }
 
     static async Logout(req,res,next){
         try {
             const userID = req.params.userID
             
             let data = {
                 userID:userID,
                 loginStatus: 'logOut',
                 refreshToken: "",
                 logOutAt: new Date.now().toString()
             }
             UserMsModel.UpdateUser(data)
                 .then(() => {
                     res.send('success to delete refresh token and logedout ')
                 }).catch(error => {
                     console.log('error to update user after deleting referesh token : ' + error)
                 })
             
         } catch (error) {
             console.log('error occured during logout : ' + error);
         }
     } 
 
     static async ForgotPassword(req,res,next){
         let email  = req.body.email
         let accessToken  = crypto.randomBytes(32).toString('hex')
         try {
             await UserMsModel.CheckExists(email)
                  .then((user)=>{
                    let data ={
                        userID:user[0].userID,
                        accessToken:accessToken
                    }
                     if(user){
                         UserMsModel.updateData(data)
                         .then(()=>{
                            TokenModel.AddToken(email,accessToken)
                                .then((datas) => {
                                    let data = {
                                        text: ` password reset token 👍: ${accessToken}`,
                                        subject: 'reset rassword ',
                                        html: ` password reset token 👍: ${accessToken}`,
                                        to: email
                                    }
                                    SendMail(data, req, res, next)
                                        .then((dones) => {
                                            res.json({
                                                msg: 'your password reset token sent througy your emal :👍 ',
                                                code: 200
                                            })
                                        }).catch(error => { console.log('error during sending password reset token  : ' + error) })
                                }).catch(error => { console.log('error during adding password reset token to tokens model : ' + error) })
                         }).catch(err=>{console.log('error during update users access Token : ' + err);})
                    }
                    else{
                        res.json({
                            msg:'user email does not exists!'
                        })
                    }
                 }).catch(error=>{console.log('error log : ' + error);})
               
         } catch (error) {
             console.log('error occured during users in fo update : ' + error);
         }
     }

     static async ChangePasswordForPublic(req,res,next){
        const accessToken = req.body.accessToken
        const password  = req.body.password
        
        try {
            TokenModel.CheckTokenExists(accessToken)
            .then(()=>{
                UserMsModel.CheckExistsByToken(accessToken)
                .then((user)=>{
                    let hashedPassword = bcrypt.hashSync(password,10)
                    let data={
                        userID:user[0].userID,
                        password:hashedPassword
                    }
                    UserMsModel.updateData(data)
                    .then((done)=>{
                        TokenModel.DeleteToken(accessToken)
                        .then(()=>{
                            res.json({
                                msg:'password changed successefully!'
                            })
                        }).catch((err)=>console.log('error during password delete after password reset' +err))
                    }).catch(err=>{console.log('user data password reset failed error : ' + err);})
                }).catch(err=>{console.log('user check by token raised an error : ' + err);})
            }).catch(err=>{console.log('check token exits to reset password : ' + err);})
        } catch (error) {
            
        }
     }

    static async ChangePassword(req,res,next){
        let userID = req.body.userID
        let password = req.body.password
        let currentPassword = req.body.currentPassword
        let count =0
        try {
            await UserMsModel.CheckUserByID(userID)
                 .then((user)=>{
                    if(user){
                        bcrypt.compare(currentPassword,user[0].password)
                        .then((match)=>{
                            if(!match){
                                let loginTryCount = user[0].loginTryCount
                                loginTryCount +=1 ;
                                count = loginTryCount
                                let data ={
                                    userID:user[0].userID,
                                    loginTryCount:loginTryCount
                                }
                                if(loginTryCount >=3){
                                    let data ={
                                        userID:user[0].userID,
                                        status:'pending'
                                    }
                                    UserMsModel.updateData(data)
                                    .then((datas)=>{
                                        data = {
                                            text: ` you have tried wrong password or email address many times.So, your count pended for now until verified your identitiy... please contact admin center - contact address - +251990909900 `,
                                            subject: 'Account Pending ',
                                            html: 'you have tried wrong password or email address many times.So , your count pended for now until verified your identitiy... please contact admin center - contact address - +251990909900',
                                            to: user[0].email
                                        }
                                        SendMail(data, req, res, next)
                                            .then((data) => {
                                                res.json({
                                                    msg:'failed more than three times!',
                                                    count:count
                                                })
                                                return
                                            }).catch(error => { console.log('error to send registration notifications through email : ' + error) })

                                    }).catch(err=>{console.log('error during user data updates : ' + err)})
                                }
                                UserMsModel.updateData(data)
                                .then((updates)=>{
                                    res.json({
                                        msg: 'wrong username or password try again!',
                                        count: count
                                    })
                                })
                               
                                //update try count here
                            }else{
                                bcrypt.hash(password,10)
                                .then((hashedPassword)=>{
                                    let data ={
                                        userID:userID,
                                        password:hashedPassword
                                    }
                                    UserMsModel.updateData(data)
                                        .then((users, error) => {
                                            if (error) console.log('error during users update : ' + error)
                                            res.json({
                                                msg:"success",
                                                count: count,
                                            })
                                        }).catch(error => { console.log('error happened during users updates : ' + error); })

                                }).catch(err=>{console.log('error happened during pasword hash to update : ' + err);})
                            }
                        })
                    }

                 }) .catch(err=>{console.log('error happened during password change : ' + err);})    
            
        } catch (error) {
            console.log('error occured during users in fo update : ' + error);
        }
    }
}

module.exports = UserMsControllers