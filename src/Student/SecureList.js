import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import SecureItem from '../Student/SecureItem.js';
import '../Student/Training.css';
import AuthContext from '../context/Auth.context.js'

var process = require('../myProcess.json');

function SecureList(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

SecureList.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '80vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  gridList: {
    paddingLeft: '4%',
    paddingBottom: '10%',
    width: '80%',
    height: `${window.innerHeight}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [value, setValue] = React.useState(0);
  const [languages, setLanguages] = React.useState([]);
  const [secureList, setSecureList] = React.useState([]);
  const [mylanguage, setMylanguage] = React.useState("");
  const [lanId, setLanId] = React.useState("");


  const handleChange = (e, newValue) => {
    // console.log(newValue)

    setValue(newValue);
    setMylanguage(languages[newValue].languageType);
    //console.log(newValue);
    setLanId(languages[newValue].languageId);
    const token = JSON.parse(localStorage.getItem('token'))
    const url = `http://${process.IP}:10000/lan/${languages[newValue].languageId}`;
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        setSecureList(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  };


  //language={languages[value].languageType}
  const SecureItems = secureList.map(sec => {
    return (
      <Grid item>
        <SecureItem secure={sec} key={sec.secId} language={mylanguage} languageId={lanId} />
      </Grid>
    )
  })

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    const url = `http://${process.IP}:10000/lan`;


    //언어목록가져오기
    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setLanguages(response.data);

        setMylanguage(response.data[0].languageType);
        setLanId(response.data[0].languageId);
        const url2 = `http://${process.IP}:10000/lan/${response.data[0].languageId}`;
        //첫번째 언어의 리스트 불러오기
        axios.get(url2, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            setSecureList(response.data)
          })
          .catch(error => {
            if (error.response != undefined) {
              if (error.response.status == 401) {
                alert('토큰이 유효하지 않습니다! 로그아웃됩니다.')
                auth.onLogout();
                window.location.href = '/student';
              }
              else if (error.response.status == 403) {
                alert('토큰이 만료되었습니다. 다시 로그인해주세요 :)')
                auth.onLogout();
                window.location.href = '/student';
              }
            }
          })

      })
      .catch(error => console.log(error))


  }, [])

  return (
    <div>
      <section id="sec">
        <h2>Security vulnerability</h2>
        <h4>Description</h4>
      </section>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="language-tab"
          className={classes.tabs}
        >
          {languages.map((lan, i) => (<Tab label={lan.languageType} key={lan.languageId} {...a11yProps(i)} />))}
        </Tabs>
        <GridList className={classes.gridList} cols={3}>
          {/* <Grid container cols={3} direction="row" justify="space-around" alignItems="center"> */}
          {SecureItems}
          {/* </Grid> */}
        </GridList>
      </div>
    </div>
  );
}
