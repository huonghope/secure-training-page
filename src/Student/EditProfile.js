import React, { useEffect, useContext } from 'react';
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
import '../Submitter/Submit.css';
import axios from 'axios';
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
        width: '60%'
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    Btn: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    hint: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
}));

export default function EditProfile() {
    const classes = useStyles();

    const [user, setUser] = React.useState({
        name: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))[0] || '',
        prev: '',
        compare: '',
    })

    const handleSubmit = (e) => {
        let ret = check();
        if (ret === 1) {
            alert('비밀번호가 다릅니다!')
            setUser({ ...user, prev: '', compare: '' })
        }
        else if (ret === 2) alert('내용을 입력해주세요!')
        else if (ret === 3) alert('비밀번호는 숫자와 영문자포함 8자이상이어야 합니다.')
        else {
            const token = JSON.parse(localStorage.getItem('token'))
            const url = `http://${process.IP}:10000/users`;
            const userid = JSON.parse(localStorage.getItem('uid'));

            axios.put(url, {
                userId: userid,
                name: user.name,
                password: user.prev
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => {
                    // console.log(response.data)
                    localStorage.setItem('user', JSON.stringify([response.data.name, JSON.parse(localStorage.getItem('user'))[1]]))
                    alert('프로필이 수정되었습니다.')
                    window.location.href = '/student/mypage'
                })
                .catch(error => {
                    if (error) {
                        alert('수정하는데 실패하였습니다.')
                        window.location.href = "/student/mypage"
                    }
                })
        }
    }

    const isPwd = pass => {
        const pwdRegex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;

        return pwdRegex.test(pass);
    }

    const check = () => {
        if (user.prev !== user.compare) {
            return 1;
        }
        else if (user.prev == "" || user.name == "") {
            return 2;
        }
        else {
            let valid = isPwd(user.prev);
            if (!valid) return 3;
            else return 0;
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ padding: "5vh" }}>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '1vh' }}>
                        회원정보 수정
          </Typography>
                    <div className="row-wrapper">
                        <label htmlFor="lineNum">이메일</label>
                        <TextField
                            className={classes.hint}
                            required
                            fullWidth
                            id="email"
                            label="email"
                            variant="outlined"
                            value={localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))[1] || ''}
                            maxLength="32"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row-wrapper">
                        <label htmlFor="lineNum">이름</label>
                        {/* <FormControl required variant="outlined" className={classes.formControl}> */}
                        <TextField
                            className={classes.hint}
                            required
                            fullWidth
                            id="name"
                            label="name"
                            variant="outlined"
                            name="name"
                            value={user.name}
                            maxLength="32"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="row-wrapper">
                        <label htmlFor="lineNum">비밀번호</label>
                        {/* <FormControl required variant="outlined" className={classes.formControl}> */}
                        <TextField
                            className={classes.hint}
                            required
                            fullWidth
                            id="password"
                            type="password"
                            label="password"
                            variant="outlined"
                            name="prev"
                            value={user.prev}
                            maxLength="256"
                            onChange={handleChange}
                        />
                        {/* </FormControl> */}
                    </div>
                    <div className="row-wrapper">
                        <label htmlFor="lineNum">비밀번호 확인</label>
                        {/* <FormControl required variant="outlined" className={classes.formControl}> */}
                        <TextField
                            className={classes.hint}
                            required
                            fullWidth
                            id="password2"
                            type="password"
                            label="password"
                            variant="outlined"
                            name="compare"
                            value={user.compare}
                            maxLength="256"
                            onChange={handleChange}
                        />
                        {/* </FormControl> */}
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