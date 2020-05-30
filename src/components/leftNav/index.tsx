import * as React from 'react';

const leftNav = require('./leftNav.module.less');

interface IProps {

};

function LeftNav(props: IProps) {
  return (
    <div className={leftNav['left-nav']}>leftNav</div>
  );
}

export default LeftNav;