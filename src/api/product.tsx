import axios from 'axios';
import instance from './instance';
import { IProduct } from '../types/products';
const getAllProducts = ()=>{
    return instance.get("/products");
}
const getProductsDetails = (id:number)=>{
    return  instance.get("/products"+id)
};
const removeProduct = (id:number)=>{
    return instance.delete("/products/"+id)
}
const addProduct = (product:IProduct)=>{
    return instance.post("/products",product)
}
const updateProduct = (product:IProduct)=>{
    return instance.put("/products/"+product._id,product)
}

export {getAllProducts,getProductsDetails,removeProduct,addProduct,updateProduct}