import React, {useEffect, useContext} from 'react';
import './Login.css';
import Typography from '@material-ui/core/Typography';
import Description from './Description.js';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/Auth.context.js';
import {makeStyles} from '@material-ui/core/styles';
import { GoogleLogin } from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import kakao_png from '../images/kakao-png.png';
import { FormatSize } from '@material-ui/icons';

var process = require('../myProcess.json');

const useStyles = makeStyles((theme) => ({
  container1:{
      position:'relative',
      display:'flex',
      flexDirection:'row',
  },
  container2:{
      position:'relative',
      display:'flex',
      flexDirection:'row',
  },

}))

export default function Signin(){
  const classes = useStyles();
    const [values, setValues] = React.useState({
        email: '',
        password: '',
        type:1
    })
    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const {onLogin} = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault();
        if(values.email.length == 0 || values.password.password == 0){
            alert('내용을 입력해주세요!')
        }
        else{
        //id, token 받아옴
      const url = `http://${process.IP}:10000/users/login`;
      //로그인
      axios.post(url,
        {
        type:1,
        email: values.email,
        password: values.password
        }).then(
        response =>{
        //보관하기위해 토큰에 저장
        // console.log(response);
        
        if(response.headers.token){
          localStorage.setItem('token',JSON.stringify(response.headers.token));
          localStorage.setItem('uid',JSON.stringify(response.headers.userid));
          localStorage.setItem('type',"student");
          onLogin();

           //name이랑 email 저장
          const id = response.headers.userid;
          const url = `http://${process.IP}:10000/users/${id}`;

          var req = new XMLHttpRequest();
          req.open('GET',url, true);
          req.setRequestHeader('Authorization', `Bearer ${response.headers.token}`);
          req.onreadystatechange = function (aEvt){
         if(req.readyState == 4){
          //  console.log("Status: ", req.status);
          //  console.log("Response message:", req.responseText);
          // console.log(req.responseText)
          const res = JSON.parse(req.responseText);
          // console.log(res.name);
          // console.log(res.email);
          // console.log(res);
          localStorage.setItem('user',JSON.stringify([res.name,res.email]))
          window.location.reload();
         }
       }
       req.send(null);
        }
         })
        .catch(error => {
        // console.log(error);
          alert("틀렸습니다.")
          setValues({email:'', password:''});
        })
        }
    }

   //Google Login
   const responseGoogle=(res) => {

    const url = `http://${process.IP}:10000/users/login/oauth`;

      axios.post(url,
    {
        email: res.profileObj.email,
        type: 1,
        accessToken : res.accessToken
      })
      .then(
        response =>{
        //보관하기위해 토큰에 저장
        //console.log(response);
        
        if(response.headers.token){
          localStorage.setItem('token',JSON.stringify(response.headers.token));
          localStorage.setItem('uid',JSON.stringify(response.headers.userid));
          localStorage.setItem('type',"student");
           //name이랑 email 저장
          const id = response.headers.userid;
          const url = `http://${process.IP}:10000/users/${id}`;

          var req = new XMLHttpRequest();
          req.open('GET',url, true);
          req.setRequestHeader('Authorization', `Bearer ${response.headers.token}`);
          req.onreadystatechange = function (aEvt){
         if(req.readyState == 4){
          //  console.log("Status: ", req.status);
          //  console.log("Response message:", req.responseText);
          // console.log(req.responseText)
          const res = JSON.parse(req.responseText);
          //console.log(res.name);
          //console.log(res.email);
          // console.log(res);
          localStorage.setItem('user',JSON.stringify([res.name,res.email]))
          window.location.reload();
         }
       }
       req.send(null);
        }
         })
        .catch(error => {
        //console.log(error);
          alert("계정이 없습니다.")
          setValues({email:'', password:''});
        })
}

// Kakao Login
const responseKakao = (res) => {
    const url = `http://${process.IP}:10000/users/login/oauth`;
    axios.post(url,
  {
    email: res.profile.kakao_account.email,
    type: 1,
    accessToken : res.response.access_token
    })
    .then(
      response =>{
      //보관하기위해 토큰에 저장
      //console.log(response);
      
      if(response.headers.token){
        localStorage.setItem('token',JSON.stringify(response.headers.token));
        localStorage.setItem('uid',JSON.stringify(response.headers.userid));
        localStorage.setItem('type',"student");
         //name이랑 email 저장
        const id = response.headers.userid;
        const url = `http://${process.IP}:10000/users/${id}`;

        var req = new XMLHttpRequest();
        req.open('GET',url, true);
        req.setRequestHeader('Authorization', `Bearer ${response.headers.token}`);
        req.onreadystatechange = function (aEvt){
       if(req.readyState == 4){
        //  console.log("Status: ", req.status);
        //  console.log("Response message:", req.responseText);
        // console.log(req.responseText)
        const res = JSON.parse(req.responseText);
        //console.log(res.name);
        //console.log(res.email);
        // console.log(res);
        localStorage.setItem('user',JSON.stringify([res.name,res.email]))
        window.location.reload();
       }
     }
     req.send(null);
      }
       })
      .catch(error => {
      //console.log(error);
        alert("계정이 없습니다.")
        setValues({email:'', password:''});
      })
}


// Login Fail
const responseFail = (err) => {
    console.error(err);
}


return(
    <div>
    <div className="wrapper-login">
        <div className="text-wrapper">
            <div className="text-main">Secure <br/>Coding Lab</div>
            <Typography style={{color:'white'}} variant="h6" gutterBottom>
            안전한 소프트웨어를 만들기 위한 노력 시코랩 <br/> (주)오픈이지
             </Typography>
        </div>

        <div className="form-wrapper">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit} noValidate>
                <div className="email">
                    <label htmlFor="email">email</label>
                    <input
                        value={values.email}
                        placeholder="email"
                        type="text"
                        name="email"
                        noValidate
                        onChange={handleChange} />
                </div>
                <div className="password">
                    <label htmlFor="password">Password</label>
                    <input
                        value={values.password}
                        placeholder="Password"
                        type="password"
                        name="password"
                        noValidate
                        onChange={handleChange}
                    />
                </div>
                <div className="createAccount">
              <button type="submit" style={{cursor:'pointer'}}>
                  로그인
              </button>
                </div>
            </form>
              
              <button className="to_signup_button" onClick={()=> window.location.href="/student/signup"} style={{cursor:'pointer'}}> 
                <Link underline="none" color="inherit" component={RouterLink} to="/student/signup">
                  회원가입
                </Link> 
              </button>

              <Typography variant="button" display="block" style={{position:"relative",left:"70px",paddingTop:"10px",paddingBottom:"10px",fontWeight:'bold'}}>SNS계정으로 로그인하기</Typography>
              <div className={classes.container1}>
            <GoogleLogin
                    clientId="772422341432-u6s3t1r5h6o4497r3rf86ilr4278t9p5.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseFail}
                    className="google"
                />
                </div>
                <div style={{height:"20px"}}>&nbsp;</div>
                <div className={classes.container2}>
                <KaKaoLogin
                    jsKey="5ff2615807951d9ca9a859d3ba942ba1"
                    buttonText=""
                    onSuccess={responseKakao}
                    onFailure={responseFail}
                    getProfile={true}
                    className="kakao"
                ><img style={{position:"relative", top:"5px", right:"10px"}}width ="20px" height="20px" src={kakao_png} />Sign In with Kakao</KaKaoLogin>

            </div>
        </div>
    </div>
    <Description/> </div>
)
}