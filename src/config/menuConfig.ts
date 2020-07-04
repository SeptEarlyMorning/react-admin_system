export interface IMenu {
  title: string;
  key: string;
  icon: string;
  children?: Array<IMenu>;
}

export const menu: Array<IMenu> = [{
  title: '首页',
  key: 'home',
  icon: 'icon-shouye',
}, {
  title: '商品',
  key: 'products',
  icon: 'icon-shangpin',
  children: [{
    title: '品类管理',
    key: 'category',
    icon: 'icon-pinleiguanli',
  }, {
    title: '商品管理',
    key: 'product',
    icon: 'icon-shangpinguanli',
  },]
}, {
  title: '用户管理',
  key: 'user',
  icon: 'icon-yonghuguanli',
}, {
  title: '角色管理',
  key: 'role',
  icon: 'icon-jueseguanli',
}, {
  title: '图形图表',
  key: 'charts',
  icon: 'icon-tuxingtubiao',
  children: [{
    title: '柱状图',
    key: 'bar',
    icon: 'icon-zhuzhuangtu',
  }, {
    title: '折线图',
    key: 'line',
    icon: 'icon-zhexiantu',
  }, {
    title: '饼图',
    key: 'pie',
    icon: 'icon-bingtu',
  },]
}, {
  title: '订单管理',
  key: 'order',
  icon: 'icon-dingdanguanli',
},];