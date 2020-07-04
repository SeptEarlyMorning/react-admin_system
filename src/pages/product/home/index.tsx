import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Input, Button, Card, Select, Table, Space, Tag, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqProductPaginationList, reqChangeProductStatus } from '../../../api';

interface IProps {

};

interface IProductPagination {
  status: number;
  imgs: string[];
  _id: string;
  name: string;
  desc: string;
  price: number;
  detail: string;
  pCategoryId: string;
  categoryId: string;
}

interface IPageInfo {
  pageNum: number;
  total: number;
  pages: number;
  pageSize: number;
  list: IProductPagination[];
}

const { Option } = Select;

function Home(props: IProps) {
  const [data, setData]: [IPageInfo | undefined, Dispatch<SetStateAction<IPageInfo | undefined>>] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const title = (
    <>
      <Select
        defaultValue='0'
        style={{
          width: '130px'
        }}
      >
        <Option value='0'>按名称搜索</Option>
        <Option value='1'>按描述搜索</Option>
      </Select>
      <Input placeholder='关键字' style={{ width: '150px', margin: '0 10px' }} />
      <Button type='primary'>搜索</Button>
    </>
  );
  const extra = <Button icon={<PlusOutlined />} type='primary'>添加商品</Button>

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Button size='small' type='link' style={{ padding: 0 }}>{text}</Button>,
    },
    {
      title: '描述',
      dataIndex: 'desc',
      key: 'desc',
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
      render: (text: number, record: IProductPagination) => (
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

  const getProductPaginationList = async (pageNum: number = 1) => {
    setIsLoading(true);
    const productPaginationList = await reqProductPaginationList(pageNum, 5);
    setIsLoading(false);
    if (productPaginationList.status === 0) {
      const data: IPageInfo = productPaginationList.data;
      setData(data);
    } else {
      message.error('获取商品列表失败');
    }
  };

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
  }, []);

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