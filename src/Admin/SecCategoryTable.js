import React, {useEffect, useContext} from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AuthContext from '../context/Auth.context.js';

var process = require('../myProcess.json');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SecCategoryTable() {
  const auth = useContext(AuthContext)
  const classes = useStyles();
  const [categories,setCategories]=React.useState([])
  const [item,setItem]=React.useState({
    id:'',
    name:'',
  });
  const [open,setOpen]=React.useState(false);

  const handleOpen = (e) => {
    setOpen(true) 
    // console.log(e.currentTarget.value)
    // console.log(e.currentTarget.name)
    // setItem(languages[e.currentTarget.valus].languageType)
    setItem({...item,id:e.currentTarget.value, name:e.currentTarget.name})
  }
  const handleClose = (e) => {setOpen(false)}

  const handleDelete = () => {
    console.log(item.id)
    const token = JSON.parse(localStorage.getItem('token'));
    const url = `http://${process.IP}:10000/admin/sv/${item.id}`;

    axios.delete(url,{
      headers:{"Authorization": `Bearer ${token}`}
    })
    .then(response => {
        alert('삭제가 완료되었습니다.')
        window.location.reload()
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
  }

  
useEffect(() => {
  const token = JSON.parse(localStorage.getItem('token'));
  const url = `http://${process.IP}:10000/admin/sv`;
  //소분류 받아오기
  axios.get(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
    console.log(response.data)
      setCategories(response.data);
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
},[])

  return (
    
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="simple table">
        <TableHead>
          <TableRow  style={{backgroundColor:'#607d8b', }}>
            <TableCell style={{color:'white', fontWeight:'bold'}}>CategoryName</TableCell>
            <TableCell style={{color:'white', fontWeight:'bold'}}>CategoryType</TableCell>
            <TableCell style={{color:'white', fontWeight:'bold'}} align="left">date</TableCell>
            <TableCell style={{color:'white', fontWeight:'bold'}} align="center">delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((row,i) => (
            <TableRow key={row.scId}>
              <TableCell component="th" scope="row">
                {row.secName}
              </TableCell>
              <TableCell>{row.scategoryName}</TableCell>
              <TableCell align="left">{row.secRegDate}</TableCell>
              <TableCell align="center">
                <IconButton value={row.secId} name={row.secName} edge="end" aria-label="delete" style={{ color: '#607d8b' }} onClick={handleOpen}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
           <Dialog
            open={open}
            keepMounted
            onClose={handleClose}
          >
            <DialogTitle id="alert-dialog-slide-title" style={{ color: 'red' }}>{"경고! 삭제후 되돌릴 수 없습니다."}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {`${item.name}을(를) 삭제하시겠습니까?`}
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
        </TableBody>
      </Table>
    </TableContainer>
  );
}