import * as React from 'react';
import memoryUtils from '../../utils/memoryUtils';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Layout } from 'antd';
import LeftNav from '../../components/leftNav';
import Header from '../../components/header';
import { router } from '../../router';

interface IProps extends RouteComponentProps<any> {

};

const { Footer, Sider, Content } = Layout;

function Admin(props: IProps) {
  const user: any = memoryUtils.user;
  const { pathname } = props.location;

  // 如果内存没有存储 user ==> 当前没有登录
  if (!user || !user._id) {
    return <Redirect to='/login' />
  }

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{
          backgroundColor: '#fff',
          borderRight: '1px solid #ccc'
        }}>
          <LeftNav />
        </Sider>
        <Layout>
          <Header
            userName={user.username}
            pathName={pathname}
          />
          <Content
            style={{
              overflow: 'initial',
              margin: '22px',
              marginBottom: 0,
              backgroundColor: '#fff',
              padding: '20px',
              minHeight: 'auto'
            }}
          >
            <Switch>
              {
                router.map(item => {
                  return (<Route
                    key={item.id}
                    path={item.path}
                    exact={item.exact}
                    render={props => item.render(props)}
                  />)
                })
              }
              <Redirect to='/home' />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', color: '#ccc' }}>推荐使用谷歌浏览器</Footer>
        </Layout>
      </Layout>
    </div >
  );
}

export default Admin;