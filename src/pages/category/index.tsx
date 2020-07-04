import React, { useEffect, useState } from 'react';
import { Card, Table, Button, message, Breadcrumb } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/lib/table';
import { reqCategoryList } from '../../api';
import AddBox from './addBox';
import UpdateBox from './updateBox';
import { IDataSource } from './interface';

interface IProps {

};

/* 分类管理页 */
function Category(props: IProps) {
  const FIRSTCLASS: IDataSource = { _id: '0', name: '一级分类列表' };
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [parentCategotyInfo, setparentCategotyInfo] = useState(FIRSTCLASS);
  const [showBox, setShowBox] = useState(0);
  const [allCategotys, setAllCategotys] = useState([FIRSTCLASS]);
  const [updateCategoty, setUpdateCategoty] = useState();

  const title = (
    <Breadcrumb>
      <Breadcrumb.Item>
        {
          parentCategotyInfo._id !== FIRSTCLASS._id
            ? <Button
              type='link'
              onClick={() => {
                showCategory(FIRSTCLASS._id, FIRSTCLASS.name)
              }}
            >
              {FIRSTCLASS.name}
            </Button>
            : <Button disabled type='link'>{FIRSTCLASS.name}</Button>
        }
      </Breadcrumb.Item>
      {
        parentCategotyInfo._id !== FIRSTCLASS._id
          ? <Breadcrumb.Item>{parentCategotyInfo.name}</Breadcrumb.Item>
          : null
      }
    </Breadcrumb>
  );
  const extra = (
    <Button
      type='primary'
      icon={<PlusOutlined />}
      onClick={() => { setShowBox(1); }}
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
    render: text => (
      <span>
        <Button
          style={{ padding: 0, marginRight: '18px' }}
          type='link'
          onClick={() => {
            setShowBox(2);
            setUpdateCategoty({ ...text });
          }}
        >
          修改分类名称
        </Button>
        {
          parentCategotyInfo._id === FIRSTCLASS._id
            ? <Button
              style={{ padding: 0 }}
              type='link'
              onClick={() => showCategory(text._id, text.name)}>
              查看子分类
                </Button>
            : null
        }
      </span>
    )
  },];

  const showCategory = (_id: string, name: string) => {
    setparentCategotyInfo({ _id, name });
  };

  const getCategoryList = async () => {
    setIsLoading(true);
    const categoryList = await reqCategoryList(parentCategotyInfo._id);
    setIsLoading(false);
    if (categoryList.status === 0) {
      setDataSource(categoryList.data);
      parentCategotyInfo._id === FIRSTCLASS._id && setAllCategotys([FIRSTCLASS, ...categoryList.data]);
    } else {
      message.error('获取分类列表失败');
    }
  };

  const handleCancel = () => {
    setShowBox(0);
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
      <AddBox
        getCategoryList={getCategoryList}
        parentCategotyInfo={parentCategotyInfo}
        allCategotys={allCategotys}
        showBox={showBox}
        handleCancel={handleCancel}
      />
      <UpdateBox
        getCategoryList={getCategoryList}
        updateCategoty={updateCategoty}
        showBox={showBox}
        handleCancel={handleCancel}
      />
    </Card>
  );
}

export default Category;