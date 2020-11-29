import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import KakaoLogin from 'react-kakao-login';
import kakao_png from '../images/kakao-png.png';

var process = require('../myProcess.json');

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
      },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function Signup(props) {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        name: ''
    })

    const [error, setError] = React.useState({
        emailError: '',
        pwdError: '',
        nameError: ''
      })
      
    const isEmail = email => {
        const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      
        return emailRegex.test(email);
      };
      const isPwd = pass => {
        const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
        
        return pwdRegex.test(pass);
       }
    
      const onTextValidation = () => {
        let emailError = "";
        let pwdError = "";
        let nameError = "";
    
        if(!isEmail(values.email))emailError = "email 형식이 아닙니다.";
        if(!isPwd(values.password))pwdError = "비밀번호는 최소 6자에서 20자사이, 영문과 숫자를 혼합하여 주세요."
        if(values.name.length === 0)nameError="이름을 입력해주세요.";
    
        setError({
          emailError, pwdError, nameError
        })
    
        if(emailError || pwdError || nameError)return false;
        return true;
      }
    
      const handleChangeForm = e => {
        setValues({...values, [e.target.name]: e.target.value});
      }
    
      const handleSubmit=(e)=>{
        e.preventDefault();
        const valid = onTextValidation();
    
        if(!valid)console.error("invalid");
    
        else{
          const url = `http://${process.IP}:10000/users/signup`;
          axios.post(url, {
            name: values.name,
            email: values.email,
            password: values.password,
          })
          .then(response =>{
            //console.log(response);
            alert("가입이 완료 되었습니다.")
            props.history.push({
              pathname: '/student'
            });
          }
            ) 
            .catch(error => {
                //console.log(error);
              alert("이미 존재하는 회원입니다.")
              setValues({email:'', password:'', name:''});
            })
        }
      }
//Google Login
const responseGoogle=(res) => {
  ////console.log(res)

  const url = `http://${process.IP}:10000/users/signup/oauth`;
  axios.post(url,{
      name: res.Pt.Cd,
      email: res.profileObj.email,
    })
    .then(response =>{
      ////console.log(response);
      alert("가입이 완료 되었습니다.")
      props.history.push({
        pathname: '/student'
      });
    }
      ) 
      .catch(error => {
          //////console.log(error);
        alert("이미 존재하는 회원입니다.")
        setValues({email:'', password:'', name:''});
      })
  
}

// Kakao Login
const responseKakao = (res) => {
  //console.log(res)
  const url = `http://${process.IP}:10000/users/signup/oauth`;
  axios.post(url, {
      name: res.profile.properties.nickname,
      email: res.profile.kakao_account.email,

    })
    .then(response =>{
      //console.log(response);
      alert("가입이 완료 되었습니다.")
      props.history.push({
        pathname: '/student'
      });
    }
      ) 
      .catch(error => {
          //console.log(error);
        alert("이미 존재하는 회원입니다.")
        setValues({email:'', password:'', name:''});
      })
}

// Login Fail
const responseFail = (err) => {
  console.error(err);
}
    return (
        <Container maxWidth="xs" style={{backgroundColor: 'white'}}>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                autoComplete="email"
                autoFocus
                fullWidth
                label="email address"
                name="email"
                value={values.email}
                onChange={handleChangeForm} />
                <div style={{ color: "red", fontSize: "12px" }}>
                {error.emailError}
              </div>

            <TextField
                variant="outlined"
                margin="normal"
                required
                autoComplete="current-password"
                fullWidth
                label="password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChangeForm} />
                <div style={{ color: "red", fontSize: "12px" }}>
              {error.pwdError}
            </div>

            <TextField
                variant="outlined"
                margin="normal"
                required
                autoComplete="name"
                fullWidth
                label="name"
                name="name"
                value={values.name}
                onChange={handleChangeForm} />
                 <div style={{ color: "red", fontSize: "12px" }}>
              {error.nameError}
            </div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
            >
                SIGN UP
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" component={RouterLink} to="/student">
              <span>
                Already have an account? Sign in
                </span>
              </Link>
            </Grid>
          </Grid>
        </form>
        <Typography variant="button" display="block" style={{paddingTop:"10px",paddingBottom:"10px",fontWeight:'bold'}}>SNS계정으로 회원가입</Typography>
        <div className={classes.container4}>
            <GoogleLogin
                    clientId="772422341432-u6s3t1r5h6o4497r3rf86ilr4278t9p5.apps.googleusercontent.com"
                    buttonText="Sign In with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseFail}
                    className="google_signup"
                />
                </div>
                <div style={{height:"20px"}}>&nbsp;</div>
                <div className={classes.container3}>
                <KakaoLogin
                    jsKey="5ff2615807951d9ca9a859d3ba942ba1"
                    buttonText="Kakao"
                    onSuccess={responseKakao}
                    onFailure={responseFail}
                    getProfile={true}
                    className="kakao_signup"
                    ><img style={{position:"relative", top:"5px", right:"10px"}}width ="20px" height="20px" src={kakao_png} />Sign In with Kakao
                    </KakaoLogin>
                </div>
        </div>
        </Container>
    )
}
