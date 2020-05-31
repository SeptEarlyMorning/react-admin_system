import * as React from 'react';
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
import { Link } from 'react-router-dom';

const leftNav = require('./leftNav.module.less');

interface IProps {

};

function LeftNav(props: IProps) {
  return (
    <div className={leftNav['left-nav']}>
      <header className={leftNav['left-nav-header']}>
        <img src={logo} alt='logo' />
      </header>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme='light'
      // inlineCollapsed={this.state.collapsed}
      >
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to='/home'>
            首页
          </Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key="2">
            <Link to='/category'>
              品类管理
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to='/product'>
              商品管理
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="4" icon={<DesktopOutlined />}>
          <Link to='/user'>
            用户管理
          </Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<ContainerOutlined />}>
          <Link to='/role'>
            角色管理
          </Link>
        </Menu.Item>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="图形图表">
          <Menu.Item key="6">
            <Link to='/chart/bar'>
              柱状图
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to='/chart/line'>
              折线图
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to='/chart/pie'>
              饼图
            </Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <Link to='/order'>
            订单管理
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default LeftNav;