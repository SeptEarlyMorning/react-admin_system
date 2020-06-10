import React, { useEffect, useState } from 'react';
import { Card, Table, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { reqCategoryList } from '../../api';

interface IProps {

};

/* 分类管理页 */
function Category(props: IProps) {
  const [dataSource, setDataSource] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [parentCategotyInfo, setparentCategotyInfo] = useState({ _id: '0', name: '一级分类列表' })
  let title = '一级分类列表';
  const extra = (
    <Button
      type='primary'
      icon={<PlusOutlined />}
      onClick={() => { addCategory() }}
    >
      添加
    </Button>
  );
  const columns: ColumnsType<Object> = [{
    width: 50
  }, {
    title: '分类名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '操作',
    width: 300,
    render: text => {
      return <span>
        <Button style={{ padding: 0, marginRight: '18px' }} type='link'>修改分类</Button>
        <Button style={{ padding: 0 }} type='link' onClick={() => showSubCategory(text._id, text.name)}>查看子分类</Button>
      </span>
    }
  },];

  const addCategory = async () => {
    const categoryList = await reqCategoryList();
  };

  const showSubCategory = (_id: string, name: string) => {
    setparentCategotyInfo({ _id, name });
    title = name;
  };

  const getCategoryList = async () => {
    setIsLoading(true);
    const categoryList = await reqCategoryList(parentCategotyInfo._id);
    setIsLoading(false);
    if (categoryList.status === 0) {
      setDataSource(categoryList.data);
    } else {
      message.error('获取分类列表失败');
    }
  };

  useEffect(() => {
    getCategoryList();
  }, [parentCategotyInfo]);

  return (
    <Card
      title={title}
      extra={extra}
      bodyStyle={{
        padding: '0'
      }}
    >
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5
        }}
        style={{
          margin: '1px 0 -1px'
        }}
        rowKey='_id'
        loading={isLoading}
      />
    </Card>
  );
}

export default Category;