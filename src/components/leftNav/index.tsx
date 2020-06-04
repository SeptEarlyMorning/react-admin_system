import React from 'react';
import logo from '../../assets/images/logo.png';
import { Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, useLocation } from 'react-router-dom';
import { createFromIconfontCN } from '@ant-design/icons';
import { IMenu, menu } from '../../config/menuConfig';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1856679_wqu75l1dco.js',
});

const leftNav = require('./leftNav.module.less');

interface IProps {

};

function LeftNav(props: IProps) {
  const location = useLocation();
  const { pathname } = location;
  let subKey = '';

  const getMenuNodes = (menuList: Array<IMenu>) => {
    return menuList.map(item => {
      if (item.children && item.children.length > 0) {
        item.children.find(value => value.key === pathname) && (subKey = item.key);
        return (
          <SubMenu key={item.key} icon={<IconFont type={item.icon} />} title={item.title}>
            {getMenuNodes(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.key} icon={<IconFont type={item.icon} />}>
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        );
      }
    });
  };

  const menuNodes = getMenuNodes(menu);

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
      >
        {
          menuNodes
        }
      </Menu>
    </div>
  );
}

export default LeftNav;