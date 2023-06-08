const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
      userID:{type:Number},
      userName :{type:String},
      city:{type:String},
      email:{type:String,required:true,lowercase:true,unique:true},
      password:{type:String,required:true},
      token:{type:Boolean,default:false},
      status:{type:String,default:"inActive"},
      loginStatus:{type:Boolean,default:false}
},{timestamps:true});
// Compile model from schema
module.exports = mongoose.model('Users', UserSchema );