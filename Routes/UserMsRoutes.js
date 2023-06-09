const UserMsControllers                      =  require('../Controllers/UserMsControllers')
const {VerifyAccessToken,SignRefreshToken}   =  require('../Common/JwtToken')
const upload                                 =  require('../Config/MulterConfig')

const express              = require('express')
const router               = express.Router()



//get all users... 
router.get("/all-users",VerifyAccessToken,UserMsControllers.GetAllUsers)

//get in -active users!
router.get("/inactive-users",UserMsControllers.InactiveUsers)


router.get("/active-users",UserMsControllers.ACtiveCustomers)

//get all pending status users ...
router.get("/pended-users",UserMsControllers.PendedUsers)


//login user
router.post("/login",UserMsControllers.Login)

//forgot password to got token through an email
router.post("/forgot-password",UserMsControllers.ForgotPassword)

//change password and to chack authorized to change it.......
router.patch("/change-password",UserMsControllers.ChangePassword)

//change password for public sites ....
router.patch("/change-password-public",UserMsControllers.ChangePasswordForPublic)

//refresh token ................................................
router.post("/refreshToken",UserMsControllers.RefreshAccessToken)

//add new users to database
router.post('/add-new-user',upload.single('authorizationDocument'),UserMsControllers.AddNewUser)

//update users
router.patch('/update-users/:userID',UserMsControllers.UpdateUser)

//delete data
router.delete('/delete-users/:userID',UserMsControllers.DeleteUser)

//logout route
router.patch('/logout',UserMsControllers.Logout)

module.exports = router