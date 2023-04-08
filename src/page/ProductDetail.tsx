import React from 'react'
import { useParams } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Footer, Sider, Content } = Layout;

const ProductDetail = (props) => {
    const {id} = useParams()
        const productDetail= props.products.find((item) => item._id == id)
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