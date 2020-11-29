import React,{useEffect,useContext} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Header from './Header.js';
import Login from './Login.js';
import UserList from './UserList.js';
import newList from './NewList.js';
import AllList from './AllList.js';
import Detail from '../secureCoding/ProblemDetail.js';
import AuthContext from '../context/Auth.context.js';
import AddData from './AddData.js';
import NoAccess from '../NoAccess.js';
import notfound from '../NotFound.js'

export default function App({match}){
  const auth = useContext(AuthContext);
  useEffect (() => {
    if(JSON.parse(localStorage.getItem('token')) && !auth.aut)
    auth.onLogin()
    // console.log(auth.aut, auth.type)
  },[])

  return(
    <div>
    <Router>
    <Route path={`${match.path}`} component={Header}/>
    <Route exact path={`${match.path}`} component={Login}/>
    {/* 로그인했을때 로그인페이지 넘어감 */}
      <Route exact path={`${match.path}`}>
        {(auth.aut && auth.type==0) && <Redirect to={`${match.path}/users`}/>}
      </Route>
      <Route path={`${match.path}`}>
        {(auth.aut && auth.type!=0) && <Redirect to={'/noaccess'}/>}
      </Route>
    {/* <Route exact path={`${match.path}`} component={Login}/> */}
    
    {/* 로그인없이 들어갈 수 없는 화면 */}
    <Route path={`${match.path}/users`}>
        {(!auth.aut) && <Redirect to={'/admin'}/>}
      </Route>
      <Route path={`${match.path}/newProblems`}>
        {(!auth.aut) && <Redirect to={'/admin'}/>}
      </Route>
      <Route path={`${match.path}/problems`}>
        {(!auth.aut) && <Redirect to={'/admin'}/>}
      </Route>
      <Route path={`${match.path}/problem`}>
        {(!auth.aut) && <Redirect to={'/admin'}/>}
      </Route>
      <Route path={`${match.path}/addData`}>
        {(!auth.aut) && <Redirect to={'/admin'}/>}
      </Route>

    <Route path={`${match.path}/users`} component={UserList}/>
    <Route path={`${match.path}/newProblems`} component={newList}/>
    <Route path={`${match.path}/problems`} component={AllList}/>
    <Route path={`${match.path}/problem/:id`} component={Detail}/>
    <Route path={`${match.path}/addData`} component={AddData}/>
    <Route path='/noaccess' component={NoAccess}/>
    {/* <Route component={notfound}/> */}
    </Router>
    </div>
  )
}