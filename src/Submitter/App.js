import React,{useEffect,useState, useContext} from 'react';
import AuthProvider from '../components/AuthProvider.js';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Header from './Header.js';
import Login from './Login.js';
import Signup from './Signup.js';
import Submit from './Submit.js';
import List from './List.js';
import ProblemDetail from '../secureCoding/ProblemDetail.js';
import Modify from './Modify.js';
import AuthContext from '../context/Auth.context.js';
import notfound from '../NotFound.js';
import NoAccess from '../NoAccess.js';

export default function App({match}){
  // const [auth,setAuth]=React.useState(true);
  const auth = useContext(AuthContext);
  useEffect (() => {
    const url = `http://${process.IP}:10000/trainer/login`;
    console.log("url")
    // setAuth((JSON.parse(localStorage.getItem('token'))?JSON.parse(localStorage.getItem('token')):false));
    if(JSON.parse(localStorage.getItem('token')) && !auth.aut)
    auth.onLogin()
    // console.log(auth.aut, auth.type)

  },[auth])

  // const auth = () => {
  //   const token = JSON.parse(localStorage.getItem('token'))
  //   const url = `http://${process.IP}:10000/token/con`
  //   let type;
  //  var req = new XMLHttpRequest();
  //    req.open('GET',url, true);
  //    req.setRequestHeader('Authorization', `Bearer ${token}`);
  //    // req.setRequestHeader('Access-Control-Allow-Origin', '*');
  //    req.onreadystatechange = function (aEvt){
  //   if(req.readyState == 4){
  //    //  console.log("Status: ", req.status);
  //    //  console.log("Response message:", req.responseText);
  //    type = req.responseText;
  //    console.log(req.responseText)
  //    console.log(req)
  //    console.log(type)
  //    // const res = JSON.parse(req.responseText);
  //    // console.log(res);
  //   }
  //   else{
  //     console.log('error:',req)
  //   }
  // }
  //   req.send(null);

  // return type;
  // }

  // function PrivateRoute({ type, children, ...rest }) {
  //   // const type = await auth();
  //   // console.log(type);

  //   return (
  //     <Route
  //       {...rest}
  //       render={({ location }) =>
  //       auth.type== 2 ? (
  //           children
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname:`noaccess/`,
  //               state: {from: location}
  //             }}
  //             // {{
  //             //   pathname: "/submitter",
  //             //   state: { from: location }
  //             // }}
  //           />
  //         )
  //       }
  //     />
  //   );
  // }

  return(
    <AuthProvider>
    <Router>
      <Route path={`${match.path}`} component={Header}/>
      {/* 로그인했을때 로그인페이지 넘어감 */}
      <Route exact path={`${match.path}`}>
        {(auth.aut && auth.type==2) && <Redirect to={`${match.path}/list`}/>}
      </Route>
      {/* 로그인했는데, 출제자가 아닌경우 접근불가 */}
      <Route path={`${match.path}`}>
        {(auth.aut && auth.type!=2) && <Redirect to={'/noaccess'}/>}
      </Route>
    <Route exact path={`${match.path}`} component={Login}/>
    <Route path={`${match.path}/signup`} component={Signup}/>

      {/* <PrivateRoute path={`${match.path}/submit`}>
        <Submit/>
      </PrivateRoute>
      <PrivateRoute path={`${match.path}/list`}>
        <List/>
      </PrivateRoute>
      <PrivateRoute path={`${match.path}/detail/:id`}>
        <ProblemDetail/>
      </PrivateRoute>
      <PrivateRoute path={`${match.path}/modify/:id`}>
        <Modify/>
      </PrivateRoute> */}
      {/* 로그인필요 */}
      <Route path={`${match.path}/list`}>
        {(!auth.aut) && <Redirect to={'/submitter'}/>}
      </Route>
      <Route path={`${match.path}/submit`}>
        {(!auth.aut) && <Redirect to={'/submitter'}/>}
      </Route>
     
      {/* <Route path={`${match.path}/detail`}>
        {(!auth.aut) && <Redirect to={'/submitter'}/>}
    </Route>*/}
      {/* <Route path={`${match.path}/modify`}>
        {(!auth.aut) && <Redirect to={'/submitter'}/>}
      </Route> */}
    <Route path={`${match.path}/list`} component={List}/>
    <Route path={`${match.path}/submit`} component={Submit}/>
    <Route path={`${match.path}/detail/:id`} component={ProblemDetail}/>
    <Route path={`${match.path}/modify/:id`} component={Modify}/>
    <Route path='/noaccess' component={NoAccess}/>
    {/* <Route component={notfound}/> */}
    </Router>
    </AuthProvider>
  )
}