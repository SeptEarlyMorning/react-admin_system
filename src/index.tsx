import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import storageUtils from './utils/storageUtils';
import memoryUtils from './utils/memoryUtils';

// 读取 local 中保存 user，保存到内存中
const user: Object = storageUtils.getUser();
memoryUtils.user = user;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);