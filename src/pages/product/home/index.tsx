import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Input, Button, Card, Select, Table, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqProductPaginationList, reqChangeProductStatus, reqFindProducts, IFindParameters } from '../../../api';
import { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { IPageInfo, IProductDetails } from '../interface';

interface IProps {
  findWay: string;
  setFindWay: Dispatch<SetStateAction<string>>;
  findContent: string;
  setFindContent: Dispatch<SetStateAction<string>>;
  isFind: number;
  setIsFind: Dispatch<SetStateAction<number>>;
  seteproductDetails: Dispatch<SetStateAction<IProductDetails | undefined>>;
};

const { Option } = Select;

function Home(props: IProps) {
  const [data, setData]: [IPageInfo | undefined, Dispatch<SetStateAction<IPageInfo | undefined>>] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { findWay, setFindWay, findContent, setFindContent, isFind, setIsFind, seteproductDetails } = props;

  const title = (
    <>
      <Button
        type='dashed'
        onClick={() => { setIsFind(0); }}
        disabled={!isFind}
        style={{ marginRight: 10 }}
      >
        返回全部
      </Button>
      <Select
        value={findWay}
        onChange={(val) => { setFindWay(val); }}
        style={{
          width: '130px'
        }}
      >
        <Option value='productName'>按名称搜索</Option>
        <Option value='productDesc'>按描述搜索</Option>
      </Select>
      <Input
        value={findContent}
        onChange={({ target }) => { setFindContent(target.value); }}
        placeholder='关键字'
        style={{ width: '150px', margin: '0 10px' }}
      />
      <Button
        type='primary'
        disabled={findContent === ''}
        onClick={() => { isFind > 10 ? setIsFind(1) : setIsFind(isFind + 1); }}
      >
        搜索
      </Button>
    </>
  );
  const extra = <Button icon={<PlusOutlined />} type='primary'>添加商品</Button>

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 125,
      render: (text: string, record: IProductDetails) => (
        <Link
          to={'/product/detail'}
          onClick={() => {
            seteproductDetails(record);
          }} >
          {text}
        </Link>
      )
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
      width: '35%',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => (
        `￥${text}`
      ),
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render: (text: number, record: IProductDetails) => (
        text === 1
          ? <>
            <span style={{ marginRight: 22 }}>在售</span>
            <Button size='small' type='dashed' danger onClick={() => { changeProductStatus(record._id, 2) }}>下架</Button>
          </>
          : <>
            <span style={{ marginRight: 8 }}>已下架</span>
            <Button size='small' type='primary' onClick={() => { changeProductStatus(record._id, 1) }}>上架</Button>
          </>
      ),
    },
    {
      title: '操作',
      key: 'operation',
      render: (text: string, record: any) => (
        <Space size="middle">
          <a>修改</a>
        </Space>
      ),
    },
  ];

  // 获取商品分页列表数据方法
  const getProductPaginationList = async (pageNum: number = 1) => {
    let productPaginationList: AxiosResponse<IPageInfo>;
    setIsLoading(true);
    if (isFind !== 0) {
      const findParameters: IFindParameters = { pageNum, pageSize: 5 };
      findWay === 'productDesc' ? findParameters.productDesc = findContent : findParameters.productName = findContent;
      productPaginationList = await reqFindProducts(findParameters);
    } else {
      productPaginationList = await reqProductPaginationList(pageNum, 5);
    }
    setIsLoading(false);
    if (productPaginationList.status === 0) {
      const data = productPaginationList.data;
      setData(data);
    } else {
      message.error('获取商品列表失败');
    }
  };

  // 商品上、下架处理方法
  const changeProductStatus = async (productId: string, status: number) => {
    const result = await reqChangeProductStatus(productId, status);
    getProductPaginationList(data?.pageNum);
    if (result.status === 0) {
      message.success(`商品${status === 1 ? '上架' : '下架'}成功！`);
    } else {
      message.success(`商品${status === 1 ? '上架' : '下架'}失败！`);
    }
  };

  useEffect(() => {
    getProductPaginationList();
  }, [isFind]);

  return (
    <Card
      title={title}
      extra={extra}
      bodyStyle={{
        padding: 0
      }}
    >
      <Table
        columns={columns}
        dataSource={data?.list}
        rowKey='_id'
        loading={isLoading}
        style={{
          margin: '1px 0 -1px'
        }}
        pagination={{
          total: data?.total,
          pageSize: data?.pageSize,
          current: data?.pageNum,
          onChange: (page) => {
            getProductPaginationList(page);
          }
        }}
      />
    </Card>
  );
}

export default Home;