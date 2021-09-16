
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import New from './pages/New';

function Routes(){
  return(
    <BrowserRouter>
      <Route path='/' exact component={Login} />
      <Route path='/home/' component={Home} />
      <Route path='/new/' component={New} />
    </BrowserRouter>
  );
}

export default Routes;