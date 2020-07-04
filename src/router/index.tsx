import * as React from 'react';
import { Category, Charts, Home, Product, Role, User } from '../pages';

interface Router {
  id: number;
  path: string;
  exact: boolean;
  render(props: any): JSX.Element;
}

const { Bar, Line, Pie } = Charts;

const router: Array<Router> = [{
  id: 0,
  path: '/home',
  exact: true,
  render(props) {
    return (<Home {...props} />);
  }
}, {
  id: 1,
  path: '/category',
  exact: true,
  render(props) {
    return (<Category {...props} />)
  }
}, {
  id: 2,
  path: '/product',
  exact: false,
  render(props) {
    return (<Product {...props} />)
  }
}, {
  id: 3,
  path: '/role',
  exact: true,
  render(props) {
    return (<Role {...props} />)
  }
}, {
  id: 4,
  path: '/user',
  exact: true,
  render(props) {
    return (<User {...props} />)
  }
}, {
  id: 5,
  path: '/bar',
  exact: true,
  render(props) {
    return (<Bar {...props} />)
  }
}, {
  id: 6,
  path: '/line',
  exact: true,
  render(props) {
    return (<Line {...props} />)
  }
}, {
  id: 7,
  path: '/Pie',
  exact: true,
  render(props) {
    return (<Pie {...props} />)
  }
},];

export {
  router
};