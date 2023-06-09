const express            = require("express");
const router             = express.Router()

//User Controller import 
const UserController  = require('../Controllers/UserController')

//route to get all the users!
router.get("/", UserController.GetAllUser);

//forget password form rendering....
// router.get("/Forget-Password", UserController.ForgetPassword);

//register new user
router.post('/register',UserController.RegisterNewUser)

//Verify OTP ...
router.post('/verify',UserController.VerifyOtp)

//refresh-token
router.post('/refresh-token',UserController.RefreshToken)

//sign in 
router.post('/signIN',UserController.SigIN)

//forgot-password
router.patch('/forgot-password',UserController.ResetPassword)

//reset password 
router.patch('/reset-password',UserController.ResetPassword)

//email verifications...
router.get('/verify/:userID/:uniqueString',UserController.EmailVerification)

module.exports = router;