import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import asyncComponent from './asyncComponent'
import LoginContainer from './login';
import SignUpContainer from './signup';
// import MainContainer from './main';
import withAuthentication from './authentication';

import Footer from './footer'
const MainContainer = asyncComponent(() => System.import('./main')
  .then(module => module.default), { name: 'Page 0' });



//TODO guard every child route instead of here
const App = () =>
  <div>
    <Route path="/app" component={withAuthentication(MainContainer)} />
    <Route exact path="/login" component={LoginContainer} />
    <Route exact path="/signup" component={SignUpContainer} />
    <Redirect to="/app" />
  <Footer/>
  </div>;

export default App;
