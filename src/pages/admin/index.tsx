import * as React from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect } from 'react-router-dom';

interface IProps {

};

function Admin(props: IProps) {
  const user: any = memoryUtils.user;

  // 如果内存没有存储 user ==> 当前没有登录
  if (!user || !user._id) {
    return <Redirect to='/login' />
  }
  return (
    <div>{user.username}</div>
  );
}

export default Admin;