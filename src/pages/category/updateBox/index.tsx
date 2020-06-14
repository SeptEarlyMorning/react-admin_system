import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { IDataSource } from '../interface';
import { reqCategoryRename } from '../../../api';

interface IProps {
  updateCategoty?: IDataSource;
  showBox: number;
  handleCancel: () => void;
  getCategoryList: () => void;
};

function UpdateBox(props: IProps) {
  const { updateCategoty, showBox, handleCancel, getCategoryList } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then(async vaule => {
      const result: any = await reqCategoryRename(updateCategoty?._id as string, vaule.categoryName);
      if (result.status === 0) {
        handleCancel();
        getCategoryList();
      } else {
        message.error(result.msg);
      }
    });
  };

  useEffect(() => {
    form && form.setFieldsValue({
      categoryName: updateCategoty?.name
    });
  }, [updateCategoty, form]);

  return (
    <Modal
      title='修改分类名称'
      visible={showBox === 2}
      okText='确认'
      cancelText='取消'
      onCancel={handleCancel}
      onOk={handleOk}
      getContainer={false}
    >
      <Form form={form}>
        <Form.Item
          name='categoryName'
          initialValue={updateCategoty?.name}
          rules={[{ required: true, whitespace: true, message: '请输入分类名称' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal >
  );
}

export default UpdateBox;