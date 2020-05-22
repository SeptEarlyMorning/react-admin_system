import * as React from 'react';
import logo from '../../assets/images/logo.png';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const login = require('./login.module.less');

interface IProps {
  // name: string;
}

function Login(props: IProps) {
  console.log(login);

  return (
    <div className={login.login}>
      <header className={login['login-header']}>
        <img className={login.logo} src={logo} alt="logo" />
        <h1 className={login.title}>React 后台管理项目</h1>
      </header>
      <section className={login['login-content']}>
        <h1>用户登录</h1>
        <Form
          name="normal_login"
          className={login['login-form']}
          initialValues={{ remember: true }}
        // onFinish={onFinish}
        >
          <Form.Item
            name="username"
            className={login['login-input']}
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            className={login['login-input']}
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="密码"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={login['login-form-button']}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </section>
    </div>
  );
}

export default Login;
