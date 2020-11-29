import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


var process = require('../myProcess.json');

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));



//첫페이지나 마지막 페이지로 이동하는 버튼
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;


  
  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles({
  table: {
    minWidth: 300,
    backgroundColor: 'white',
  },
  check: {
    color: '#F17300',
  },
  list_name:{
    width:"30px",
    textOverflow: "ellipsis"
  }
});

export default function CodeTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsPerPage.length - page * rowsPerPage);

  useEffect(()=>{
    setPage(parseInt(props.problemNumber/rowsPerPage));
  },[])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size={'small'}aria-label="custom pagination table" >
        <TableBody >
          {(rowsPerPage > 0
            ? props.lists.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : props.lists
          ).map((row,i) => (
            <TableRow key={row.scodeId} style={{borderLeftWidth: 0, borderRightWidth:0,borderTop: 0,borderBottom:'1px solid black',  borderColor: 'black',borderStyle: 'solid'}} >
              <TableCell style={{height: "20px" }}component="th" scope="row">
                <Button value={[row.scodeId,i+1]} number={i+1+page*rowsPerPage}onClick={props.handleSelectProblem}>문제{i+1+page*rowsPerPage}</Button>
              </TableCell>
              <TableCell style={{maxWidth:"120px", whiteSpace: "nowrap", overflow: "hidden", textOverflow:'ellipsis'}}component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{height: "20px" }}component="th" scope="row">
                {row.scodeRegDate.substring(0,10)}
              </TableCell>

              <TableCell style={{height: "20px",width: 50 }} align="right">
                {row.solvedDateSecond != null? <CheckCircleIcon className={classes.check}/> : null}
                    
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[]}
              colSpan={4}
              count={props.lists.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}