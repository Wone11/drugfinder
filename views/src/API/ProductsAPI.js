import axios   from  'axios'

export const Products = async() =>{
    const result = await axios.get('http://localhost:9020/api/products/v2/products/');
    return result.data;
}
