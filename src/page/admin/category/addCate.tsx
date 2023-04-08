import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { Button, Checkbox, Form, Input } from 'antd';

const AddCategory = (props) => {
    const navigate = useNavigate()
    const onFinish = (values: any) => {
        props.onAdd(values)
        navigate("/admin/dashbroad/category")
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
      
        <div>
             <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 1000 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
                  <Form.Item
                    label="Product Name"
                    name="nameCategory"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Add New Product
                    </Button>
                </Form.Item>
  </Form>
        </div>
    )
}

export default AddCategory