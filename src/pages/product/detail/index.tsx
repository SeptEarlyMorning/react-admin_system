import React, { Dispatch, SetStateAction, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { IProductDetails } from '../interface';
import { Card, Breadcrumb, Descriptions, Modal, Input, Button } from 'antd';

const detailLess = require('./detail.module.less');

interface IProps {
  productDetails: IProductDetails | undefined;
};

function Detail(props: IProps) {
  const { productDetails } = props;
  const [isModify, setIsModify] = useState(false);

  if (!productDetails) {
    return <Redirect to='/product' />
  }

  const { name, desc, price, detail, imgs } = productDetails;
  console.log(productDetails);


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
      bodyStyle={{
        padding: '24px 50px'
      }}
    >
      <div className={detailLess['container']}>
        <label className={detailLess['label']} htmlFor='name'>商品名称：</label>
        <div className={detailLess['input-p-container']}>
          {
            isModify
              ? <input className={detailLess['input']} type="text" id='name' value={name} />
              : <p className={detailLess['p']}>{name}</p>
          }
        </div>
      </div>
      <div className={detailLess['container']}>
        <label className={detailLess['label']} htmlFor='desc'>商品描述：</label>
        <div className={detailLess['input-p-container']}>
          {
            isModify
              ? <input className={detailLess['input']} type="text" id='desc' value={desc} />
              : <p className={detailLess['p']}>{desc}</p>
          }
        </div>
      </div>
      <div className={detailLess['container']}>
        <label className={detailLess['label']} htmlFor='price'>商品价格：</label>
        <div className={detailLess['input-p-container']}>
          {
            isModify
              ? <input className={detailLess['input']} type="text" id='price' value={price} />
              : <p className={detailLess['p']}>{price}</p>
          }
        </div>
      </div>
      <div className={detailLess['container']}>
        <label className={detailLess['label']} htmlFor='detail'>所属分类：</label>
        <div className={detailLess['input-p-container']}>
          {
            isModify
              ? <input className={detailLess['input']} type="text" id='detail' value={detail} />
              : <p className={detailLess['p']}>{detail}</p>
          }
        </div>
      </div>
      <div className={detailLess['container']}>
        <label className={detailLess['label']} htmlFor='img'>商品图片：</label>
        <div className={detailLess['input-p-container']}>
          {
            isModify
              ? <input className={detailLess['input']} type="text" id='img' value={name} />
              : <p className={detailLess['p']}>{name}</p>
          }
        </div>
      </div>
      <Button onClick={() => { setIsModify(!isModify); }}>修改</Button>
      {/* <Descriptions>
        <Descriptions.Item label='商品名称' span={3}>{name}</Descriptions.Item>
        <Descriptions.Item label='商品描述' span={3}>{desc}</Descriptions.Item>
        <Descriptions.Item label='商品价格' span={3}>{price}</Descriptions.Item>
        <Descriptions.Item label='所属分类' span={3}>{detail}</Descriptions.Item>
        <Descriptions.Item label='商品图片' span={3}>
          {
            imgs.map((img, index) => (
              <>
                <img style={{ height: 100, borderRadius: 4 }} key={index} src={`http://localhost:5000/upload/${img}`} />

                <Modal
                  visible={false}
                  title={'previewTitle'}
                  footer={null}
                // onCancel={this.handleCancel}
                >
                </Modal>
              </>
            ))
          }
        </Descriptions.Item>
        <Descriptions.Item label='商品详情' span={3}>{name}</Descriptions.Item>
      </Descriptions> */}
    </Card>
  );
}

export default Detail;