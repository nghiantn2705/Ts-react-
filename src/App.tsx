import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import { addProduct, getAllProducts, DeleteProduct, updateProduct } from './api/product'
import ProductPage from './page/ProductPage'
import ProductDetail from './page/ProductDetail'
import DashBroad from './page/admin/product/DashBroad';
import AddProduct from './page/admin/product/AddProduct';
import UpdateProduct from './page/admin/product/UpdateProduct';
import './App.css'
import Admin from './Layout/admin'
import SignUp from './page/admin/SignUp'
import SignIn from './page/admin/SignIn'
import { SignInUsers, SignUpUsser } from './api/users'
import ProductLayOut from './Layout/product'
import { addcategory, getAllcategory, removecategory, updatecategory } from './api/category'
import DashBroadCate from './page/admin/category/DashbroadCate'
import AddCategory from './page/admin/category/addCate'
import UpdateCategory from './page/admin/category/updatecate'

import { IProduct } from './types/products';
import { ICategory } from './types/category';
import { IUser } from './types/user';
import { GlobalContextProvider } from './shared/contexts/GlobalContext';


function App() {
    const [products, setProduct] = useState<IProduct[]>([])
    const [cate, setCate] = useState<ICategory[]>([]);
    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {
        getAllcategory().then(({ data }) => setCate(data))
    }, [])

    const onHandleRemoveCate = (id: number) => {
        removecategory(id).then(() => setProduct(products.filter((item) => item.id !== id)))
    }
    const onHandleAdd = (product: IProduct) => {
        addProduct(product)
    }
    const onHandleAddCate = (category: ICategory) => {
        addcategory(category)
    }
    const onHandleUpdate = (product: IProduct) => {
        updateProduct(product).then(() => getAllProducts().then(({ data }) => setProduct(data)))
    }
    const onHandleUpdateCate = (category: ICategory) => {
        updatecategory(category).then(() => getAllcategory().then(({ data }) => setProduct(data)))
    }
    const onHandleAddUsers = (user: IUser) => {
        SignUpUsser(user)
    }
    const onHandleLoginUsers = (user: IUser) => {
        SignInUsers(user)
    }
    return (
        <GlobalContextProvider store={{}}>
            <Routes>
                <Route path="auth">
                    <Route path="login" element={<SignIn users={users} OnUsers={onHandleLoginUsers}/>}/>
                    <Route path="signup" element={<SignUp users={users} OnUsers={onHandleAddUsers}/>}/>
                </Route>
                <Route path="/">
                    <Route index element={<ProductPage/>}/>
                    <Route path="product" element={ProductLayOut()}>
                        <Route path=":id" element={<ProductDetail />}/>
                    </Route>
                    <Route path="admin">
                        <Route path="dashbroad" element={Admin()}>
                            <Route index element={<DashBroad />}/>
                            <Route path="addproduct" element={<AddProduct products={products} onAdd={onHandleAdd}/>}/>
                            <Route path="updateproduct/:id"
                                   element={<UpdateProduct products={products} onUpdate={onHandleUpdate}/>}/>
                            <Route path="category"
                                   element={<DashBroadCate category={cate} onRemove={onHandleRemoveCate}/>}/>
                            <Route path="category/add"
                                   element={<AddCategory category={cate} onAdd={onHandleAddCate}/>}/>
                            <Route path="category/update/:id"
                                   element={<UpdateCategory category={cate} onUpdate={onHandleUpdateCate}/>}/>
                        </Route>
                    </Route>

                </Route>
            </Routes>
        </GlobalContextProvider>
    )
}

export default App
