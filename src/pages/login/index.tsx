import * as React from 'react';
import logo from '../../assets/images/logo.png';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';

const login = require('./login.module.less');

interface IProps {
  // name: string;
}
interface Values {
  username: string;
  password: string;
}

function Login(props: IProps) {
  const [from] = Form.useForm();
  const onFinish = (values: Values | Store) => {
    console.log('Received values of form: ', values);
  };

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
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            className={login['login-input']}
            required
            rules={[{
              required: true,
              message: '请输入用户名!',
              whitespace: true
            }, {
              min: 6,
              message: '用户名最小6位数'
            }, {
              max: 12,
              message: '用户名最大12位数'
            }, {
              pattern: /^[a-zA-Z0-9_]+/,
              message: '用户名必须是英文、数字或下划线组成!'
            },]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
              placeholder="用户名"
            />
          </Form.Item>
          <Form.Item
            name="password"
            className={login['login-input']}
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
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
