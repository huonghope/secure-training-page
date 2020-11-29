import React, {useContext} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import AuthContext from '../context/Auth.context.js';
import { GoogleLogin } from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import kakao_png from '../images/kakao-png.png';

var process = require('../myProcess.json');

const useStyles = makeStyles((theme) => ({
    paper:{
        marginTop:theme.spacing(10),
        display:'flex',
        flexDirection: 'column',
        alignItems:'center',
        border:'1px solid gray',
        padding:'20px',
        backgroundColor: '#DBE4EE',
        borderRadius:'10px',
        boxShadow: '0 7px 10px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)',
    },
    container:{
        padding: '10px',
    },
    container1:{
        width:'400px',
        display:'flex',
        flexDirection:'column',
    },
    constainer2:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    container3:{
        position:'relative',
        display:'flex',
        flexDirection:'row',
    },
    container4:{
        position:'relative',
        display:'flex',
        flexDirection:'row',
    },
    Btn:{
        display:'flex',
        float:'right',
        margin:'3px',
    },
}))

export default function Login(props){
    const classes = useStyles();

    const [values,setValues]=React.useState({
        email:'',
        password:'',
        type: 2,
    });

    const {onLogin} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = `http://${process.IP}:10000/trainer/login`;
        axios.post(url,
        //     {
        //     headers: {
        //         'Access-Control-Allow-Origin': '*'
        //       },
        // },
        {
            email: values.email,
            password: values.password,
            type:2
          },)
          .then(response =>{
            //   console.log(response)
            //   const data = JSON.parse(response.config.data)
            //   console.log(data)
            localStorage.setItem('token',JSON.stringify(response.headers.token));
            localStorage.setItem('uid',JSON.stringify(response.headers.userid));
            localStorage.setItem('type',"submitter");
            onLogin();
            window.location.href="/submitter/list";
          }
            ) 
            .catch(error => {
                console.log(error);
              alert("틀렸습니다.")
              setValues({email:'', password:''});
            })
    }
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleClick = (e) => {
        props.history.push({
            pathname:'/submitter/signup'
        })
    }

     //Google Login
     const responseGoogle=(res) => {
        const url = `http://${process.IP}:10000/trainer/login/oauth`;

          axios.post(url,
        {
            email: res.profileObj.email,
            type: 2,
            accessToken : res.accessToken
          })
          .then(response =>{
            //   const data = JSON.parse(response.config.data)
            //   //console.log(data)
            localStorage.setItem('token',JSON.stringify(response.headers.token));
            localStorage.setItem('uid',JSON.stringify(response.headers.userid));
            localStorage.setItem('type',"submitter");
            //이부분 수정?생각해보기 -> 출제자 회원임을 표시
            // localStorage.setItem('type',JSON.stringify('submitter'));
            window.location.href="/submitter/list";
          }
            ) 
            .catch(error => {
                //console.log(error);
              alert("계정이 없습니다.")
              setValues({email:'', password:''});
            })
    }

    // Kakao Login
    const responseKakao = (res) => {
        const url = `http://${process.IP}:10000/trainer/login/oauth`;
        axios.post(url,
      {
        email: res.profile.kakao_account.email,
        type: 2,
        accessToken : res.response.access_token
        })
        .then(response =>{
          //   const data = JSON.parse(response.config.data)
          //   //console.log(data)
          localStorage.setItem('token',JSON.stringify(response.headers.token));
          localStorage.setItem('uid',JSON.stringify(response.headers.userid));
          localStorage.setItem('type',"submitter");
          //이부분 수정?생각해보기 -> 출제자 회원임을 표시
          // localStorage.setItem('type',JSON.stringify('submitter'));
          window.location.href="/submitter/list";
        }
          ) 
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
        <Container component="main" maxWidth="xs" className={classes.paper}>
        <Typography variant="h5" gutterBottom>출제자</Typography>
        <Typography variant="h3" gutterBottom>LOGIN</Typography>
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.container1}>
                
                <TextField
                required
                variant="outlined"
                label="email address"
                fullWidth
                value={values.email}
                name="email"
                onChange={handleChange}
                style={{backgroundColor:'white', margin:'2px'}}
                />

                <TextField
                required
                type="password"
                variant="outlined"
                label="password"
                fullWidth
                value={values.password}
                name="password"
                onChange={handleChange}
                style={{backgroundColor:'white', margin:'2px'}}/>
                
                <div>
                <Button
                className={classes.Btn}
                type="submit"
                variant="contained"
                color="primary">
                    로그인
                </Button>
                <Button
                className={classes.Btn}
                variant="outlined"
                color="primary"
                style={{background:'white'}}
                onClick={handleClick}>
                회원가입
            </Button>
            </div>
            </form>
        </div>
        <div className={classes.container3}>
            <Typography variant="button" display="block" style={{fontWeight:'bold'}}>SNS계정으로 로그인하기</Typography>
        </div>
        <div className={classes.container4}>
            <GoogleLogin
                    clientId="772422341432-u6s3t1r5h6o4497r3rf86ilr4278t9p5.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    backgroundColor="#A31515"
                    onSuccess={responseGoogle}
                    onFailure={responseFail}
                    className="google_submitter"
                />
                </div>
                <div style={{height:"20px"}}>&nbsp;</div>
                <div className={classes.container3}>
                <KaKaoLogin
                    jsKey="5ff2615807951d9ca9a859d3ba942ba1"
                    buttonText=""
                    onSuccess={responseKakao}
                    onFailure={responseFail}
                    getProfile={true}
                    className="kakao_submitter"
                ><img style={{position:"relative", top:"5px", right:"10px"}}width ="20px" height="20px" src={kakao_png} />Sign In with Kakao</KaKaoLogin>
                </div>
        </Container>
    )
}