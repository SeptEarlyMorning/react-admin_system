import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Admin} exact></Route>
        <Route path='/login' component={Login} exact></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
