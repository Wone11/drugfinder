const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModel = new Schema({
      productName:{type:String},
      city:{type:String},
      price:{type:Number},
      details:{type:String},
      location:{
            type:{type:String},
            coordinate:[]
      },
      count:{type:Number,default:0}
},{timestamps:true});
// Compile model from schema
ProductModel.index({coordinate:"2dsphere"});
module.exports = mongoose.model('Products', ProductModel );