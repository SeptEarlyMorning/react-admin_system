import * as React from 'react';

const header = require('./header.module.less')

interface IProps {

};

function Header(props: IProps) {
  return (
    <div className={header.header}>header</div>
  );
}

export default Header;