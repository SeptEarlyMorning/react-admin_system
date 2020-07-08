import React, { Dispatch, SetStateAction } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { IProductDetails } from '../interface';
import { Card, Breadcrumb } from 'antd';

interface IProps {
  productDetails: IProductDetails | undefined;
};

function Detail(props: IProps) {
  const { productDetails } = props;

  if (!productDetails) {
    return <Redirect to='/product' />
  }

  const title = (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to='/product'>
          商品列表
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>商品详情</Breadcrumb.Item>
    </Breadcrumb>
  );

  return (
    <Card
      title={title}
    >
      
    </Card>
  );
}

export default Detail;