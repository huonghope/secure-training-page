import React, {useContext, useEffect} from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import AuthContext from '../context/Auth.context.js';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  menu: {
    flexGrow:1,
    position: 'static',
    borderRadius: theme.shape.borderRadius,
    fontWeight: "bolder",
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      //backgroundColor: fade(theme.palette.common.white, 0.25),
      color: '#B4B8BB',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
}));

export default function Header(props) {
  const auth = useContext(AuthContext)
  const classes = useStyles();
  const [value,setValue]=React.useState(`${window.location.pathname.substring(11)}`)
  // const [auth, setAuth] = React.useState(true);

  const handleLogout = () => {
    auth.onLogout();
    window.location.href='/submitter';
  }

  const handleChange = (e,newValue) => {
    // console.log(newValue)
    setValue(newValue)
    // window.location.href=`/submitter/${newValue}`
     props.history.push(`/submitter/${newValue}`)
  }

  useEffect (() => {
    // setAuth((JSON.parse(localStorage.getItem('token'))?JSON.parse(localStorage.getItem('token')):false));
    if(JSON.parse(localStorage.getItem('token')) && !auth.aut)
    auth.onLogin('submitter')
    //console.log(auth.aut, auth.type)
  },[auth])

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#252526" }}>
        <Toolbar className={classes.toolbar} style={{boxShadow: '0 7px 10px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19)'}}>
          <a href="/submitter" className={classes.title}>
          <img height="25px" width="140px" src="/images/logo-secolab.png"/>
          </a>
          {auth.aut && (
            <div>
              <Tabs onChange={handleChange} value={value} TabIndicatorProps={{ style: { background: "#F17300" } }}>
                <Tab label="등록 상황 조회" value="list" style={{fontSize:'1.0em'}} />
                <Tab label="문제 등록" value="submit" style={{fontSize:'1.0em'}}  />
          <Button onClick={handleLogout} variant="text" size="large" color="inherit" style={{fontWeight:'bold', float:'right'}}>Logout</Button>  
              </Tabs>
          </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
