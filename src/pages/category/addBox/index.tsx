import React, { useRef, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { IDataSource } from '../interface';

interface IProps {
  parentCategotyInfo: IDataSource;
  allCategotys: Array<IDataSource>;
  showBox: number;
  handleCancel: () => void;
};

const { Option } = Select;

function AddBox(props: IProps) {
  const { parentCategotyInfo, allCategotys, showBox, handleCancel } = props;
  const refContainer = useRef(null);
  const [form] = Form.useForm();
  const handleOk = () => {
    console.log(form.getFieldsValue());

  };
  useEffect(() => {
    // refContainer.current = parentCategotyInfo;
    console.log(refContainer);
  });

  return (
    <Modal
      title='添加分类'
      visible={showBox === 1}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='取消'
      okText='确认'
    >
      <Form ref={refContainer} form={form}>
        <Form.Item name='_id' initialValue={parentCategotyInfo._id}>
          <Select>
            {
              allCategotys.map(item => {
                return <Option key={item._id} value={item._id}>{item.name}</Option>
              })
            }
          </Select>
        </Form.Item>
        <Form.Item name='name'>
          <Input />
        </Form.Item>
      </Form>
    </Modal >
  );
}

export default AddBox;