import React,{useEffect, useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from '@material-ui/core/Button';
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
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import AuthContext from '../context/Auth.context';

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

const ColorButton3 = withStyles((theme) => ({
  root: {
    color: '#F17300',
    backgroundColor: "white",
    border: '1px solid #F17300',
    '&:hover': {
      backgroundColor: "#ffedd9",
    },
  },
}))(Button);

const ColorTableRow = withStyles((theme) => ({
  root: {
    backgroundColor:'white',
  },
    selected: {color:'black', backgroundColor:'#ffebd4 !important'}
}))(TableRow);

const ColorCheckbox = withStyles({
  root: {
    color: "#F17300",
    '&$checked': {
      color: "#F17300",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

//신규등록문제 리스트 페이지
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#757575',
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

export default function NewProblemList(props){
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [list, setList] = React.useState([])
    const [searchedData, setSearched]=React.useState([]);
    const [open,setOpen]=React.useState({
      approveOpen:false,
      rejectOpen:false
    })
    const [select,setSelect]=React.useState('')
    const [search,setSearch] = React.useState({
        selected:'name',
        title:'출제자이름',
        content:''
    })
    const [selected, setSelected]=React.useState([])

      const selectChange = (e) => {
        if(e.target.value=='name'){
            setSearch({...search,selected:e.target.value, title:'출제자이름'})
            setSearched(list.filter((l) => {return l.name.indexOf(search.content) !== -1}))
        }
        else if(e.target.value=='scategoryName'){
            setSearch({...search,selected:e.target.value, title:'보안약점명'})
            setSearched(list.filter((l) => {return l.scategoryName.indexOf(search.content) !== -1}))
        }
    }

    const handleChangeSearch = (e) => {
        if(search.selected=='name')
        setSearched(list.filter((l) => {return l.name.indexOf(e.target.value) !== -1}))
        else if(search.selected=='scategoryName')
        setSearched(list.filter((l) => {return l.scategoryName.indexOf(e.target.value) !== -1}))

        setSearch({...search,content:e.target.value})
      }

    const handleReject = (e) => {
      console.log(selected)
      console.log(select)
      if(select=="")alert("이유를 선택해주세요!")
      else{
      const token = JSON.parse(localStorage.getItem('token'));
      const url = `http://${process.IP}:10000/admin/list/nok`;
      //선택된 갯수만큼 delete 실행
      selected.map((s) => {
        let form = new FormData();
        form.append('scodeId',s);
        form.append('rejectReason',select);
        axios({
          method:'PUT',
          url:`${url}`,
          data:form,
       headers:{"Authorization" : `Bearer ${token}`}
        })
        .then(response => {
          console.log(response)
          if(response.data == 0){
            alert(`${s}문제를 거절하는데 실패하였습니다.`)
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
      })

      setSelected([]);
      window.location.reload();
      }
    }

  const handleApprove = (e) => {
    console.log(selected)
    const token = JSON.parse(localStorage.getItem('token'));
    const url = `http://${process.IP}:10000/admin/list/ok`;

    selected.map((s)=>{
      let form = new FormData();
      form.append('scodeId', s)

      axios({
        method: 'PUT',
        url: `${url}`,
        data: form,
     headers:{"Authorization" : `Bearer ${token}`}
      })
        .then(response => {
          console.log(response)
          if (response.data == 0) {
            alert(`${s}문제를 승인하는데 실패하였습니다.`)
          }
        })
        .catch(error => {
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
    })
    setSelected([]);
    window.location.reload();
  }

  const approveOpen = (e)=>{
    if(selected.length>0)
    setOpen({...open,approveOpen:true})
  }
  const approveClose = (e)=>{
    setOpen({...open,approveOpen:false})
  }
  const rejectOpen = (e)=>{
    if(selected.length>0)
    setOpen({...open,rejectOpen:true})
  }
  const rejectClose = (e)=>{
    setOpen({...open,rejectOpen:false})
  }

  const selectChange2 = (e)=>{
    setSelect(Number(e.target.value) || '')
  }


      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

      const handleClick = (e,id) => {
        // console.log(selected);

        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if(selectedIndex === -1){
          newSelected = newSelected.concat(selected, id);
        }else if(selectedIndex === 0){
          newSelected = newSelected.concat(selected.slice(1));
        }else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }

        setSelected(newSelected);
      }
      const onSelectAllClick = (e) => {
        if(e.target.checked){
          const newSelected = searchedData.map((s) => s.scodeId)
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      }
      const isSelected = (id) => selected.indexOf(id) !== -1;

      useEffect(()=>{
          const token = JSON.parse(localStorage.getItem('token'))
          const url=`http://${process.IP}:10000/admin/list/new`
          axios.get(url, {
            headers:{'Authorization' : `Bearer ${token}`}
          })
          .then(response=> {
            // console.log(response.data)
          setList(response.data)
          setSearched(response.data)
    })
          .catch(error=>console.log(error))
      },[])

    return(
        <div>
        <Container style={{marginTop:'5vh'}}>
          <ColorButton variant="contained" color="primary" onClick={approveOpen} style={{marginRight:"10px"}}>선택항목승인</ColorButton>
          <Dialog
        open={open.approveOpen}
        onClose={approveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{color:'green', fontWeight:'bold'}}>{"승인하기"}</DialogTitle>
        <DialogContent>
              <DialogContentText >
                {/* {selected.map((s) => {
                  return (<span>{s},</span>)
                })} */}
                {`(총${selected.length}개)문제를 일괄 승인하시겠습니까?`}
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
          <ColorButton2 variant="contained" color="secondary" onClick={rejectOpen}>선택항목거절</ColorButton2>
          <Dialog
        open={open.rejectOpen}
        onClose={rejectClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{color:'red', fontWeight:'bold'}}>{"거절하기"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {/* {selected.map((s) => {
                  return (<span>{s},</span>)
                })} */}
                {`(총${selected.length}개)문제를 일괄 거절하기위한 사유를 선택하여 주십시오.(각 문제에 대한 거절 사유를 다르게 하고싶으면 상세보기후 삭제를 눌러주십시오.)`}
          </DialogContentText>

            <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">이유</InputLabel>
              <Select
                native
                value={select}
                onChange={selectChange2}
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
          <Button onClick={rejectClose} color="primary" variant="contained">
            취소
          </Button>
          <Button onClick={handleReject} color="primary" variant="outlined" autoFocus>
            거절
          </Button>
        </DialogActions>
      </Dialog>
        <div style={{marginBottom: '1vh', float:'right'}}>
            <FormControl className={classes.margin}>
            <Select
            native
          id="select"
          value={search.selected}
          onChange={selectChange}
          input={<BootstrapInput/>}
        >
          <option value="name">출제자이름</option>
          <option value="scategoryName">보안약점명</option>
            </Select>
            </FormControl>
            <FormControl className={classes.margin}>
                <BootstrapInput
                id="demo-customized-textbox"
                placeholder={`${search.title}으로 검색하기`}
                name="content"
                value={search.content}
                onChange={handleChangeSearch}
                />
            </FormControl>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead rowCount={searchedData.length}>
              <TableRow>
                <StyledTableCell padding="checkbox">
                <ColorCheckbox
                indeterminate={selected.length > 0 && selected.length < searchedData.length}
                checked={searchedData.length > 0 && selected.length === searchedData.length}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all items' }}
              />
                </StyledTableCell>
                <StyledTableCell >No.</StyledTableCell>
                <StyledTableCell align="center">출제자이름</StyledTableCell>
                <StyledTableCell align="center">보안약점유형</StyledTableCell>
                <StyledTableCell align="center">보안약점명</StyledTableCell>
                <StyledTableCell align="center">언어타입</StyledTableCell>
                <StyledTableCell align="center">문제등록날짜</StyledTableCell>
                <StyledTableCell align="center">상세보기</StyledTableCell>
              </TableRow>
            </TableHead>
            {searchedData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row,index) => {
              const isItemSelected = isSelected(row.scodeId);
              return(
                <ColorTableRow key={index}
                  hover
                  // onClick={(e)=> handleClick(e,row.scodeId)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.scodeId}
                  selected={isItemSelected}>
                    <TableCell padding="checkbox" onClick={(e)=> handleClick(e,row.scodeId)}><ColorCheckbox checked={isItemSelected}/></TableCell>
                    <TableCell >{page*rowsPerPage+index+1}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.secName}</TableCell>
                    <TableCell align="center">{row.scategoryName}</TableCell>
                    <TableCell align="center">{row.languageType}</TableCell>
                    <TableCell align="center">{row.scodeRegDate}</TableCell>
                    <TableCell align="center"><ColorButton3 variant="outlined" color="secondary" onClick={()=> props.history.push({pathname:`/admin/problem/${row.scodeId}`, state:row.name})}>상세보기</ColorButton3></TableCell>
                </ColorTableRow>
            )})}
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