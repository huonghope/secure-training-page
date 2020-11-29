import {createContext} from 'react';

const AuthContext = createContext({
    auth: false,
    type: '',
    onLogin : () => {},
    onLogout : ()=> {},
})

export default AuthContext;