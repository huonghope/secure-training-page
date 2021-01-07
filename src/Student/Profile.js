import React,{useEffect, useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import './Profile.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import AirplayIcon from '@material-ui/icons/Airplay';
import AuthContext from '../context/Auth.context.js';

var process = require('../myProcess.json');

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#C4C4C4',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      marginLeft: '3px',
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
      '&::placeholder':{
          fontSize: 14,
      }
    },
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
      // '&:hover':{
      //   backgroundColor:fade(theme.palette.common.black, 0.1),
      // }
    },
    iconButton: {
      padding: 5,
    },
    table: {
        minWidth: 700,
    },
    title: {
        flex: '1 1 100%',
        marginTop: '5vh',
        fontWeight: 'bolder',
   },
  }));

export default function Profile(props){
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [list, setList] = React.useState([])
    const [searchedData, setSearched]=React.useState([]);
    const [search,setSearch] = React.useState({
        type:'secName',
        title:'보안약점명 으',
        content:''
    })
    const [user,setUser] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState(false);

    useEffect(()=> {
        const token = JSON.parse(localStorage.getItem('token'))
        const uid = JSON.parse(localStorage.getItem('uid'));
      const url = `http://${process.IP}:10000/users/${uid}`;
      axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
           //console.log(response)
          setUser(response.data)
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
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
      };

      const handleClose = () => {
        setOpen(false);
      };

      const handleChange = (e) => {
          setPassword(e.target.value)
      }

      const selectChange = (e) => {
        if(e.target.value=='secName'){
            setSearch({...search,type:e.target.value, title:'보안약점명으'})
            setSearched(list.filter((l) => {return l.secName.indexOf(search.content) !== -1}))
        }
        else if(e.target.value=='languageType'){
            setSearch({...search,type:e.target.value, title:'언어'})
            setSearched(list.filter((l) => {return l.languageType.indexOf(search.content) !== -1}))
        }
    }

    const handleChangeSearch = (e) => {
        if(search.type=='secName')
        setSearched(list.filter((l) => {return l.secName.indexOf(e.target.value) !== -1}))
        else
        setSearched(list.filter((l) => {return l.languageType.indexOf(e.target.value) !== -1}))

        setSearch({...search,content:e.target.value})
      }

    const handleclear = ()=>{
        setSearch({...search,content:''})
      }

      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleCheck = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const url = `http://${process.IP}:10000/users/auth`;

        axios.post(url,{
            userId: JSON.parse(localStorage.getItem('uid')),
            password: password
        },{
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(response=>{
                if(response.data==1){
                    setError(true)
                    props.history.push('/student/edit')
                }
                else if(response.data==0){
                    setError(true)
                    alert('비밀번호가 틀립니다.')
                }
             })
        .catch(error=>{/*console.log('에러',error)*/})
      }

      useEffect(()=>{
          const token = JSON.parse(localStorage.getItem('token'));
          const userid = JSON.parse(localStorage.getItem('uid'));
          const url=`http://${process.IP}:10000/users/list/${userid}`
          axios.get(url,{
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          .then(response=> {
            //console.log(response.data)
       setList(response.data)
       setSearched(response.data)
    })
          .catch(error=>{
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
      },[])

    return(
        <div>
        <Container >
        <div className="container-profile">
            <div className="svg-background"></div>
            <div className="svg-background2"></div>
            <div className="circle"></div>
            <img className="profile-img" src="data:image/png;base64,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"/>
            <img className="menu-icon" src='/images/edit.png' onClick={handleClickOpen}/> 
            <div className="text-container">
            <p className="title-text">{user.name}</p>
            <p className="info-text">{user.regDate}</p>
            <p className="desc-text">{user.email}</p>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">회원정보 수정</DialogTitle>
        <DialogContent>
          {user.isOauth === 0?
          <DialogContentText>
            회원정보를 수정하기 위해서 비밀번호를 한번 더 입력해 주세요.
          </DialogContentText>:<DialogContentText>
            타사 계정으로 로그인하면 회원정보를 수정할 수 없습니다.
          </DialogContentText>}
          {user.isOauth === 0?
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="password"
            type='password'
            value = {password}
            onChange = {handleChange}
            error = {error? true: false}
            fullWidth
          />:null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {user.isOauth === 0?
          <Button onClick={handleCheck} color="primary">
            Confirm
          </Button>: null}
        </DialogActions>
      </Dialog>
        </div>
        <div className="container2">
          <div className="row-wrap" style={{marginBottom:'9px'}}>
            <div className="card-profile" style={{float:'left', borderLeft:'5px solid #4e72df'}}>
            <div className="card-text-container">
              <p className="card-title" style={{color:'#4e72df'}}>통계1</p>
              <p className="card-content">통계1</p>
            </div>
            <AirplayIcon fontSize="large" className="card-icon"/>
            </div>

            <div className="card-profile" style={{float:'right', borderLeft:'5px solid #1cc889'}}>
            <div className="card-text-container">
              <p className="card-title" style={{color:'#1cc889'}}>통계2</p>
              <p className="card-content">통계2</p>
            </div>
            <AirplayIcon fontSize="large" className="card-icon"/>
            </div>

          </div>
          <div className="row-wrap">
            <div className="card-profile" style={{float:'left', borderLeft:'5px solid #36b8cc'}}>
            <div className="card-text-container">
              <p className="card-title" style={{color:'#36b8cc'}}>통계3</p>
              <p className="card-content">통계3</p>
            </div>
            <AirplayIcon fontSize="large" className="card-icon"/>
            </div>

            <div className="card-profile" style={{float:'right', borderLeft:'5px solid #f7c649'}}>
            <div className="card-text-container">
              <p className="card-title" style={{color:'#f7c649'}}>통계4</p>
              <p className="card-content">통계4</p>
            </div>
            <AirplayIcon fontSize="large" className="card-icon"/>
            </div>

          </div>
        </div>

        <div style={{marginBottom: '1vh', float:'right'}}>
            <FormControl className={classes.margin}>
            <Select
            native
          id="select"
          value={search.type}
          onChange={selectChange}
          input={<BootstrapInput/>}
        >
          <option value="secName">보안약점명</option>
          <option value="languageType">언어</option>
            </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <BootstrapInput 
                id="demo-customized-textbox"
                placeholder={`${search.title}로 검색하기`}
                name="content"
                value={search.content}
                onChange={handleChangeSearch}
                />
            </FormControl>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="customized table">
            <TableHead rowCount={searchedData.length}>
              <TableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell align="center">언어타입</StyledTableCell>
                <StyledTableCell align="center">보안약점명</StyledTableCell>
                <StyledTableCell align="center">문제번호</StyledTableCell>
                <StyledTableCell align="center">1단계 시도횟수</StyledTableCell>
                <StyledTableCell align="center">1단계 푼날짜</StyledTableCell>
                <StyledTableCell align="center">2단계 시도횟수</StyledTableCell>
                <StyledTableCell align="center">2단계 푼날짜</StyledTableCell>
              </TableRow>
            </TableHead>
            {searchedData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row,index) => (
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell align="center">{row.languageType}</TableCell>
                    <TableCell align="center">{row.secName}</TableCell>
                    <TableCell align="center">{`문제${row.solvedId}`}</TableCell>
                    <TableCell align="center">{row.tryNumFirst}</TableCell>
                    <TableCell align="center">{row.solvedDateFirst!= null ? row.solvedDateFirst.substring(0,10) : "아직 풀지 않았습니다."}</TableCell>
                    <TableCell align="center">{row.tryNumSecond}</TableCell>
                    <TableCell align="center">{row.solvedDateSecond!=null ? row.solvedDateSecond.substring(0,10) : "아직 풀지 않았습니다."}</TableCell>
                </TableRow>
            ))}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </Container>
        </div>
    )
}