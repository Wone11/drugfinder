const mongoose   =  require('mongoose');

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGODB, { 
    dbName: process.env.DATABASENAME,
    useNewUrlParser:true,
    useUnifiedTopology:true
 })
    .then(() => {
        // console.log(".")
        console.log("MongoDB Server Connected successefully!")
    })
    .catch((err) => { console.log(err.message) });

//Connection Events Of Mongoose
mongoose.connection.on('connected',()=>{
    return
});

mongoose.connection.on('error',(err)=>{
   console.log(err.message); 
   return
});

mongoose.connection.on('disconnected',()=>{
    console.log('MongoDB Disconnected!')
    return
})

process.on('SIGINT',async ()=>{
    await mongoose.connection.close()
    process.exit(0);
})