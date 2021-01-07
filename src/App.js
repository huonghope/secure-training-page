import React, { useLayoutEffect } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import AuthProvider from './components/AuthProvider.js';
import Student from './Student/App.js';
import Submitter from './Submitter/App.js';
import Admin from './Admin/App.js';
import notfound from './NotFound.js';
import NoAccess from './NoAccess.js';
import LandingPage from './LandingPage/App.js';

export default function App() {
  return (
      <AuthProvider>
      <Router>
        <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route path="/student" component={Student}></Route>
        <Route path="/submitter" component={Submitter}/>
        <Route path="/admin" component={Admin}/>
        <Route path='/noaccess' component={NoAccess}/>
        <Route component={notfound}/>
      </Switch>
      </Router>
    </AuthProvider>
  );
}
