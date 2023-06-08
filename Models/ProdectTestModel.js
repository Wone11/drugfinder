const Sequelize   = require('sequelize');
const db          = require('../Config/SequilizeDB');

const Products    = db.define('Productss', {
    productID: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    userID: { type: Sequelize.INTEGER },
    drugName: { type: Sequelize.STRING },
    image    :{type:Sequelize.BLOB},
    price: {type: Sequelize.DOUBLE },
    amount: {type: Sequelize.INTEGER },
    description: { type: Sequelize.STRING },
    location: { type: Sequelize.GEOMETRY }
},{  timestamps: true});

Products.sync({force:true}).then(() => {
  console.log('products model created successefully...');
});
module.exports = Products;