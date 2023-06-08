'use strict'
const bcrypt         = require('bcrypt')
const nodemailer     = require('nodemailer')
const {v4:uuidv4}    = require('uuid')
const optGenerator   = require('otp-generator')
const asyncHandller  = require('express-async-handler')

//import models 
const UserModel      = require('../Models/UserModel')
const TokenModel     = require('../Models/TokenModel')
const OTPModel       = require('../Models/OtpModel')

//controllers import body
const EmailController = require('../Common/EmailController')

//config environmental variable
require('dotenv').config()

//nodemailer stuff
let transporter  = nodemailer.createTransport({
    service:'Gmail',
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    verify: process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0",
    secure: false,
    // auth:{
    //     user:process.env.AUTH_EMAIL,
    //     pass:process.env.AUTH_PASSWORD
    // }
})

//testing success 
transporter.verify((error,success)=>{
    if(error){
        console.log("Error during email verification",error);
    }else{
        console.log('ready for message and email verified receive a message! sent');
}
})

/**
 * Custom Auth Plain
 * @param {*} ctx 
 */

async function EmailCustomAuth(){
    let cmd = await ctx.sendCommand(
        'AUTH PLAIN ' +
            Buffer.from(
                '\u0000' + process.env.AUTH_EMAIL + '\u0000' + process.env.AUTH_PASSWORD,
                'utf-8'
            ).toString('base64')
    );

    if(cmd.status < 200 || cmd.status >=300){
        throw new Error('Failed to authenticate user: ' + cmd.text);
    }
}
/**
 * Sending email verifications...
 * @param {*} result 
 * @param {*} res 
 */
const sendVerificationEmail=(_id,email,res)=>{
    const url ='http://localhost:9020';
    const uniqueString=uuidv4() + _id;

    //mailOptions
    const mailOptions={
        from:process.env.AUTH_EMAIL,
        port:process.env.SMTP_PORT,
        auth: {
            type: 'OAuth2',
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASSWORD,
            accessToken:process.env.KEY
        }, // user -> important
        to:email,
        subject:"Reset your password",
        html:`<p>reset your email before you gonna login.</p><p>and this link 
           <b>expires in six hours.</b> </p> <p> press <a href =${url + "user/verify/" + 
        _id + "/" + uniqueString } here </a> to proceed<p>{uniqueString}</P> </p>`  ,        
    }

    //hash the uniqueString        
    const saltRound = 10;
    bcrypt
    .hash(uniqueString,saltRound)
    .then((hashedUniqueString)=>{
        //set values in user verification collections!
        const newVerification = new TokenModel({
            userID:_id,
            uniqueString:hashedUniqueString,
            createdAt:Date.now(),
            expiredAt:Date.now() + 21600000
        })
        newVerification
        .save()
        .then(()=>{
            transporter.sendMail(mailOptions)
        })
        .catch((err)=>{
            console.log('Error Ocured during user Verification',err);
        })
    })
    .catch((err)=>{
        console.log("Error hapened during Hashing an email",err);           
    })
}

