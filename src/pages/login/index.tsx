import * as React from 'react';
import logo from '../../assets/images/logo.png';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import { reqLogin } from '../../api';
import { useHistory, Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';

const login = require('./login.module.less');

interface Values {
  username: string;
  password: string;
}

interface Result {
  status: number;
  msg?: string;
  data?: Object;
}

function Login() {
  const history = useHistory();
  // 如果用户已经登录，直接跳转到管理界面
  const user: any = memoryUtils.user;
  if (user && user._id) {
    return <Redirect to='/' />
  }
  const onFinish = async (values: Values | Store) => {
    const { username, password } = values;
    console.log('Received values of form: ', values);
    // try {
    const result: Result = await reqLogin(username, password);
    // const result = response.data; // { status: 0, data: user} { status: 1, msg: 'xxx' }
    if (result.status === 0) { // 登录成功
      message.success('登录成功');

      const user = result.data || {};
      memoryUtils.user = user;
      storageUtils.saveUser(user);
      history.replace('/');
      // 跳转到管理界面
      // this.props.history.replace('/');
    } else { // 登录失败
      // 提示错误信息
      message.error(result.msg);
    }
    // console.log('请求成功', response.data);
    // } catch (error) {
    //   console.log('错误', error);
    // }
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
            rules={[{ // 声明式验证
              required: true,
              message: '请输入用户名!',
              whitespace: true
            }, {
              min: 4,
              message: '用户名最小4位数'
            }, {
              max: 12,
              message: '用户名最大12位数'
            }, {
              pattern: /^[a-zA-Z0-9_]+/,
              message: '用户名必须是英文、数字或下划线组成'
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
            rules={[{
              required: true,
              message: '请输入密码!',
              whitespace: true
            }, {
              min: 4,
              message: '密码最小4位'
            }, {
              max: 12,
              message: '密码最大12位'
            }, {
              pattern: /^[a-zA-Z0-9_]+/,
              message: '密码必须由英文、数字或下划线组成'
            },]}
          >
            <Input.Password
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
