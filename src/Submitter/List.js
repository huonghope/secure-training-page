import React, {useEffect, useContext} from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import axios from 'axios';
import RegItem from './RegItem.js';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import AuthContext from '../context/Auth.context.js'

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

export default function List(){
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [search,setSearch]=React.useState();
    const [searchedData, setSearched]=React.useState([
    //   {
    //   scodeId: 'asdf123124',
    //   secId: '01-001',
    //   languageId: '12312klsdkfsd',
    //   scodeApproval: 0,
    //   scodeRegDate: '2020-07-10',
    //   languageType: 'c',
    //   secName: 'SQL Injection',
    //   scategoryName: '입력 데이터 검증 및 표현'
    // },
    // {
    //   scodeId: 'asdf123124',
    //   secId: '01-001',
    //   languageId: '12312klsdkfsd',
    //   scodeApproval: 0,
    //   scodeRegDate: '2020-07-10',
    //   languageType: 'c',
    //   secName: 'SQL Injection',
    //   scategoryName: '입력 데이터 검증 및 표현'
    // },
    // {
    //   scodeId: 'asdf123124',
    //   secId: '01-001',
    //   languageId: '12312klsdkfsd',
    //   scodeApproval: 1,
    //   scodeRegDate: '2020-07-10',
    //   languageType: 'c',
    //   secName: 'SQL Injection',
    //   scategoryName: '입력 데이터 검증 및 표현'
    // }
  ]);
    const [regList, setRegList]=React.useState([
    //   {
    //   scodeId: 'asdf123124',
    //   secId: '01-001',
    //   languageId: '12312klsdkfsd',
    //   scodeApproval: 0,
    //   scodeRegDate: '2020-07-10',
    //   languageType: 'c',
    //   secName: 'SQL Injection',
    //   scategoryName: '입력 데이터 검증 및 표현'
    // },
    // {
    //   scodeId: 'asdf123124',
    //   secId: '01-001',
    //   languageId: '12312klsdkfsd',
    //   scodeApproval: 0,
    //   scodeRegDate: '2020-07-10',
    //   languageType: 'c',
    //   secName: 'SQL Injection',
    //   scategoryName: '입력 데이터 검증 및 표현'
    // },
    // {
    //   scodeId: 'asdf123124',
    //   secId: '01-001',
    //   languageId: '12312klsdkfsd',
    //   scodeApproval: 1,
    //   scodeRegDate: '2020-07-10',
    //   languageType: 'c',
    //   secName: 'SQL Injection',
    //   scategoryName: '입력 데이터 검증 및 표현'
    // }
  ]);

    const handleChangeSearch = (e) => {
      setSearched(regList.filter((reg) => {return reg.scategoryName.indexOf(e.target.value) !== -1}))
      setSearch(e.target.value)
    }

    const handleclear = ()=>{
      setSearch("")
      setSearched(regList);
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    useEffect(()=>{
      const token = JSON.parse(localStorage.getItem('token'));
      const userid = JSON.parse(localStorage.getItem('uid'));
      const url = `http://${process.IP}:10000/trainer/sb/list/${userid}`;
      axios.get(url,{
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(response => {
        // console.log(response.data)
        setRegList(response.data);
         setSearched(response.data);
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
    },[])

    return(
        <div>
      <Container>
        {/* <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          문제 등록 리스트
        </Typography> */}
        <Paper component="form" style={{ position: "relative", minWidth: "300", float: "right" , marginTop:'5vh', marginBottom:'3vh'}} className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="보안약점명 검색"
            inputProps={{ 'aria-label': '보안약점 검색' }}
            name="search"
            value={search}
            onChange={handleChangeSearch}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <IconButton variant="contained" style={{color:'black'}} aria-label="clear" onClick={handleclear}>
            <ClearIcon />
          </IconButton>
        </Paper>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead rowCount={searchedData.length}>
              <TableRow>
                <StyledTableCell>No.</StyledTableCell>
                <StyledTableCell align="center">언어타입</StyledTableCell>
                <StyledTableCell align="center">보안약점명</StyledTableCell>
                <StyledTableCell align="center">등록날짜</StyledTableCell>
                <StyledTableCell align="center">승인여부</StyledTableCell>
                <StyledTableCell align="center">수정하기</StyledTableCell>
                <StyledTableCell align="center">삭제하기</StyledTableCell>
              </TableRow>
            </TableHead>
            {searchedData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row,index) => {
               return(
                <RegItem registration={row} no={index} key={index} date={row.scodeRegDate.substring(0,10)}/>
              )
            })}
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