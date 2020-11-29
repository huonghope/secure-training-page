import React,{useContext} from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import AuthContext from '../context/Auth.context.js';

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
        right: '25%',
        display:'flex',
        flexDirection:'row',
    },
    Btn:{
        display:'flex',
        float:'right',
        marginTop:'5px',
    },
}))

export default function Login(props){
    const classes = useStyles();

    const [values,setValues]=React.useState({
        email:'',
        password:'',
        type:0
    });
    const {onLogin} = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = `http://${process.IP}:10000/users/login`;
          axios.post(url, {
            type: 0,
            email: values.email,
            password: values.password,
          },)
          .then(response =>{
            localStorage.setItem('token',JSON.stringify(response.headers.token));
            localStorage.setItem('uid',JSON.stringify(response.headers.userid));
            localStorage.setItem('type',"admin");
            onLogin()

            window.location.href="/admin/users";
          }
            ) 
            .catch(error => {
                //console.log(error);
              alert("틀렸습니다.")
              setValues({email:'', password:''});
            })
    }
    const handleChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }

    return(
        
        <Container component="main" maxWidth="xs" className={classes.paper}>
        <Typography variant="h5" gutterBottom>관리자</Typography>
        <Typography variant="h3" gutterBottom>LOGIN</Typography>
        <div className={classes.container}>
            <form onSubmit={handleSubmit} className={classes.container1}>
                
                <TextField
                required
                variant="outlined"
                label="id"
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
                fullWidth
                className={classes.Btn}
                type="submit"
                variant="contained"
                color="primary">
                    로그인
                </Button>
            </div>
            </form>
        </div>
        </Container>
    )
}