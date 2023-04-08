import axios from 'axios';
import instance from './instance';
import { ICategory } from '../types/category';

const getAllcategory = ()=>{
    return instance.get("/category");
}
const  removecategory = (id:number)=>{
    return instance.delete("/category/"+id)
}
const addcategory = (category:ICategory)=>{
    return instance.post("/category",category)
}
const updatecategory = (category:ICategory)=>{
    return instance.put("/category/"+category._id,category)
}

export {getAllcategory,removecategory,addcategory,updatecategory}