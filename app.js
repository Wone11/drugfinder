const express           = require('express');
const bodyParser        = require('body-parser');
const morgan            = require('morgan');
const responseTime      = require('response-time');
const cors              = require('cors');

// const createError       = require('http-errors')

//import local files and modules
const MYSQLDB               = require('./Config/db')
const { VerifyAccessToken } = require('./Common/JwtToken');

// const DB                = require('./Config/SequilizeDB')

//middleware imports
require('./Common/RedisConnection')



//main page routes      = -------------------------------------------------------
const app               = express()

//express apps-------------------------------------------------------------------
app.use(responseTime())

//Routes function
const ProductRoutes    = require('./Routes/ProductsRoutes')
const UsersMsRouters   = require('./Routes/UserMsRoutes')
const ProductsMsRoutes = require('./Routes/ProductsMsRoutes');
// const ProductTestRoute = require('./Routes/ProductTestRoutes')


//configure dot env
require('dotenv').config()

//application use morgan
app.use(morgan('dev'))

//Allow Cors which app allowed to access express server running on the Given Server!
app.use(cors({origin: 'http://localhost:2023'}));

//parsing middleware 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))

// parse various different custom JSON types as JSON
app.use(bodyParser.json())

//app use for static storage 
app.use('/Images', express.static('./upload/Documents'))

//connection to mysql database!
MYSQLDB

//express app here!
app.get('/',VerifyAccessToken,(req,res,next)=>{
    res.send('GC-2015 solution for drugfinder in Ethiopian!')
})

//middleware route
app.use('/api/products/v1',              ProductRoutes)
app.use('/api/users/v1',                 UsersMsRouters)
app.use('/api/products/v2',              ProductsMsRoutes)
// app.use('/api/products/v1/add-product' , ProductTestRoute)

//applications for server error and client handler 
app.use((req,res,next)=>{
    next(createError.NotFound('This route does not exists!'))
})

//server not found error
app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        status:err.status,
        msg:err.message
    })
})

//mongodb connection Here!


const PORT = process.env.PORT || 3020

app.listen(PORT,()=>{
    console.log(`Server starts on http://localhost:${PORT}/`)
    // UserMsControllers.AddNewUser()
})
