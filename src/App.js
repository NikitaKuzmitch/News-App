import React from 'react';
import Header from './components/moduls/Header';
import News from './components/pages/News';
import Archive from './components/pages/Arhive';
import Like from './components/pages/Like';
import NotFound from './components/pages/NotFound';

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
  <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={News} />
        <Route exact path='/archive' component={Archive} />
        <Route exact path='/like' component={Like} />
        <Route component={NotFound} />
      </Switch>
  </Router>
  );
}

export default App;
