import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button, Form, Input } from 'antd';

import { ICategory } from '../../../types/category';
interface IProps {
  category: ICategory[];
  onUpdate: (category: ICategory) => void;
}
 
const UpdateCategory = (props:IProps) => {
  //     const navigate = useNavigate() //khởi tạo navigate dùng để chuyển trang
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setcategory] = useState<ICategory>();
  useEffect(() => {
    const categoryUpdate = props.category.find((category) => category._id == Number(id));
    setcategory(categoryUpdate);
    console.log(categoryUpdate);
  }, [props]);
  useEffect(() => {
    setFields();
  }, [category]);
  const [form] = Form.useForm()
  const setFields = () => {
    form.setFieldsValue({
      _id: category?._id,
      nameCategory: category?.nameCategory,
    });
  };

  const onFinish = (values: any) => {
    props.onUpdate(values);
    navigate("/admin/dashbroad/category");
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
        >
          <Input />
        </Form.Item>
        <Form.Item
                    label="Category Name"
                    name="nameCategory"
                    rules={[{ required: true, message: 'Please input your name!' }]}
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

export default UpdateCategory;
