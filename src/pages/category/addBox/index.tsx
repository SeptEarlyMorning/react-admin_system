import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { IDataSource } from '../interface';
import { reqCategoryAdd } from '../../../api';

interface IProps {
  parentCategotyInfo: IDataSource;
  allCategotys: Array<IDataSource>;
  showBox: number;
  handleCancel: () => void;
  getCategoryList: () => void;
};

const { Option } = Select;

function AddBox(props: IProps) {
  const { parentCategotyInfo, allCategotys, showBox, handleCancel, getCategoryList } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(async value => {
      const { parentId, categoryName } = value;
      const result: any = await reqCategoryAdd(parentId, categoryName);

      if (result.status === 0) {
        form.setFieldsValue({
          categoryName: ''
        });
        handleCancel();
        getCategoryList();
      } else {
        message.error(result.msg);
      }
    });
  };

  useEffect(() => {
    form && form.setFieldsValue({
      parentId: parentCategotyInfo._id
    });
  }, [parentCategotyInfo, form]);

  return (
    <Modal
      title='添加分类'
      visible={showBox === 1}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='取消'
      okText='确认'
      getContainer={false}
    >
      <Form form={form}>
        <Form.Item name='parentId' initialValue={parentCategotyInfo._id}>
          <Select>
            {
              allCategotys.map(item => {
                return <Option key={item._id} value={item._id}>{item.name}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name='categoryName' rules={[{ required: true, whitespace: true, message: '请输入分类名称' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal >
  );
}

export default AddBox;