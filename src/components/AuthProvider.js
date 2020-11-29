import React, { useState } from 'react';
import AuthContext from '../context/Auth.context.js';
import axios from 'axios';

var process = require('../myProcess.json');




//사용하고자 하는 컴포넌트 최상위에 지정할 Provider컴포넌트
const AuthProvider = ({ children }) => {
    const onLogin = () => {
        //console.log('onLogin실행');
        // setAuth(prevState => {
        //     console.log(prevState)
        //     return{
        //         ...prevState,
        //         auth:true,
        //         type:user
        //     }
        const token = JSON.parse(localStorage.getItem('token'));
        const url = `http://${process.IP}:10000/token/con`;
        axios.get(url, {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                //console.log("provier에서",response.data)
                setAuth({ ...auth, aut: true, type: response.data })

            })
            .catch(error => {
                if (error.response != undefined) {
                    if (error.response.status == 401) {
                        alert('세션이 유효하지 않습니다! 로그아웃됩니다.')
                        auth.onLogout();
                        window.location.href = '/student';
                    }
                    else if (error.response.status == 403) {
                        alert('세션이 만료되었습니다. 다시 로그인해주세요 :)')
                        auth.onLogout();
                        window.location.href = '/student';
                    }
                }
            })

    }

    const onLogout = () => {
        setAuth(prevState => {
            return {
                ...prevState,
                auth: false,
                type: -1
            }
        })
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        localStorage.removeItem('user');
        localStorage.removeItem('type');
    }
    const info = document.location.href.split("/");
    const myType = localStorage.getItem('type')
    console.log(myType)
    if (localStorage.getItem('token') === null) {
        var initialState = {
            aut: false,
            type: -1,
            onLogin,
            onLogout,
        }
    }
    else {
        if (info[3] === "student") {
            if (myType === "student") {
                var initialState = {
                    aut: true,
                    type: 1,
                    onLogin,
                    onLogout,
                }
            }
            else {
                alert('접근 권한이 없습니다. 다시 로그인해주세요 :)');
                localStorage.removeItem('token');
                localStorage.removeItem('uid');
                localStorage.removeItem('user');
                localStorage.removeItem('type');
            }
        }
        else if (info[3] === "submitter") {
            if (myType === "submitter") {
                var initialState = {
                    aut: true,
                    type: 2,
                    onLogin,
                    onLogout,
                }
            }
            else {
                alert('접근 권한이 없습니다. 다시 로그인해주세요 :)');
                localStorage.removeItem('token');
                localStorage.removeItem('uid');
                localStorage.removeItem('type');
            }
        }
        else if (info[3] === "admin") {
            if (myType === "admin") {
                var initialState = {
                    aut: true,
                    type: 0,
                    onLogin,
                    onLogout,
                }
            }
            else {
                alert('접근 권한이 없습니다. 다시 로그인해주세요 :)');
                localStorage.removeItem('token');
                localStorage.removeItem('uid');
                localStorage.removeItem('type');
            }
        }
        else {
            var initialState = {
                aut: false,
                type: -1,
                onLogin,
                onLogout,
            }
        }
    }

    const [auth, setAuth] = useState(initialState);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;