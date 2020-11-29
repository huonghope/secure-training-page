import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2px',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
      },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    }
}));

export default function OauthLogin() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        email: '',
        password: '',
        name: ''
    })

    return (
        <Container maxWidth="xs" style={{backgroundColor: 'white'}}>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SNS 계정을 이용한 로그인
        </Typography>
        
        <form className={classes.form} onSubmit={handleSubmit}>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
            >
                SCTS Login
          </Button>
        </form>
        </div>
        </Container>
    )
}
