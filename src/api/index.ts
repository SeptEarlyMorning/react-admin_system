/* 
包含应用中所有接口请求函数的模块
每个函数的返回值都是 promise
*/
import ajax from './ajax';
import { AxiosResponse } from 'axios';

// interface IReq {
//   ([a: string]: any): Promise<AxiosResponse>
// }
// const BASE:string = '';

// 登录
export const reqLogin = (username: string, password: string): Promise<AxiosResponse> => ajax('/login', { username, password }, 'POST');

// 添加用户
export const reqAddUser = (user: {}) => ajax('/manage/user/add', user, 'POST');