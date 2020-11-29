import React, {useContext, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import Avatar from '@material-ui/core/Avatar';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/Auth.context.js';

import './headerstyle.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  paper: {
    marginRight: theme.spacing(2),
    border: '1px solid #d3d4d5',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function Header(props) {
  const auth = useContext(AuthContext)
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    auth.onLogout();
    window.location.href='/student';
  }

  const handleMove = ()=>{
    props.history.push('/student/mypage');
    handleClose();
  }

  // useEffect(()=>{
  //   //if조건 수정
  //   if(JSON.parse(localStorage.getItem('islogged'))){
  //     console.log('useEffect in Headers');
  //     const id = JSON.parse(localStorage.getItem('uid'));
  //     const url = `http://${process.IP}:10000/users/${id}`;
  //     axios.get(url)
  //       .then(response =>{
  //       setUser({
  //         name:response.data.name,
  //         email:response.data.email
  //         })
  //     }) 
  //       .catch(error => {
  //         console.log(error);
  //       })
  //   }
  // },[])

  useEffect (() => {
    if(JSON.parse(localStorage.getItem('token')) && !auth.aut)
    auth.onLogin()
    // console.log(auth.aut, auth.type)
  },[auth])

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#252526" }}>
        <Toolbar style={{boxShadow: '0 7px 10px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)'}}>
          <a href="/student" className={classes.title}>
          <img height="25px" width="140px" src="/images/logo-secolab.png"/>
          </a>
          {(auth.aut && auth.type==1) && (
            <div>
              <Button
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                {JSON.parse(localStorage.getItem('user'))[0]}
                <Avatar style={{marginLeft:'3px'}} alt="user" src="/images/2.jpg"/>
              </Button>
              <Menu
              keepMounted
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              style={{marginTop:'48px'}}
                >
                    <div className="dw-user-box">
                        <div className="u-img"><img src="/images/2.jpg" alt="user"/></div>
                            <div className="u-text">
                                <h4>{JSON.parse(localStorage.getItem('user'))[0]}</h4>
                                <p>{JSON.parse(localStorage.getItem('user'))[1]}</p>
                                <a className="btn-container btn-gradient mini" onClick={handleMove}>Go Mypage</a>
                            </div>
                    </div>
                    <li role="separator" className="divider"/>
                    <List>
                        <ListItem button onClick={handleLogout}>
                            <PowerSettingsNewIcon/>
                            <ListItemText style={{marginLeft:'5px'}} primary="Logout"/>
                        </ListItem>
                    </List>
            </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
