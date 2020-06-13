import React, { Dispatch } from 'react';
import { Modal } from 'antd';

interface IProps {
  showBox: number;
  handleCancel: () => void;
};

function UpdateBox(props: IProps) {
  return (
    <Modal></Modal>
  );
}

export default UpdateBox;