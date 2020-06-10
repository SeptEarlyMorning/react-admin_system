/* 
包含应用中所有接口请求函数的模块
每个函数的返回值都是 promise
*/
import ajax from './ajax';
import jsonp from 'jsonp';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
// interface IReq {
//   ([a: string]: any): Promise<AxiosResponse>
// }
// const BASE:string = '';

// 登录
export const reqLogin = (username: string, password: string): Promise<AxiosResponse> => ajax('/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user: {}) => ajax('/manage/user/add', user, 'POST');

// 获取分类列表
export const reqCategoryList = (parentId: string = '0') => ajax('/manage/category/list', { parentId }, 'GET');

// 添加分类
export const reqCategoryAdd = (parentId: string, categoryName: string) => ajax('/manage/category/add', { parentId, categoryName }, 'POST');

// 修改分类名称
export const reqCategoryRename = (categoryId: string, categoryName: string) => ajax('/manage/category/update', { categoryId, categoryName }, 'POST');

// 查询位置信息
export const reqLocation = () => {
  return new Promise((resolve, reject) => {
    jsonp('https://restapi.amap.com/v3/ip?output=json&key=1eddb5b19aecdcc6bf048018f6bf00a3', (error, data) => {
      if (!error && data.status === '1') {
        const { adcode } = data;
        resolve({ adcode });
      } else {
        message.error('获取位置信息失败');
      }
    });
  });
};

// 查询当前天气信息
export const reqWeather = (adcode: string) => {
  return new Promise((resolve, reject) => {
    jsonp(`https://restapi.amap.com/v3/weather/weatherInfo?city=${adcode}&key=1eddb5b19aecdcc6bf048018f6bf00a3`, (error, data) => {
      if (!error && data.status === '1') {
        const { weather, temperature } = data.lives[0];
        resolve({ weather, temperature });
      } else {
        message.error('获取天气信息失败');
      }
    });
  });
};