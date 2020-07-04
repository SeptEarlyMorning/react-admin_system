import * as React from 'react';
import { Card, Input, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Detail from './detail';
import AddUpdate from './addUpdate';

interface IProps {

};

/* 商品管理页 */
function Product(props: IProps) {
  return (
    <Switch>
      <Route path='/product' exact component={Home} />
      <Route path='/product/addupdate' exact component={AddUpdate} />
      <Route path='/product/detail' component={Detail} />
      <Redirect to='/product' />
    </Switch>
  );
}

export default Product;