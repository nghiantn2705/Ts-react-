import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { Button, Form, Input } from 'antd';
import { IProduct } from '../../types/products';
interface IProps {
  products: IProduct[];
  onUpdate: (product: IProduct) => void;
}
 
const UpdateProductPage = (props:IProps) => {
  //     const navigate = useNavigate() //khởi tạo navigate dùng để chuyển trang
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const productUpdate = props.products.find((product) => product._id == id);
    setProduct(productUpdate);
    console.log(productUpdate);
  }, [props]);
  useEffect(() => {
    setFields();
  }, [product]);
  const [form] = Form.useForm()
  const setFields = () => {
    form.setFieldsValue({
      _id: product?.id,
      name: product?.name,
      price: product?.price,
      description: product?.description,
      image:product?.image,
      categoryID:product?.categoryID,
    });
  };

  const onFinish = (values: any) => {
    props.onUpdate(values);
    navigate("/admin");
  };

  return (
 
    <div>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label=""
          name="_id"
          style={{ display: "none" }} // ẩn input này đi
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: 'Please input your price!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Image"
                    name="image"
                    rules={[{ required: true, message: 'Please input your image!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Product CategoryId"
                    name="categoryId.nameCategory"
                    rules={[{ required: true, message: 'Please input your categoryId!' }]}
                >
                    <Input />
                </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
