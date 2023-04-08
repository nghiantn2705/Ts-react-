import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';


const SignIn = (props) => {
  const navigate = useNavigate()
  
  const onFinish = (values: any) => {
    
    props.OnUsers(values)
    const user = props.OnUsers(values)
    
    console.log(user)
 
    
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
return (
<div className='border bg-secondary bg-opacity-25 rounded' style={{ marginTop:"100px", width:"700px",marginLeft:"250px" }}>
     <Form
name="basic"
labelCol={{ span: 8 }}
wrapperCol={{ span: 16 }}
style={{ marginTop:"30px" }}
initialValues={{ remember: true }}
onFinish={onFinish}
onFinishFailed={onFinishFailed}
autoComplete="off"
>

<Form.Item
  label="Email"
  style={{ textAlign:'start'}}
  name="email"
  rules={[{ required: true, message: 'Please input your email!' }]}
>
  <Input style={{ width:"300px" }} />
</Form.Item>
<Form.Item
  label="Password"
  name="password"
  style={{ textAlign:'start'}}
  rules={[{ required: true, message: 'Please input your password!' }]}
>
  <Input.Password style={{ width:"300px" }}/>
</Form.Item>
<Form.Item  style={{ textAlign:'start'}} wrapperCol={{ offset: 8, span: 16 }}>
  <Button type="primary" htmlType="submit">
    Đăng Nhập
  </Button>
  <a href="/admin/signup"  style={{ marginLeft:"30px"}} type="primary">
    Đăng Ký ?
  </a>
</Form.Item>
</Form>
</div>
)
}

export default SignIn