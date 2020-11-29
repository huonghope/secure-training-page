import React, {useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Submit.css';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AuthContext from '../context/Auth.context.js';

var process = require('../myProcess.json');

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
          width: 1000,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        padding: theme.spacing(2),
        // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        //   marginTop: theme.spacing(6),
        //   marginBottom: theme.spacing(6),
        //   padding: theme.spacing(3),
        // },
      },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    formControl: {
        margin: theme.spacing(1),
        width:'60%'
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    Btn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    hint:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
      },
}));

export default function Submit(props) {
    const classes = useStyles();
    const auth = useContext(AuthContext)

    const [data,setData]=React.useState({
        // languageId:'139a1b36-1aac-4b78-ae5c-610b38e15691',
        languageId:'',
        firstCategory:'입력 데이터 검증 및 표현',
        secondCategory:'SQL Injection',
        scategoryId:1,
        secId: 1,
        badfile: null,
        badfileName:'진단대상코드',
        goodfile: null,
        goodfileName:`수정대상코드`,
        badDescription:'',
        goodDescription:'',
        lineNum:'',
        //seclineNum:'',
        keyword: '',
    })

    const [keywords,setKeywords]=React.useState([]);
    const [edit, setEdit]=React.useState(false)
    const [line, setLine]=React.useState();
    const [languages, setLanguages]=React.useState([])
    const [firstCategories,setFirstCategories]=React.useState([])
    const [secondCategories, setSecondCategories]=React.useState([])
    
    const handleSubmit = (e) => {
        //console.log(data);
        //console.log(keywords.join('/'))
        const ret = checkNull();
        if(ret){
            // console.log(data);
            alert('내용을 입력해 주세요!')
        }
        else{
        const token = JSON.parse(localStorage.getItem('token'))
        const url = `http://${process.IP}:10000/trainer/sb`;
        const userid = JSON.parse(localStorage.getItem('uid'));
        let form2 = new FormData();
        form2.append('userId',userid);
        form2.append('secId',data.secId);
        form2.append('languageId',data.languageId);
        form2.append('vulFile',data.badfile);
        form2.append('scodeVulDesc',data.badDescription);
        form2.append('secFile',data.goodfile);
        form2.append('scodeSecDesc',data.goodDescription);
        form2.append('scodeLineNum',data.lineNum);
        form2.append('scodeKeyword',keywords.join('/'));
        //form2.append('scodeSecLine',data.seclineNum);

        axios({
        method:'POST',
        url: `${url}`,
        data: form2,
        headers: {"Authorization" : `Bearer ${token}`, "Access-Control-Allow-Origin" : '*'}
        })
        .then(response=>{
            //console.log(response.data);
            props.history.push('/submitter/list')
         })
        .catch(error=>{
            if(error.response != undefined){
                if(error.response.status == 401){
                    alert('토큰이 유효하지 않습니다! 로그아웃됩니다.')
                    auth.onLogout();
                    window.location.href='/submitter';
                  }
                  else if(error.response.status == 403){
                    alert('토큰이 만료되었습니다. 다시 로그인해주세요 :)')
                    auth.onLogout();
                    window.location.href='/submitter';
                  }
                }
        })
        }
    }

    //계속 걸림 체크해보기
    const checkNull = ()=>{
        if(data.secId == "" || data.languageId=="" || data.badfile==null || data.goodfile==null || data.badDescription=="" || data.goodDescription=="" || data.lineNum=="" || keywords=="" /*|| data.seclineNum==""*/){
            return true;
        }
        return false;
    }

    const handleChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
        //language는 id로 보내기때문에 id설정
        // if(e.target.name==='languageId'){
        //     console.log('languageId:',e.target.value);
        // }
    }

    const handleUpload = (e) => {
         //console.log(e.target.files[0]);
        //console.log(e.target.name);

        if(e.target.name==='badfile'){
            setData({...data,badfileName:e.target.files[0].name, badfile:e.target.files[0]})
        }
        else if(e.target.name==='goodfile'){
            setData({...data,goodfileName:e.target.files[0].name, goodfile:e.target.files[0]})
        }
    }

    const addKeyword = (e) => {
        // console.log(data.keyword);
        if(data.keyword === ""){
            alert("추가할 내용을 입력해주세요!")
            return;
        }
        setKeywords(keywords.concat(data.keyword))
        setData({...data,keyword:''})
        console.log(keywords)
    }
    const editKeyword =(e)=>{
        //console.log(line)
        if(data.keyword == ""){
            alert("수정할 내용을 입력해주세요!")
            return;
        }
        let newKeywords = [];
        if(line === 0){
            newKeywords = newKeywords.concat(data.keyword,keywords.slice(1))
        }
        else if(line > 0){
            newKeywords = newKeywords.concat(keywords.slice(0,line),data.keyword,keywords.slice(line+1))
        }
        setKeywords(newKeywords)
        setData({...data,keyword:''})
        setEdit(false);
    }

    const handleDelete = (e) => {
        // console.log(e.currentTarget.value)
        const index = Number(e.currentTarget.value);
        // alert(typeof index)
        let newKeywords = [];
        // console.log(index);
        // console.log(keywords)
        if(index === 0){            
            newKeywords = keywords.slice(1)
        }
        else if(index > 0){            
            newKeywords = newKeywords.concat(keywords.slice(0,index), keywords.slice(index+1))
        }
        setKeywords(newKeywords);
    }
    const handleEdit = (e) => {
        // console.log(e.currentTarget.value)
        setEdit(true);
        setLine(Number(e.currentTarget.value))
        setData({...data,keyword:keywords[e.currentTarget.value]})
    }

    //대분류 클릭
    const categoryChange = (e)=>{
        handleChange(e);
        const token = JSON.parse(localStorage.getItem('token'))
        const url = `http://${process.IP}:10000/trainer/sb/sv`;
        let form = new FormData();
        //console.log('value',e.target.value);
        form.append('scategoryId',e.target.value);
       axios({
           method:'POST',
           url: `${url}`,
           data: form,
           headers: {"Authorization" : `Bearer ${token}`, "Access-Control-Allow-Origin" : '*'}
       })
       .then(response=>{
           //console.log(response.data);
           setSecondCategories(response.data);
        })
       .catch(error=>{/*console.log(error)*/})
    }

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem('token'));
        const url = `http://${process.IP}:10000/lan`;
        const url2 = `http://${process.IP}:10000/admin/category`;
        const url3 = `http://${process.IP}:10000/trainer/sb/sv`;
        //언어 받아오기
          axios.get(url,{
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response =>{
            setLanguages(response.data);
            setData({...data,languageId:response.data[0].languageId})
          })
          .catch(error=>{
              //console.log(error);
          })

          //대분류 목록 받아오기
          axios.get(url2,{
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response=>{
            //   console.log(response);
              setFirstCategories(response.data);
          })
          .catch(error=>{
              //console.log(error);
          })

          //소분류 목록 받아오기
          let form = new FormData();
        form.append('scategoryId',1);
       axios({
           method:'POST',
           url: `${url3}`,
           data: form,
           headers: {"Authorization" : `Bearer ${token}`, "Access-Control-Allow-Origin" : '*'}
       })
       .then(response=>{
        //    console.log(response.data);
           setSecondCategories(response.data);
        })
       .catch(error=>{/*console.log(error)*/})

        },[]);

    return (
        <div style={{padding:"5vh"}}>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center" style={{marginBottom:'1vh'}}>
            문제 등록
          </Typography>
          <div className="row-wrapper">
            <label htmlFor="lineNum">언어</label>
                <FormControl required variant="outlined" className={classes.formControl}>
                    {/* <InputLabel shrink htmlFor="languageId">언어</InputLabel> */}
                    <Select
                        className={classes.selectEmpty}
                        margin='dense'
                        fullWidth
                        native
                        value={data.languageId}
                        name="languageId" 
                        onChange={handleChange}
                        inputProps={{
                            id: 'languageId',
                        }}
                    >
                        <option value="" disabled/>
                        {languages.map(lan => {
                             return <option value={lan.languageId} key={lan.languageId} >{lan.languageType}</option>
                        })}
                    </Select>
                </FormControl>
                </div>
                <div className="row-wrapper">
                <label htmlFor="lineNum">보안약점기준</label>
                <FormControl required variant="outlined" className={classes.formControl}>
                    {/* <InputLabel shrink style={{whiteSpace:'nowrap'}} htmlFor="firstCategory">보안약점기준</InputLabel> */}
                    <Select
                        className={classes.selectEmpty}
                        margin='dense'
                        fullWidth
                        native
                        value={data.firstCategory} 
                        name="firstCategory" 
                        onChange={categoryChange}
                        inputProps={{
                            id: 'firstCategory',
                        }}
                    >
                        <option value=""  disabled/>
                        {firstCategories.map(fir => {
                            return <option value={fir.scategoryId} key={fir.scategoryId} >{fir.scategoryName}</option>
                    })}
                    </Select>
                </FormControl>
                </div>
                <div className="row-wrapper">
                <label htmlFor="lineNum">보안약점리스트</label>
                <FormControl required variant="outlined" className={classes.formControl}>
                    {/* <InputLabel shrink style={{whiteSpace:'nowrap'}} htmlFor="secondCategory">보안약점리스트</InputLabel> */}
                    <Select
                        className={classes.selectEmpty}
                        margin='dense'
                        fullWidth
                        native
                        value={data.secId} 
                        name="secId" 
                        onChange={handleChange}
                        inputProps={{
                            id: 'secId',
                        }}
                    >
                        <option value="" disabled>
                            보안약점기준을 선택해 주세요.
                        </option>
                        {secondCategories.map(sec => {
                            return <option value={sec.secId} key={sec.secId} >{sec.secName}</option>
                        })}
                    </Select>
                    </FormControl>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        className={classes.Btn}
                        variant="contained"
                        color="primary"
                        component="label"
                        startIcon={<CloudUploadIcon/>}
                    >
                       {data.badfileName ? data.badfileName : '진단대상코드'}
                    <input
                        type="file"
                        accept=".java, .c, .cpp"
                        style={{ display: "none" }}
                        name="badfile"
                        file={data.badfile} 
                        onChange={handleUpload}
                    />
                    </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <Button
                        fullWidth
                        className={classes.Btn}
                        variant="contained"
                        component="label"
                        color="primary"
                        startIcon={<CloudUploadIcon/>}
                    >
                        {data.goodfileName? data.goodfileName : '수정대상코드'}
                    <input
                        type="file"
                        accept=".java, .c, .cpp"
                        style={{ display: "none" }}
                        name="goodfile"
                        file={data.goodfile} 
                        onChange={handleUpload}
                    />
                    </Button>
                    </Grid>
                    </Grid>
                <TextField
                    required
                    className={classes.hint}
                    fullWidth
                    id="badDescription"
                    label="진단대상코드해설"
                    multiline
                    rows={5}
                    variant="outlined"
                    name="badDescription"
                    value={data.badDescription}
                    maxLength="1024"
                    onChange={handleChange}
                />
                <TextField
                    required
                    className={classes.hint}
                    fullWidth
                    id="goodDescription"
                    label="수정대상코드해설"
                    multiline
                    rows={5}
                    variant="outlined"
                    name="goodDescription"
                    value={data.goodDescription}
                    maxLength="1024"
                    onChange={handleChange}
                />
                <TextField
                    required
                    fullWidth
                    id="linenum"
                    label="진단대상코드라인번호"
                    style={{ margin: 8 }}
                    value={data.lineNum}
                    name="lineNum"
                    onChange={handleChange}
                    placeholder="숫자와 ,만 입력해주세요!"
                    helperText="&nbsp;정답이 여러개인 경우 띄어쓰기없이 컴마(,)로 구분하여 입력해주세요."
                    margin="normal"
                    InputLabelProps={{
                        id: 'vulline',
                        shrink: true,
                    }}
                />
                {/* <TextField
                    required
                    fullWidth
                    id="linenumb"
                    label="수정대상코드라인번호"
                    style={{ margin: 8 }}
                    value={data.seclineNum}
                    name="seclineNum"
                    onChange={handleChange}
                    placeholder="숫자와 ,만 입력해주세요!"
                    helperText="&nbsp;정답이 여러개인 경우 띄어쓰기없이 컴마(,)로 구분하여 입력해주세요."
                    margin="normal"
                    InputLabelProps={{
                        id:'problemline',
                        shrink: true,
                    }}
                /> */}
                <div className="row-wrapper">
                <TextField
                    fullWidth
                    required
                    className={classes.hint}
                    id="keyword"
                    label="정답 키워드를 라인 단위로 입력해주세요."
                    helperText="키워드가 여러개인 경우 띄어쓰기없이 컴마(,)로 구분하여 입력해주세요."
                    variant="outlined"
                    name="keyword"
                    value={data.keyword}
                    maxLength="1024"
                    onChange={handleChange}
                />
                {edit?  <IconButton aria-label="delete" style={{color:"green"}} className={classes.Btn} onClick={editKeyword}>
                    <CheckCircleTwoToneIcon fontSize="large"/>
                </IconButton> :  <IconButton aria-label="delete" color="primary" className={classes.Btn} onClick={addKeyword}>
                    <AddCircleTwoToneIcon fontSize="large"/>
                </IconButton>}
               
                </div>
                <div className={classes.demo}>
            <Table size="small">
                <TableBody>
                   {keywords.map((k,i) => {
                       return(
                        <TableRow key={i}>
                        <TableCell component="th" scope="row">
                               {k}
                        </TableCell>
                        <TableCell align="right">
                           <IconButton value={i} edge="end" aria-label="edit" onClick={(e) => handleEdit(e)}>
                                <EditTwoToneIcon/>
                            </IconButton>
                            <IconButton value={i} edge="end" aria-label="delete" style={{color:'#F17300'}} onClick={(e)=>handleDelete(e)}>
                                <DeleteTwoToneIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                       )
                   })} 
                </TableBody>
            </Table>
          </div>
            <div className="createProblem">
                <button onClick={handleSubmit}>
                    등록하기
                </button>
            </div>
        </Paper>
        </main>
        </div>
    );
}
