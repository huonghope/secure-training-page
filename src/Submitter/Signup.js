import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import KaKaoLogin from 'react-kakao-login';
import kakao_png from '../images/kakao-png.png';

var process = require('../myProcess.json');

const useStyles = makeStyles((theme) => ({
  
    paper:{
        marginTop:theme.spacing(8),
        display:'flex',
        flexDirection: 'row',
        alignItems:'center',
        border:'1px solid gray',
        padding:'20px',
        backgroundColor: '#DBE4EE',
        borderRadius:'10px',
        boxShadow: '0 7px 10px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)',
    },
    container:{
        // maxWidth:'300px',
        paddingLeft: '70px',
    },
    container1:{
        width:'400px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    container2:{
        float:'right',
        position:'relative',
        display:'flex',
        flexDirection:'row',
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
        margin:'4px',
    },
}))

export default function Signup(props){
    const classes = useStyles();

    const [values,setValues]=React.useState({
        email:'',
        password:'',
        name:''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log('submit')
        const url = `http://${process.IP}:10000/trainer/signup`;
          axios.post(url, {
            name: values.name,
            email: values.email,
            password: values.password,
          })
          .then(response =>{
            //console.log(response);
            alert("가입이 완료 되었습니다.")
            props.history.push({
              pathname: '/submitter'
            });
          }
            ) 
            .catch(error => {
              //console.log(error);
              alert("이미 존재하는 회원입니다.")
              setValues({name:'', email:'', password:''});
            })
    }
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    //Google Login
    const responseGoogle=(res) => {
        //console.log(res)

        const url = `http://${process.IP}:10000/trainer/signup/oauth`;
        axios.post(url,{
            name: res.Pt.Cd,
            email: res.profileObj.email,
          })
          .then(response =>{
            //console.log(response);
            alert("가입이 완료 되었습니다.")
            props.history.push({
              pathname: '/submitter'
            });
          }
            ) 
            .catch(error => {
              //console.log(error);
              alert("이미 존재하는 회원입니다.")
              setValues({name:'', email:'', password:''});
            })
        
    }

    // Kakao Login
    const responseKakao = (res) => {
        //console.log(res)
        const url = `http://${process.IP}:10000/trainer/signup/oauth`;
        axios.post(url, {
            name: res.profile.properties.nickname,
            email: res.profile.kakao_account.email,

          })
          .then(response =>{
            //console.log(response);
            alert("가입이 완료 되었습니다.")
            props.history.push({
              pathname: '/submitter'
            });
          }
            ) 
            .catch(error => {
              //console.log(error);
              alert("이미 존재하는 회원입니다.")
              setValues({name:'', email:'', password:''});
            })
    }

    // Login Fail
    const responseFail = (err) => {
        console.error(err);
    }

    return(
        <Container component="main" maxWidth="sm" className={classes.paper}>
        <div className={classes.container}>
        <Typography variant="h3" gutterBottom>SIGN UP</Typography>
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

                <TextField
                required
                type="name"
                variant="outlined"
                label="name"
                fullWidth
                value={values.name}
                name="name"
                onChange={handleChange}
                style={{backgroundColor:'white', margin:'2px'}}/>

                <Button
                className={classes.Btn}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth>
                    회원가입
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                    <Link variant="body2" component={RouterLink} to="/submitter">
                     Already have an account? Sign in
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
                    className="google_submitter"
                />
                </div>
                <div style={{height:"20px"}}>&nbsp;</div>
                <div className={classes.container3}>
                <KaKaoLogin
                    jsKey="5ff2615807951d9ca9a859d3ba942ba1"
                    onSuccess={responseKakao}
                    onFailure={responseFail}
                    getProfile={true}
                    className="kakao_submitter"
                ><img style={{position:"relative", top:"5px", right:"10px"}}width ="20px" height="20px" src={kakao_png} />Sign In with Kakao</KaKaoLogin>
                </div>
        </div>

        </Container>
    )
}