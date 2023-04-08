import React, { useState, useEffect } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { IProduct } from "../types/products";
interface IProps {
  products: IProduct[];
  onRemove: (id: number) => void;
}
const { Header, Footer, Sider, Content } = Layout;

const ProductPage = (props: IProps) => {
  const [product, setProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    setProduct(props.products);
  }, [props]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Product</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-content"
          style={{ background: colorBgContainer }}
        >
          <section>
            <div className="container py-5">
              <div className="row ">
                {product.map((item) => {
                  return (
                    <div className="col-3 mb-4  text-center">
                      <div className="card ">
                        <div>
                        <img
                          src={item.image}
                          className="card-img-top"
                          style={{ width: "150px", height: "150px" }}
                          alt="Laptop"
                        />
                        </div>
                        <div className="card-body">
                          <div className="mb-3">
                            <h5><a href={`/product/${item._id}`} className="mb-0 text-decoration-none text-secondary">{item.name}</a></h5>
                          </div>
                          <div>
                            <h6 className="text-dark mb-0 ">${item.price}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default ProductPage;
