import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import LanTable from './LanTable.js';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import FirCategoryTable from './FirCategoryTable.js';
import SecCategoryTable from './SecCategoryTable.js';
import '../Submitter/Submit.css';
import AuthContext from '../context/Auth.context.js';
import CircularProgress from '@material-ui/core/CircularProgress';

var process = require('../myProcess.json');

const ColorButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: "#607d8b",
    '&:hover': {
      backgroundColor: "#455a64",
    },
  },
}))(Button);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props) {
  const classes = useStyles();
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

TabPanel.propTypes = {
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
    marginTop:'8vh',
    height: '80vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width:'60%'
},
selectEmpty: {
  marginTop: theme.spacing(1),
},
Btn: {
  // marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
},
hint:{
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
},
}));

export default function AddData() {
  const classes = useStyles();
  const auth = useContext(AuthContext)
  const [inputData,setInputData]=React.useState("");
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [data,setData]=React.useState({
    category:1,
  });
  const [categories,setCategories]=React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const tabChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
    setInputData('');
  };


  const handleOpen = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const url = `http://${process.IP}:10000/admin/category`;

    setOpen(true)
     //대분류 목록 받아오기
     axios.get(url,{
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
    .then(response=>{
        console.log(response);
        setCategories(response.data);
       })
  .catch(error=>{
        console.log(error);
    })
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleInputChange = (e) => {
    setInputData(e.target.value)
  }
  const handleDataChange = (e)=>{
    // console.log(e.target.value)
    setData({...data,[e.target.name]:e.target.value})
  }

  const languageAdd = () => {
    if(inputData!=""){
    const token = JSON.parse(localStorage.getItem('token'))
    const url = `http://${process.IP}:10000/admin/lan`
    
    let form = new FormData();
    form.append('languageType', inputData)

    axios.post(url,form, {
      headers: {
        "Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin" : '*'
      }
    })
      .then(response => {
          // console.log(response.data)
          alert(`[${inputData}]가 추가되었습니다.`)
          window.location.reload();

      })
      .catch(error=> {
        if(error.response != undefined){
        if(error.response.status == 401){
          alert('토큰이 유효하지 않습니다! 로그아웃됩니다.')
          auth.onLogout();
          window.location.href='/admin';
        }
        else if(error.response.status == 403){
          alert('토큰이 만료되었습니다. 다시 로그인해주세요 :)')
          auth.onLogout();
          window.location.href='/admin';
        }
      }
      })
    }
  }

  const firCategoryAdd = () => {
    if(inputData!=""){
    const token = JSON.parse(localStorage.getItem('token'))
    const url = `http://${process.IP}:10000/admin/category`
    let form = new FormData();
    form.append('scategoryName',inputData)

    axios.post(url,form, {
      headers: {
        "Authorization": `Bearer ${token}`, "Access-Control-Allow-Origin" : '*'
      }
    })
      .then(response => {
          // console.log(response.data)
          alert(`[${inputData}]가 추가되었습니다.`)
          window.location.reload();

      })
      .catch(error=> {
        if(error.response.status == 401){
          alert('토큰이 유효하지 않습니다! 로그아웃됩니다.')
          auth.onLogout();
          window.location.href='/admin';
        }
        else if(error.response.status == 403){
          alert('토큰이 만료되었습니다. 다시 로그인해주세요 :)')
          auth.onLogout();
          window.location.href='/admin';
        }
      })
    }
  }

  const handleUpload = (e) => {
    // console.log(e.target.files[0]);
    // console.log(e.target.name);

    if(e.target.name=='pdffile'){
        setData({...data,pdffileName:e.target.files[0].name, pdffile:e.target.files[0]})
    }
    else if(e.target.name=='videofile'){
        setData({...data,videofileName:e.target.files[0].name, videofile:e.target.files[0]})
    }
}

const handleSubmit = () => {
  // console.log(data);

  if(data.pdffile == null || data.videofile== null || data.secName=="") {
    alert('내용을 입력해 주세요!')
  }
  else if(!loading){
    setLoading(true)
    // console.log(data.category, typeof(data.category))
    const token = JSON.parse(localStorage.getItem('token'));
    const url = `http://${process.IP}:10000/admin/sv/add`;
    let form = new FormData();
    form.append('scategoryId', data.category);
    form.append('secName', data.secName);
    form.append('pdf',data.pdffile);
    form.append('video', data.videofile);

    axios({
      method:'POST',
      url: `${url}`,
      data: form,
      headers: {"Authorization" : `Bearer ${token}`, "Access-Control-Allow-Origin" : '*'}
    })
    .then(response => {
      console.log(response)
      if(response.data == ""){
        alert('이미 존재하는 이름입니다.')
        setLoading(false)
        setData({...data,secName:''})
      }
      else{
        alert(`${data.secName}이(가) 추가되었습니다.`)
        setLoading(false)
        handleClose()
        // window.location.reload()
      }
    })
    .catch(error=>{
      if(error.response.status == 401){
        alert('토큰이 유효하지 않습니다! 로그아웃됩니다.')
        auth.onLogout();
        window.location.href='/admin';
      }
      else if(error.response.status == 403){
        alert('토큰이 만료되었습니다. 다시 로그인해주세요 :)')
        auth.onLogout();
        window.location.href='/admin';
      }
    })
  }
}

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={tabChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="언어추가" {...a11yProps(0)} />
        <Tab label="대분류추가" {...a11yProps(1)} />
        <Tab label="소분류추가" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <div>
          <Typography variant="h5" align="center" style={{ marginBottom: '1vh' }}>
            언어 추가
          </Typography>
          <div style={{ width: '100%', height: '5%'}} />
            <div style={{ float: 'right', marginBottom:'10px' }}> <input style={{height:'12px'}}value={inputData} onChange={handleInputChange}></input>&nbsp;<ColorButton  style={{height:'34px'}}variant="contained" color="primary" onClick={languageAdd}> 추가</ColorButton></div>
          <LanTable/>
          </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div>
        <Typography variant="h5" align="center" style={{ marginBottom: '1vh' }}>
          대분류 추가
        </Typography>
        <div style={{ float: 'right', marginBottom:'10px' }}> <input style={{height:'12px'}}value={inputData} onChange={handleInputChange}></input>&nbsp;<ColorButton  style={{height:'34px'}}variant="contained" color="primary" onClick={firCategoryAdd}> 추가</ColorButton></div>
          <FirCategoryTable/>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
      <Typography variant="h5" align="center" style={{ marginBottom: '1vh' }}>
          소분류 
        </Typography>
        <div style={{ float: 'right', marginBottom:'10px', marginRight:'10px' }}> 
        <div style={{padding: '10px 10px', borderRadius: '5px', outline: 'none', float:'left', width:'137px'}}></div>
    &nbsp;<ColorButton  style={{height:'34px'}}variant="contained" color="primary" onClick={handleOpen}> 추가</ColorButton></div>
          <SecCategoryTable/>

        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar} style={{ backgroundColor: '#607d8b', }}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  소분류 추가
            </Typography>
                <Button autoFocus color="inherit" disabled={loading} onClick={handleSubmit}>
                  ADD
            </Button>
    {loading && <CircularProgress size={24} className={classes.buttonProgress} />}

              </Toolbar>
            </AppBar >

            <Paper className={classes.paper}>
              <div className="row-wrapper">
                <label htmlFor="categorytype">보안약점기준</label>
                <FormControl required variant="outlined" className={classes.formControl}>
                  <Select
                    className={classes.selectEmpty}
                    // margin='dense'
                    id="select"
                    fullWidth
                    native
                    disabled={loading}
                    value={data.category && data.category || 1}
                    name="category"
                    onChange={handleDataChange}
                  >
                    <option value="" disabled />
                    {categories.map(cat => {
                      return <option value={cat.scategoryId} key={cat.scategoryId} >{cat.scategoryName}</option>
                    })}
                  </Select>
                </FormControl>
              </div>
              <div className="row-wrapper">
                <label htmlFor="categoryname">보안약점명</label>
                <FormControl variant="outlined" className={classes.formControl}>
                  <TextField
                    fullWidth
                    className={classes.hint}
                    id="secName"
                    label="추가할 보안약점 명을 선택하여 주세요."
                    disabled={loading}
                    variant="outlined"
                    name="secName"
                    value={data.secName}
                    maxLength="1024"
                    onChange={handleDataChange}
                  />
                </FormControl>
              </div>
              <div className="row-wrapper">
                <label htmlFor="pdfFile">PDF 파일</label>
                <FormControl required variant="outlined" className={classes.formControl}>
                  <ColorButton
                    fullWidth
                    disabled={loading}
                    className={classes.Btn}
                    variant="contained"
                    color="primary"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                  >
                    {data.pdffileName && data.pdffileName || 'PDF 파일'}
                    <input
                      type="file"
                      accept=".pdf"
                      style={{ display: "none" }}
                      name="pdffile"
                      file={data.pdffile}
                      onChange={handleUpload}
                    />
                  </ColorButton>
                </FormControl>
              </div>
              <div className="row-wrapper">
                <label htmlFor="videoFile">VIDEO 파일</label>
                <FormControl required variant="outlined" className={classes.formControl}>
                  <ColorButton
                    fullWidth
                    disabled={loading}
                    className={classes.Btn}
                    variant="contained"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    {data.videofileName && data.videofileName || 'VIDEO 파일'}
                    <input
                      type="file"
                      accept="video/mp4,video/x-m4v,video/*"
                      style={{ display: "none" }}
                      name="videofile"
                      file={data.videofile}
                      onChange={handleUpload}
                    />
                  </ColorButton>
                </FormControl>
              </div>

            </Paper>
          </Dialog>
        </div>
      </TabPanel>
    </div>
  );
}
