import React,{useEffect, useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import AuthContext from '../context/Auth.context.js';

var process = require('../myProcess.json');

const ColorTableRow = withStyles((theme) => ({
  root: {  
    backgroundColor:'white', 
  },
    selected: {color:'black', backgroundColor:'#ffebd4 !important'}
}))(TableRow);

const ColorButton = withStyles((theme) => ({
  root: {
    color: 'white',
    backgroundColor: "#F17300",
    '&:hover': {
      backgroundColor: "#ff9633",
    },
  },
}))(Button);

const ColorCheckbox = withStyles({
  root: {
    color: "#F17300",
    '&$checked': {
      color: "#F17300",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

//전체 유저리스트 페이지
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

export default function UserList(props){
    const classes = useStyles();
    const auth = useContext(AuthContext)

    const [open,setOpen]=React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [list, setList] = React.useState([])
    const [searchedData, setSearched]=React.useState([]);
    const [search,setSearch] = React.useState({
        selected:'name',
        title:'이름',
        content:''
    })

    const [selected, setSelected]=React.useState([])

      const selectChange = (e) => {
        if(e.target.value=='name'){
            setSearch({...search,selected:e.target.value, title:'이름'})
            setSearched(list.filter((l) => {return l.name.indexOf(search.content) !== -1}))
        }
        else if(e.target.value=='email'){
            setSearch({...search,selected:e.target.value, title:'이메일'})
            setSearched(list.filter((l) => {return l.email.indexOf(search.content) !== -1}))
        }
    }

    const handleChangeSearch = (e) => {
        if(search.selected=='name')
        setSearched(list.filter((l) => {return l.name.indexOf(e.target.value) !== -1}))
        else if(search.selected=='email')
        setSearched(list.filter((l) => {return l.email.indexOf(e.target.value) !== -1}))

        setSearch({...search,content:e.target.value})
      }

    const handleOpen = ()=>{
      if(selected.length > 0)
      setOpen(true)
    }
    const handleClose = () => {
      setOpen(false)
    }

    const handleDelete = (e) => {
      console.log(selected)
      const token = JSON.parse(localStorage.getItem('token'));
      const url = `http://${process.IP}:10000/admin/users/`
      //선택된 갯수만큼 delete 실행
      selected.map((s)=> {
        axios.delete(url+s, {
          headers: {"Authorization" : `Bearer ${token}`}
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
      })

      setSelected([]);
      window.location.reload();
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
          const newSelected = searchedData.map((s) => s.userId)
          setSelected(newSelected);
          return;
        }
        setSelected([]);
      }
      const isSelected = (id) => selected.indexOf(id) !== -1;

      useEffect(()=>{
          const token = JSON.parse(localStorage.getItem('token'))
          const url=`http://${process.IP}:10000/admin/users`
          axios.get(url, {
            headers:{"Authorization" : `Bearer ${token}`}
          })
          .then(response=> {
            // console.log(response.data)
          setList(response.data)
          setSearched(response.data)
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
      },[])

    return(
        <div>
        <Container style={{marginTop:'5vh'}}>
          <ColorButton variant="contained" color="secondary" onClick={handleOpen}>선택회원삭제</ColorButton>
          <Dialog
                    open={open}
                    // TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                  >
                  <DialogTitle id="alert-dialog-slide-title" style={{color:'red'}}>{"경고! 삭제후 되돌릴 수 없습니다."}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {/* {selected.map((s)=>{
                        return (<span>{s},</span>)
                      })} */}
                      {`(총${selected.length}명)회원을 삭제하시겠습니까?`}
                    </DialogContentText>
                  </DialogContent>
                   <DialogActions>
                      <Button onClick={handleClose} variant="contained" color="primary">
                        취소
                      </Button>
                      <Button onClick={handleDelete} variant="outlined" color="primary">
                        삭제
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
          <option value="name">이름</option>
          <option value="email">이메일</option>
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
                <StyledTableCell width="5vw">No.</StyledTableCell>
                <StyledTableCell align="center">이메일</StyledTableCell>
                <StyledTableCell align="center">이름</StyledTableCell>
                <StyledTableCell align="center">사용자타입</StyledTableCell>
                <StyledTableCell align="center">가입날짜</StyledTableCell>
              </TableRow>
            </TableHead>
            {searchedData.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((row,index) => {
              const isItemSelected = isSelected(row.userId);
              return(
                <ColorTableRow key={index}
                  hover
                  onClick={(e)=> handleClick(e,row.userId)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.userId}
                  selected={isItemSelected}>
                    <TableCell padding="checkbox"><ColorCheckbox checked={isItemSelected}/></TableCell>
                    <TableCell >{page*rowsPerPage+index+1}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.type==0? '관리자' : row.type==1?'교육생':'출제자'}</TableCell>
                    <TableCell align="center">{row.regDate}</TableCell>
                </ColorTableRow>
            )})}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
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