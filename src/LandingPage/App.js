import React, {useContext, useEffect} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NoAccess from '../NoAccess.js';
import LandingPage from './index.js';

export default function App({match}) {
  return (
      <Router>
        <Route path={`${match.path}`} component={LandingPage}/>
        <Route path='/noaccess' component={NoAccess}/>
      </Router>
  );
}
