/* 
进行 local 数据存储管理的工具模块
*/
export default {
  // 保存 user
  saveUser(user: Object) {
    localStorage.setItem('user_key', JSON.stringify(user));
  }
  // 读取 user

  // 删除 user
};