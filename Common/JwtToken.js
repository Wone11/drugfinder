const JWT           =  require('jsonwebtoken')
const createError   =  require('http-errors')

//import local modules
const client        =  require('./RedisConnection')

module .exports = {

    /**
     * Access Token!
     * @param {*} email 
     * @param {*} userID 
     * @param {*} role 
     * @returns 
     */
    SignAccessToken :async(email,userID,role)=>{
        return new Promise((resolve , reject)=>{
            const payload ={
                email: email,
                userID: userID,
                role:role
            }
            const secret =process.env.ACCESS_TOKEN_SECRET
            const options  = {
                expiresIn:'10m'
            }

            JWT.sign(payload,secret, options,(error,token)=>{
                if(error) reject(error)

                resolve(token)
            })
        })
    },

    /**
     * Verify access token!
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @returns 
     */
    VerifyAccessToken:(req,res,next)=>{
        if(!req.headers['authorization']) return createError.Unauthorized()

        const token = req.headers['authorization'].split(' ')[1]
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,payload)=>{
            if(error){
                if(error.name === "JsonWebTokenError")
                    return next(createError.Unauthorized('Token Error happened!' + error.message))
                if(error.name ==="TokenExpiredError")
                    return next(createError.Unauthorized('Token Expired. authenticted again!   + : ' + error.message + ' at : ' + error.expiredAt))
                return next(createError.Unauthorized())
               
                // const message = error.name==="TokenExpiredError" ? error.message : "Unauthorized"
                // return next(createError(message))
            }
            req.payload = payload
            next()
        })

    },

    /**
     * Refresh access token
     * @param {*} email 
     * @param {*} userID 
     * @param {*} role 
     * @returns 
     */
    SignRefreshToken:(email,userID,role)=>{
        return new Promise((resolve , reject)=>{
            const payload ={
                email: email,
                userID: userID,
                role:role
            }
            const secret =process.env.REFRESH_TOKEN_SECRET
            const options  = {
                expiresIn:'1y'
            }

            JWT.sign(payload,secret, options,(error,token)=>{
                if(error) reject(createError.InternalServerError())
               
                resolve(token)
                
                // client.connect()
                // SET_ASYNC('token', JSON.stringify(token), 'EX', 365 * 24 * 60 * 60, (err, reply) => {
                //     if (err) {
                //       console.log(err.message)
                //       reject(createError.InternalServerError())
                //       return
                //     }
                //     resolve(token)
                // }).catch(err=>{
                //     console.log('error happened during set data to redis server : ' + err.message)
                //     return
                // })
            })
        })
    },

    VerifyRefreshToken:(refreshToken)=>{
        return new Promise((resolve,reject)=>{
            JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,payload)=>{
                if(err)reject(createError.Unauthorized())

                const userID = payload.userID
                const email = payload.email
                const role = payload.role
                resolve({userID,email,role})
            })
        })
    }
} 