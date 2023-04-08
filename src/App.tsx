import { useState,useEffect } from 'react'

import  {Routes,Route} from 'react-router-dom'
import { addProduct, getAllProducts, removeProduct, updateProduct } from './api/product'
import ProductPage from './page/ProductPage'
import ProductDetail from './page/ProductDetail'
import DashBroad from "./page/admin/product/DashBroad";
import AddProduct from "./page/admin/product/AddProduct";
import UpdateProduct from "./page/admin/product/UpdateProduct";
import "./App.css"
import Admin from './Layout/admin'
import SignUp from './page/admin/SignUp'
import SignIn from './page/admin/SignIn'
import { SignInUsers, SignUpUsser } from './api/users'
import ProductLayOut from './Layout/product'
import { addcategory, getAllcategory, removecategory, updatecategory } from './api/category'
import DashBroadCate from './page/admin/category/DashbroadCate'
import AddCategory from './page/admin/category/addCate'
import UpdateCategory from './page/admin/category/updatecate'


function App() {
const [products,setProduct] = useState([])
const [cate,setCate] = useState([])
const [users,setUsers] = useState([])
useEffect(() => {
  getAllProducts().then(({data})=>setProduct(data))
}, [])
useEffect(()=>{
 getAllcategory().then(({data})=>setCate(data))
},[])

const onHandleRemove = (id:number) =>{
  removeProduct(id).then(()=>setProduct(products.filter((item)=>item.id !== id)))
}
const onHandleRemoveCate = (id:number) =>{
  removecategory(id).then(()=>setProduct(products.filter((item)=>item.id !== id)))
}
const onHandleAdd = (product)=>{
  addProduct(product)
}
const onHandleAddCate = (category)=>{
  addcategory(category)
}
const onHandleUpdate = (product) =>{
  updateProduct(product).then(() => getAllProducts().then(({ data }) => setProduct(data)))
}
const onHandleUpdateCate = (category) =>{
  updatecategory(category).then(() => getAllcategory().then(({ data }) => setProduct(data)))
}
const onHandleAddUsers = (users)=>{
SignUpUsser(users)
}
const onHandleLoginUsers = (users)=>{
  SignInUsers(users)
  }
  return (
    <div className="App">
       <Routes>
          <Route path='/'>
              <Route index  element={<ProductPage products={products} />}/>
              <Route path='product' element={ProductLayOut()}>
                <Route path=':id' element={<ProductDetail products={products}/>}/>
              </Route>
              <Route path='admin'>
                  <Route index element={<SignIn users={users} OnUsers={onHandleLoginUsers}/>}/>
                  <Route path='signup' element={<SignUp users={users} OnUsers={onHandleAddUsers}/>}/>
                  <Route path='dashbroad' element={Admin()}>
                    <Route index  element={<DashBroad products={products} onRemove={onHandleRemove}/>}/>
                    <Route path='addproduct' element={<AddProduct products={products} onAdd={onHandleAdd}/>}/>
                    <Route path='updateproduct/:id' element={<UpdateProduct products={products} onUpdate={onHandleUpdate}/>}/>
                    <Route path='category' element={<DashBroadCate category={cate} onRemove={onHandleRemoveCate}/>}/>
                    <Route path='category/add'  element={<AddCategory category={cate} onAdd={onHandleAddCate}/>}/>
                    <Route path='category/update/:id' element={<UpdateCategory category={cate} onUpdate={onHandleUpdateCate}/>}/>
                  </Route>
              </Route>
             
          </Route>
       </Routes>
    </div>
  )
}

export default App
