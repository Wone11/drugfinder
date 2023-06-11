import axios   from  'axios'

const Products = async() =>{
    const result = await axios.get('http://localhost:9020/api/products/v2/products/');
    return result.data;
}

console.log('products : ' + Products);
 export  default Products