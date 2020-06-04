import * as React from 'react';

const header = require('./header.module.less')

interface IProps {

};

function Header(props: IProps) {

  return (
    <div className={header.header}>
      <div className={header['header-top']}>
        <a href="javascript:;">退出</a>
        <span>欢迎，{'admin'}</span>
      </div>
      <div className={header['header-bottom']}>
      </div>
    </div>
  );
}

export default Header;