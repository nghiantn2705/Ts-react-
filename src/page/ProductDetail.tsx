import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, message, theme } from "antd";
import useStore from '../shared/hooks/use-store';
import { IProduct } from '../types/products';
import { getAllProducts, getProductsDetails } from '../api/product';
const { Header, Footer, Sider, Content } = Layout;

const ProductDetail = () => {
  const [product, setProduct] = useStore<IProduct[]>('products');

  useEffect(() => {
      getAllProducts().then((res) => {
          setProduct(res.data);
      }).catch((ex) => {
          message.error(ex?.message || 'Looix');
      })
  }, [])
    const {id} = useParams()
        const productDetail= product.find((item) => item._id == Number(id))
        console.log(productDetail)
        const {
          token: { colorBgContainer },
        } = theme.useToken();
  return (
    <div>
       <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
    
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <div className='d-flex'>
            <div className='border '><img src={productDetail?.image} style={{width:"500px"}} alt="" /></div>
            <div className=''>
              <div><h2 className='ms-5'>{productDetail?.name}</h2></div>
              <div><h3 className='me-4'>Giá: {productDetail?.price}đ</h3></div>
              <div className='me-4'>Mô Tả: <span>{productDetail?.description}</span></div>
            </div>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        
      </Footer>
    </Layout>
    </div>
  )
}

export default ProductDetail