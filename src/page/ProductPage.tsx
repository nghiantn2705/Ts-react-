import React, { useState, useEffect } from 'react';
import { Breadcrumb, Layout, Menu, message, theme } from 'antd';

import { IProduct } from '../types/products';
import { getAllProducts } from '../api/product';
import useStore from '../shared/hooks/use-store';

interface IProps {
}

const { Header, Footer, Content } = Layout;

const ProductPage = () => {
    const [products, setProducts] = useStore<IProduct[]>('product');

    useEffect(() => {
        getAllProducts().then((res) => {
            setProducts(res.data);
        }).catch((ex) => {
            message.error(ex?.message || 'Looix');
        })
    }, [])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="layout">
            <Header>
                <div className="logo"/>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}/>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
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
                                {products?.map((item) => {
                                    return (
                                        <div key={item._id} className="col-3 mb-4  text-center">
                                            <div className="card ">
                                                <div>
                                                    <img
                                                        src={item.image}
                                                        className="card-img-top"
                                                        style={{ width: '150px', height: '150px' }}
                                                        alt="Laptop"
                                                    />
                                                </div>
                                                <div className="card-body">
                                                    <div className="mb-3">
                                                        <h5><a href={`/product/${item._id}`}
                                                               className="mb-0 text-decoration-none text-secondary">{item.name}</a>
                                                        </h5>
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
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2023 Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default ProductPage;
