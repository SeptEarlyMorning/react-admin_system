/* 
进行 local 数据存储管理的工具模块
*/
enum localKey {
  USER_KEY = 'user_key',
}

export default {
  // 保存 user
  saveUser(user: Object) {
    localStorage.setItem(localKey.USER_KEY, JSON.stringify(user));
  },
  // 读取 user
  getUser(): Object {
    return JSON.parse(localStorage.getItem(localKey.USER_KEY) || '{}');
  },
  // 删除 user
  removeUser() {
    localStorage.removeItem(localKey.USER_KEY);
  }
};