/* 发送异步 ajax 请求的函数模块
封装 axios 库
函数返回值是 promise 对象
1. 优化 1：统一处理请求异常？
    在外层包一个自己创建的 promise 对象
    在请求出错时，不 reject(error)，而是显示错误提示
2. 优化 2：异步得到的不是 response，而是 response.data
    在请求成功 resolve 时：resolve(response.data) */
import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';

interface IAjax {
  (url: string, data: Object, type: 'GET' | 'POST'): Promise<AxiosResponse>;
}

const ajax: IAjax = (url, data, type = 'GET') => {

  return new Promise((resolve, reject) => {
    let promise: Promise<AxiosResponse>;

    // 1. 执行异步 ajax 请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      });
    } else {
      promise = axios.post(url, data);
    }

    // 2. 如果成功了，调用 resolve(value)
    promise.then(response => {
      resolve(response.data);
    })

      // 3. 如果失败了，不调用 reject(reason)，而是提示异常信息
      .catch(error => {
        message.error('请求出错了', error.message);
      });
  });
};

export default ajax;