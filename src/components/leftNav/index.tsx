import React from 'react';
import logo from '../../assets/images/logo.png';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const leftNav = require('./leftNav.module.less');

interface IProps {

};

function LeftNav(props: IProps) {
  const location = useLocation();
  const { pathname } = location;
  let subKey: string;
  if (pathname === '/category' || pathname === '/product') {
    subKey = 'sub1';
  } else if (pathname === '/chart/bar' || pathname === '/chart/line' || pathname === '/chart/pie') {
    subKey = 'sub2';
  } else {
    subKey = ''
  }

  return (
    <div className={leftNav['left-nav']}>
      <header className={leftNav['left-nav-header']}>
        <img src={logo} alt='logo' />
      </header>
      <Menu
        selectedKeys={[pathname]}
        defaultOpenKeys={[subKey]}
        mode="inline"
        theme='light'
      // inlineCollapsed={this.state.collapsed}
      >
        <Menu.Item key='/home' icon={<PieChartOutlined />}>
          <Link to='/home'>
            首页
          </Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key='/category'>
            <Link to='/category'>
              品类管理
            </Link>
          </Menu.Item>
          <Menu.Item key='/product'>
            <Link to='/product'>
              商品管理
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='/user' icon={<DesktopOutlined />}>
          <Link to='/user'>
            用户管理
          </Link>
        </Menu.Item>
        <Menu.Item key='/role' icon={<ContainerOutlined />}>
          <Link to='/role'>
            角色管理
          </Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
          <Menu.Item key='/chart/bar'>
            <Link to='/chart/bar'>
              柱状图
            </Link>
          </Menu.Item>
          <Menu.Item key='/chart/line'>
            <Link to='/chart/line'>
              折线图
            </Link>
          </Menu.Item>
          <Menu.Item key='/chart/pie'>
            <Link to='/chart/pie'>
              饼图
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='/order'>
          <Link to='/order'>
            订单管理
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default LeftNav;