import React, {useContext, useEffect} from 'react';
import Header from './Header.js';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Main from './Main.js';
import Signup from './SignUp.js';
import SimpleSignin from './SimpleSignIn.js';
import AuthProvider from '../components/AuthProvider.js';
import AuthContext from '../context/Auth.context.js';
import SecureList from './SecureList.js';
import NonCertification from './NonCertification.js';
import Code from '../secureCoding/index1.js';
import SelectTraining from './SelectTraining.js';
import Profile from './Profile.js';
import EditProfile from './EditProfile.js';
import NoAccess from '../NoAccess.js';
import notfound from '../NotFound.js';
import CodeDiagnosis from './pages/CodeDiagnosis';

export default function App({match}) {
  const auth = useContext(AuthContext);
  useEffect (() => {
    if(JSON.parse(localStorage.getItem('token')) && !auth.aut)
    auth.onLogin()
    
  },[auth])
  
  return (
      <AuthProvider>
      <Router>

        <Route path={`${match.path}`} component={Header}/>
        {/* 로그인했을때 로그인페이지 넘어감 */}
        <Route exact path={`${match.path}`}>
          {(auth.aut && auth.type==1) && <Redirect to={`${match.path}/select`}/>}
        </Route>

        {/* 로그인했는데, 교육생이 아닌경우 접근불가 */}
        <Route path={`${match.path}`}>
          {(auth.aut && auth.type!=1) && <Redirect to={'/noaccess'}/>}
        </Route>
        
        <Route exact path={`${match.path}`} component={Main}/>
        
        <Route path={`${match.path}/signup`} component={Signup}/>
        {/* 로그인없이 들어갈 수 없는 화면 */}
        <Route path={`${match.path}/select`}>
          {(!auth.aut) && <Redirect to={'/student'}/>}
        </Route>
  
        <Route path={`${match.path}/securelist`}>
          {(!auth.aut) && <Redirect to={'/student'}/>}
        </Route>
      {/* <Route path={`${match.path}/problem/`}>
        {(!auth.aut) && <Redirect to={'/student'}/>}
      </Route> */}
        <Route path={`${match.path}/mypage`}>
          {(!auth.aut) && <Redirect to={'/student'}/>}
        </Route>
      <Route path={`${match.path}/edit`}>
        {(!auth.aut) && <Redirect to={'/student'}/>}
      </Route>


        {/* //! 추가할 부분 */}
        <Route path={`${match.path}/codediagnosis`} component={CodeDiagnosis}/>


        {/* {auth?  <Route exact path={`${match.path}`} component={SelectTraining}/> : <Route exact path={`${match.path}`} component={Main}/>} */}
      
        <Route path={`${match.path}/snslogin`} component={SimpleSignin}/>
        <Route path={`${match.path}/select`} component={SelectTraining}/>
        
        {/* <Route path={`${match.path}/securelist`} render={() => auth? <SecureList/> : <Redirect to= {`${match.path}/signup`}/> }/> */}
        <Route path={`${match.path}/securelist`} component={SecureList}/>
        <Route path={`${match.path}/problem/:id`} component={Code}/>
        {/* <Route path={`${match.path}/profile`} render={() => auth? <Profile/> : <Redirect to= {`${match.path}/signup`}/> }/> */}
        <Route path={`${match.path}/edit`} render={() => auth? <EditProfile/> : <Redirect to= {`${match.path}/signup`}/> }/>
        <Route path={`${match.path}/mypage`} component={Profile}/>
        <Route path='/noaccess' component={NoAccess}/>
      {/* <Route component={notfound}/> */}
      </Router>
    </AuthProvider>
  );
}
