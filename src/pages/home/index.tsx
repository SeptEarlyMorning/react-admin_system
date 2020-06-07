import * as React from 'react';

interface IProps {

};

/* 主页 */
function Home(props: IProps) {
  return (
    <div style={{
      fontSize: '36px',
      textAlign: 'center',
      marginTop: '150px'
    }}>
      欢迎使用后台管理系统
    </div>
  );
}

export default Home;