//Export all the Controllers functions
module.exports={

    /**
     * Retrieve all the Users Details
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    GetAllUser:asyncHandller(async (req, res, next)=> {
        try {
            const Data = await UserModel.find({}, { __v: 0 })
            // res.redirect('http://localhost:9020/USER_API/signIN')
            if (Data) {
                res.json({
                    status: "SUCCESS",
                    data: Data
                })
            } 
            // else { return res.status(404).send('No User in the database') }

        } catch (error) {
            return res.send(error)
        }
    }),

    /**
     * Verify OTP...
     * @param {*} req 
     * @param {*} res 
     */
    VerifyOtp: async (req, res) => {
        console.log("Verify : ", req.body);
    },

    /**
     * New User Register Controllers
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    RegisterNewUser: async(req, res, next) => {
        let { name, email, password } = req.body;
        try {
            if (name === ""||email=== ""||password==="") {
                res.json({
                    statusCode: '203',
                    status: "Failed",
                    message: "Empy input data"
                })
            }
            else {
                await UserModel
                .find({ email })
                .then(result => {
                    if (result.length > 0) {
                       res.send('Email exists before !. please reset password and use agian.')
                    } else {
                       
                        const OTP = optGenerator.generate(6,{
                            digits:true, upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false
                        })//Generate otp 

                        const otp = new OTPModel({email:email,otp:OTP})
                        //generate salt password
                        const saltRound = 10
                        bcrypt.hash(password, saltRound).then(hashedPassword => {
                            const User = new UserModel({
                                name,
                                email,
                                password: hashedPassword,
                                verfied: false
                            })
                            User
                            .save()
                            .then((result) => {
                                const _id = result._id.toString()
                                email=result.email;
                               // sendVerificationEmail(_id,email, res) //verification email params pass to function
                                otp
                                .save()
                                .then((data)=>{
                                    //saved data
                                    console.log("Saved OTP : ",data)
                                    const params  = new URLSearchParams();
                                    const phoneNumber ='251996786667'
                                    params.append('token : ',email);
                                    params.append('to',`${phoneNumber}`);
                                    params.append('message', `Verification Code ${data.otp}`)
                                })
                                .catch(error=>{
                                    console.log("Error Happened during saving Otp",error)
                                })
                                res.send(result)
                            })

                        }).catch(err => {
                            res.json({
                                status: "FAILED",
                                message: "Error Happened during password Hashing",
                                Error: err
                            })
                        })
                    }

                }).catch(err => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "Error happened during findin' the existing user!",
                        Error: err
                    })
                })

            }
        } catch (error) {
            res.json({
                Error: error
            })
        }
    },

    /**
     * Refresh Token Here!
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    RefreshToken:async(req,res,next)=>{
        const {...data}  = req.body
        console.log("Refresh Body :" ,data);

    },

    /**
     * Forget password
     * @param {*} req 
     * @param {*} res 
     * @param {*} nex 
     */
    ForgetPassword: async (req, res, nex) => {
        const {email} = req.body;
        await UserModel
              .find({email})
              .then((result)=>{
                sendVerificationEmail(result,res)
                // res.redirect('http://localhost:2090/UserAPI/forgot-password')
              })
              .catch((error)=>{
                console.log("Error happened during password forget : ",error);
                res.json({
                    status:"FAILED",
                    message:"forget password find user email process failed",
                    Error:error
                })
              })
        res.render('View/forget-password')
    },

    /**
     * SignIN Users
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    SigIN: async (req, res, next) => {
        let { email, password } = req.body;
        if (email === "") {
            res.json({
                status: "FAILED",
                message: "Email input is empty"
            })
        }
        else if (password === "") {
            res.json({
                status: "FAILED",
                message: "Password input is empty"
            })
        } else {
            await UserModel.find({ email }).then(data => {
                if (data) {
                    if(!data[0].verfied){
                        res.json({
                            statusCode:207,
                            status:"FAILED",
                            message:"user has not been verified yet. please check your inbox to verify!"
                        })
                    }else{
                         //decrypt password and match it
                    const hashedPassword = data[0].password
                    bcrypt.compare(password, hashedPassword).then(result => {
                        console.log(result);
                        if (result) {
                            res.json({
                                status: "Success",
                                message: "You signIN successefully!",
                                data: result
                            })
                        } else {
                            res.json({
                                status: "FAILED",
                                statusCode: "203",
                                message: "password doen't match or correct"
                            })
                        }
                    })
                    }
                }
            })
        }
    },

    /**
     * Reset Password
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    ResetPassword: async(req, res, next) => {
        let {email,newPassword,confirmNewPassword} = req.body;

        if(newPassword!==confirmNewPassword){
            res.json({
                status:"FAILED",
                message:"Password doesn't match!"
            })
            return
        }
        await UserModel
        .find({email})
        .then((result)=>{
            if(result){
                bcrypt
                .compare(newPassword,result[0].password)
                .then((valid)=>{
                    if(!valid){
                        const saltRound=10
                        bcrypt
                        .hash(newPassword,saltRound)
                        .then((hashedPassword)=>{
                            UserModel
                            .updateOne({email:email},{password:hashedPassword})
                            .then((data)=>{
                                console.log("Hashed Password new  : ",hashedPassword);
                                res.json({
                                    status:"SUCCESS",
                                    message:"Password updated successefully!",
                                    data:data
                                })
                            })
                            .catch((error)=>{
                                console.log("Error Hapenned during password updating",error);
                                res.json({
                                    status:"FAILED",
                                    message:"Error occured during password updating",
                                    Error:error
                                })
                            })

                        }).catch((error)=>{
                            console.log("Error Happened during password update hashing ",error);
                            res.json({
                                status: "FAILED",
                                message:"Error happened during hashe a new password to update",
                                Error:error

                            })
                        })
                    }else{
                        res.json({
                            status:"FAILED",
                            message:"password is the same with the previous one!. please, enter different password "
                        })
                    }
                })
                .catch((error)=>{
                    console.log("Error Happened when Password Reset: ",error);
                    res.json({
                        status: "FAILED",
                        message:"Error occured when comparing password with hash",
                        Error:error

                    })                    
                })
            }

        })
        .catch((error)=>{
            console.log("Error Happened when Password Reset findin' an email : ",error);
            res.json({
            status:"FAILED",
            message:"Password uptading failed when finding by the email!",
            Error:error
            })            
        })
        
    },


    /**
     * Email Verifications!!
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    EmailVerification:async(req,res,next)=>{
        let {userID,uniqueString} = req.body
        await TokenModel.find({userID})
              .then(result=>{
                if(result.length>0){
                    //user verification exists so we can proceeds
                    const {expiredAt} = result[0].expiredAt;
                    const handleUniqueString = result[0].uniqueString;
                    //checking for expired or not.
                    if(expiredAt < Date.now){
                        //delete an expired verification
                        TokenModel
                        .deleteOne({userID})
                        .then(result=>{
                            UserModel.deleteOne({userID}) //here we have to checking 
                            .then(()=>{
                                let message ="Link has expired. please, sign up agin!"
                                res.redirect(`/user/verified/error=true&message=${message}`)
                            })
                            .catch(error=>{
                                res.json({
                                    status:"FAILED",
                                    message:"user data catch error deleting for expired link.",
                                    Error:error
                                })
                            })
                        })
                        .catch(error=>{
                            console.log("Error occured during Expired verification deletion",error);
                            res.json({
                                status:"FAILED",
                                message:"Error happened when deleting expired verification!",
                                Error:error
                            })
                        })
                    }else{
                        //handle verifications here...
                        //first compare hashed unique String 
                        bcrypt
                        .compare(uniqueString,handleUniqueString)
                        .then((result)=>{
                            if(result){
                                // when the string matches
                                UserModel
                                .updateOne({_id:userID},{verfied:true})
                                .then(()=>{
                                    TokenModel
                                    .deleteOne({userID})
                                    .then(()=>{
                                        res.sendFile(path.join(__dirname,'../View/Forgot-Password.ejs'));
                                    })
                                    .catch((error)=>{
                                        console.log("Error Happened during deleting verification : ",error);
                                        let message ="Error occured when deleting verification"
                                        res.redirect(`/user/verified/error=true&message=${message}`)
                                    })
                                })
                                .catch((error)=>{
                                    console.log("Error Happened during updating verifications : ",error);
                                    let message ="Error occured when updating user verification"
                                    res.redirect(`/user/verified/error=true&message=${message}`)
                                })
                            }else{
                                // when it is different from hashed string
                                let message ="string does not match"
                                res.redirect(`/user/verified/error=true&message=${message}`)
                            }
                        })
                        .catch((error)=>{
                            console.log("Compared unique string Error Happened : ",error);
                            let message ="Error happened when comparing unique string"
                            res.redirect(`/user/verified/error=true&message=${message}`)
                        })
                    }

                }else{
                    //there is no verification found for this email
                   let message ="Account record doen't exist or has ben verified before.please, sign-up or login "
                   res.redirect(`/user/verified/error=true&message=${message}`)
                }
              })
              .catch((error)=>{
                console.log("Email Verifications Error happened : ", error);
                res.json({
                    status:"FAILED",
                    message: "Email verification failed when findin' Verification id",
                    Error:error
                })
              })
    }
}