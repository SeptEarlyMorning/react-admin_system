import React, { useState, Dispatch, SetStateAction } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './home';
import Detail from './detail';
import AddUpdate from './addUpdate';
import { IProductDetails } from './interface';

interface IProps {

};

/* 商品管理页 */
function Product(props: IProps) {
  const [productDetails, seteproductDetails]: [IProductDetails | undefined, Dispatch<SetStateAction<IProductDetails | undefined>>] = useState();
  const [findWay, setFindWay] = useState('productName');
  const [findContent, setFindContent] = useState('');
  const [isFind, setIsFind] = useState(0);

  return (
    <Switch>
      <Route path='/product' exact render={() => <Home
        findWay={findWay}
        setFindWay={setFindWay}
        findContent={findContent}
        setFindContent={setFindContent}
        isFind={isFind}
        setIsFind={setIsFind}
        seteproductDetails={seteproductDetails}
      />} />
      <Route path='/product/addupdate' exact render={() => <AddUpdate />} />
      <Route path='/product/detail' render={() => <Detail
        productDetails={productDetails}
      />} />
      <Redirect to='/product' />
    </Switch>
  );
}

export default Product;