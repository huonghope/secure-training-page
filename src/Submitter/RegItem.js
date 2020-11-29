import React, {useEffect, useContext} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import {withStyles, makeStyles, withTheme} from '@material-ui/core/styles';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {useHistory, useLocation} from 'react-router-dom';
import AuthContext from '../context/Auth.context.js'

var process = require('../myProcess.json');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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


const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 400,
    },
    content: {
        margin: 10
    }
}))

export default function RegItem(props){
  // let history = useHistory();
  // let location = useLocation();
  // let { from1 } = location.state || { from: { pathname: `/submitter/detail/${props.registration.scodeId}` } };
  // let { from2 } = location.state || { from: { pathname: `/submitter/modify/${props.registration.scodeId}` } };

    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [state,setState]=React.useState()
    const [open, setOpen]=React.useState(false)

    const showApproval =()=>{
      if(props.registration.scodeApproval===0){
        return (
        <StyledTableCell align="center" style={{fontWeight:'bold', color:'black'}}>심사중</StyledTableCell>
        )
      }
        else if(props.registration.scodeApproval===1){
          return (
        <StyledTableCell align="center" style={{fontWeight:'bold', color:'green'}}>승인</StyledTableCell>
          )
        }
        else {
          return (
        <StyledTableCell align="center" style={{fontWeight:'bold', color:'red'}}>거절</StyledTableCell>
          )
        }
    }

    const handleDelete = (e) => {
      const token = JSON.parse(localStorage.getItem('token'));
      const url = `http://${process.IP}:10000/trainer/sb/${e.currentTarget.value}`
      console.log(e.currentTarget.value)
      axios.delete(url,{
        headers: {"Authorization" : `Bearer ${token}`}
      })
      .then(response=>{
        console.log(response)
        if(response.data == " Delete Fail "){
          alert(`${e.currentTarget.value}문제를 삭제하는데 실패하였습니다.`)
        }
        else{
          setOpen(false);
          window.location.reload()
        }
       
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

    const handleOpen = ()=>{
      setOpen(true);
    }
    const handleClose = ()=>{
      setOpen(false);
    }
    const handleModify = () => {
      window.location.href=`/submitter/modify/${props.registration.scodeId}`
      // props.history.push(`/submitter/modify/${props.registration.scodeId}`)
      // history.replace(from2)
    }
    const handleClick = () => {
      // console.log(props.registration.scodeId)
      window.location.href = `/submitter/detail/${props.registration.scodeId}`
      //props.history.push(`/submitter/detail/${props.registration.scodeId}`)
    }

    return(
            <StyledTableRow key={props.registration.no}>
                  <StyledTableCell component="th" scope="row">{props.no+1}</StyledTableCell>
                  <StyledTableCell align="center">{props.registration.languageType}</StyledTableCell>
                  <StyledTableCell align="center" onClick={handleClick} style={{cursor:'pointer'}}>{props.registration.scategoryName}</StyledTableCell>
                  <StyledTableCell align="center">{props.date}</StyledTableCell>
                  {/* <StyledTableCell align="center" style={{fontWeight:'bold', color:`${approval.color}`}}>{props.registration.scodeApproval}</StyledTableCell> */}
                  {showApproval()}
                  <StyledTableCell align="center">
                  {props.registration.scodeApproval===0?
                    <ColorButton id ="modifyItem" value={props.registration.scodeId} onClick={handleModify}
                        variant="contained" color="primary">
                        수정하기</ColorButton> :
                    <ColorButton id ="modifyItem" value={props.registration.scodeId}
                        variant="contained" color="primary" disabled>
                        수정하기</ColorButton>}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                  <ColorButton2 id ="deleteItem" value={props.registration.scodeId} onClick={handleOpen}
                //   style={{backgroundColor:'#a80000', color:'white'}}
                variant="contained" color="secondary"
                  >삭제하기</ColorButton2>
                  <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                  >
                  <DialogTitle id="alert-dialog-slide-title" style={{color:'red'}}>{"경고"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                      {`(${props.no+1}번)${props.registration.scategoryName}문제를 삭제하시겠습니까?`}
                    </DialogContentText>
                  </DialogContent>
                   <DialogActions>
                      <Button onClick={handleDelete} value={props.registration.scodeId} variant="contained" color="primary">
                        예
                      </Button>
                      <Button onClick={handleClose} variant="outlined" color="primary">
                        취소
                      </Button>
                    </DialogActions>
                  </Dialog>
                  </StyledTableCell>
            </StyledTableRow>
    )
}