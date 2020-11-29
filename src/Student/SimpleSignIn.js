import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
      },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SimpleSignin(){
    const classes = useStyles();
    const history = useHistory();

    return(
        <Container maxWidth="xs" style={{backgroundColor: 'white'}}>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SNS 계정으로 로그인하기
        </Typography>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {history.goBack()}}
        >
            SCTS 계정으로 로그인하기
        </Button>
        </div>
        </Container>
    )
}