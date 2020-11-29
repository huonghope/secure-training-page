import React, { useEffect, useContext } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './detail.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AuthContext from '../context/Auth.context.js';

var process = require('../myProcess.json');

const ColorButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: "#81A4CD",
    '&:hover': {
      backgroundColor: "#3E7CB1",
    },
  },
}))(Button);

const ColorButton2 = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: "#F17300",
    '&:hover': {
      backgroundColor: "#ff9633",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#f5f5ef",
  },
  paper: {
    padding: theme.spacing(5),
    margin: 'auto',
    maxWidth: "80vw",
    height: '300vh'
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  root1: {
    position: 'relative',
    width: '48%',
    float: 'left',
    height: '40vh'
  },
  table: {
    position: 'relative',
    width: '97%',
    float: 'center',
    height: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function ProblemDetail(props) {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [show,setShow]=React.useState(false);
  const [keywords,setKeywords]=React.useState([]);
  const [state,setState]=React.useState({
    open : true,
    options: {
            // selectOnLineNumbers: true,
            // roundedSelection: true,
            readOnly: true,
            //cursorStyle: "line",
            automaticLayout: true, //자동으로 크기 맞춰줌
            //activeStep: 0,
            glyphMargin: false,
            // renderLineHighlight: "all",
            scrollBeyondLastLine: false,
        },
        
        code: 'String id = request.getParameter("id";\n// 외부값에 의해 패스워드 정보를 얻고 있다.\nString pwd = request.getParameter("pwd");\nString sql = " insert into customer(id, pwd, name, ssn, zipcode, addr)"\n+ " values (?, ?, ?, ?, ?, ?)";\nPreparedStatement stmt = con.prepareStatement(sql);\nstmt.setString(1, id);\nstmt.setString(2, pwd);\n// 입력받은 패스워드가 평문으로 DB에 저장되어 안전하지 않다.\nstmt.executeUpdate();',
        width : "",
})
const [problem,setProblem]=React.useState([]);
const [date,setDate]=React.useState();
const [open,setOpen]=React.useState({
  approveOpen:false,
  rejectOpen:false
})
const [select,setSelect]=React.useState('')
const [reason] = React.useState([
  " ",
  "파일명과 클래스명이 다릅니다.",
  "보안약점명과 관련없는 코드입니다.",
  "허용할 수 없는 파일입니다.",
  "문제코드에 문제 주석이 없습니다.",
  "컴파일 할 수 없는 코드입니다."
])

const handleApprove = (e) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const url = `http://${process.IP}:10000/admin/list/ok`;
  let form = new FormData();
  form.append('scodeId',props.match.params.id)

  axios({
    method:'PUT',
    url:`${url}`,
    data:form,
    headers: {"Authorization" : `Bearer ${token}`}
  })
  .then(response => {
    //console.log(response)
    if(response.data != 0){
      alert('승인되었습니다.')
      window.location.reload();
    }
    else{
      alert('승인에 실패하였습니다.')
    }
  })
  .catch(error=>{
    if(error.response != undefined) {
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

const handleReject = (e) => {
  if(select=="")alert('이유를 선택해주세요!')
  else{
  const token = JSON.parse(localStorage.getItem('token'));
  const url = `http://${process.IP}:10000/admin/list/nok`;
  let form = new FormData();
  form.append('scodeId',props.match.params.id);
  form.append('rejectReason',select);
  axios({
    method:'PUT',
    url:`${url}`,
    data:form,
    headers: {"Authorization" : `Bearer ${token}`}
  })
  .then(response => {
    //console.log(response)
    if(response.data != 0){
      alert('거절되었습니다.')
    window.location.reload();
    }
    else{
      alert('거절에 실패하였습니다.')
    }
  })
  .catch(error=>{//console.log(error)
  })
  }
}

const approveOpen = (e)=>{
  setOpen({...open,approveOpen:true})
}
const approveClose = (e)=>{
  setOpen({...open,approveOpen:false})
}
const rejectOpen = (e)=>{
  setOpen({...open,rejectOpen:true})
}
const rejectClose = (e)=>{
  setOpen({...open,rejectOpen:false})
}

const selectChange = (e)=>{
  setSelect(Number(e.target.value) || '')
}

useEffect(()=>{

  import('./Monokai.json')
  .then(data => {
    monaco.editor.defineTheme('Monokai', data);
    monaco.editor.setTheme('Monokai');
  })
  const token = JSON.parse(localStorage.getItem('token'))
  const scodeId = props.match.params.id;
  const url = `http://${process.IP}:10000/trainer/sb/${scodeId}`;
  axios.get(url,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response=>{
    //console.log(response)
    setProblem(response.data);
    setDate(response.data.scodeRegDate.substring(0,10));
    setKeywords(response.data.scodeKeyword.split('/'))
    if(response.data.scodeApproval != 0)setShow(true)
  })
  .catch(error=>{
    if(error.response != undefined) {
    if(error.response.status == 401){
      alert('토큰이 유효하지 않습니다! 로그아웃됩니다.')
      auth.onLogout();
      window.location.href='/admin';
    }
    else if(error.response.status == 403){
      alert('토큰이 만료되었습니다. 다시 로그인해주세요 :)')
    }
  }
  else{
    alert('로그인을 다시 해주세요!')
    auth.onLogout();
    window.location.href='/submitter'
  }
  })

  // setTimeout(function () {
  //   monaco.editor.getModels()[0].getSelection()={};
  //   monaco.editor.getModels()[1].getSelection()={};
  //   },2000);

},[])



const handleBack = () => {
  props.history.goBack();
}

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <IconButton onClick={handleBack}>
        <ArrowBackIcon fontSize="large"/>
        </IconButton>
      <Typography component="h1" variant="h4" align="center" style={{marginBottom:'1vh'}}>
            문제 상세 보기
      </Typography>
      
<div className="blank"/>
{(show==true && problem.scodeApproval==0) && <Typography variant="h6" align="center" style={{marginBottom:'1vh', color:'red', fontStyle:'italic'}}>
      {`거절 사유 : ${reason[problem.rejectReason]}`}
  </Typography>}
      <div className="descTable">
<table className="type01">
    <tr>
        <th scope="row">승인여부</th>
        <td> {problem.scodeApproval==0? '심사중' : problem.scodeApproval==1? '승인' : '거절'} </td>
    </tr>
    <tr>
        <th scope="row">보안약점기준</th>
        <td>{problem.scategoryName}</td>
    </tr>
    <tr>
        <th scope="row">보안약점명</th>
        <td>{problem.secName}</td>
    </tr>
    <tr>
        <th scope="row">언어타입</th>
        <td>{problem.languageType}</td>
    </tr>
    <tr>
        <th scope="row">진단대상코드 라인 번호</th>
        <td>{problem.scodeLineNum}</td>
    </tr>
    {/* <tr>
        <th scope="row">수정대상코드 라인 번호</th>
        <td>{problem.scodeSecLine}</td>
    </tr> */}
    <tr>
        <th scope="row">등록날짜</th>
        <td>{date}</td>
    </tr>
</table>
</div>
<div className="blank"/>

<div>
<div style={{position:"relative" ,float:"left", width:"1.5%"}}> &nbsp;</div>
<Card className={classes.root1} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          진단대상코드 해설
        </Typography>
        <Typography className={classes.pos} color="textSecondary">

        </Typography>
        <Typography variant="body2" component="p">
        {problem.scodeVulDesc}
        </Typography>
      </CardContent>

    </Card>
 <div style={{position:"relative" ,float:"left", width:"1%"}}> &nbsp;</div>
    <Card className={classes.root1} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          수정대상코드 해설
        </Typography>
        <Typography className={classes.pos} color="textSecondary">

        </Typography>
        <Typography variant="body2" component="p">
        {problem.scodeSecDesc}
        </Typography>
      </CardContent>

    </Card>

    <div style={{position:"relative" ,float:"left", width:"100%", height: "3%"}}> &nbsp;</div>
    <div style={{position:"relative" ,float:"left", width:"1.5%"}}> &nbsp;</div>
    <TableContainer component={Paper} className={classes.table}>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell style={{backgroundColor:'#81A4CD', fontWeight:'bold', color:'white'}}>정답 키워드</TableCell>
        </TableRow>
      </TableHead>  
      <TableBody>
                   {keywords.map((k,i) => {
                       return(
                        <TableRow key={i}>
                        <TableCell component="th" scope="row">
                               {k}
                        </TableCell>
                        </TableRow>
                       )
                   })} 
                </TableBody>
            </Table>
    </TableContainer>

    </div>
    {/* <button onClick={()=> console.log(monaco.getModels()[0].getSelection()={})}></button> */}
    <div style={{position:"relative" ,float:"left", width:"100%", height: "3%"}}> &nbsp;</div>
    <div style={{position:"relative" ,height: "50%" ,float:"left", width:"100%"}}> &nbsp;
    
    <div className="wrongCode">
    <p className="code-label">진단대상코드: {problem.scodeVulFile}</p>
      <MonacoEditor
        language={problem.languageType}
        options={state.options}
        value={problem.scodeVulCode+""}
        width={state.width}
      />
    </div>
    <div style={{position:"relative" ,float:"left", width:"1%"}}> &nbsp;</div>
    <div className="secureCode">
    <p className="code-label">수정대상코드: {problem.scodeSecFile}</p>
    <MonacoEditor
        language={problem.languageType}
        theme="Monokai"
        options={state.options}
        value={problem.scodeSecCode+""}
        width={state.width}
      />
    </div>
    {/* <img className="stamp" src="/images/success2.png"/> */}

    <div style={{position:"relative" ,float:"left", width:"100%", height: "5%"}}></div>
    {window.location.pathname.split('/')[1]=="admin" && 
    <div style={{position:'relative', float:'right', marginRight:'1.5%'}}>
      {problem.scodeApproval==0 ? <ColorButton variant="contained" color="primary" style={{marginRight:'10px'}} onClick={approveOpen}>승인하기</ColorButton> : <ColorButton variant="contained" color="primary" style={{marginRight:'10px'}} disabled>승인하기</ColorButton> }
      
      <Dialog
        open={open.approveOpen}
        onClose={approveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{color:'green', fontWeight:'bold'}}>{"승인하기"}</DialogTitle>
        <DialogContent>
          <DialogContentText >
          {'문제를 승인하시겠습니까?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={approveClose} variant="contained" color="primary">
            취소
          </Button>
          <Button onClick={handleApprove} variant="outlined" color="primary" autoFocus>
            승인
          </Button>
        </DialogActions>
      </Dialog>
      {problem.scodeApproval==0 ? <ColorButton2 variant="contained" color="secondary" onClick={rejectOpen}>거절하기</ColorButton2> : <ColorButton2 variant="contained" color="secondary" disabled>거절하기</ColorButton2>}
      <Dialog
        open={open.rejectOpen}
        onClose={rejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{color:'red', fontWeight:'bold'}}>{"거절하기"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'문제를 거절하려면 거절 사유를 선택해 주세요.'}
          </DialogContentText>

            <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">이유</InputLabel>
              <Select
                native
                value={select}
                onChange={selectChange}
                input={<Input id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" disabled/>
                <option value={1}>파일명과 클래스명이 다릅니다.</option>
                <option value={2}>보안약점명과 관련없는 코드입니다.</option>
                <option value={3}>허용할 수 없는 파일입니다.</option>
                <option value={4}>문제코드에 문제 주석이 없습니다.</option>
                <option value={5}>컴파일 할 수 없는 코드입니다.</option>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={rejectClose} variant="contained" color="primary">
            취소
          </Button>
          <Button onClick={handleReject} variant="outlined" color="primary" autoFocus>
            거절
          </Button>
        </DialogActions>
      </Dialog>
    </div>}
    
    </div>
    
      </Paper>
    </div>
  );
}