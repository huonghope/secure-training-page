import React,{useContext, useEffect} from 'react';
import AuthContext from './context/Auth.context.js';

export default function NoAccess(props) {
  const auth = useContext(AuthContext);
  const [time,setTime]=React.useState(10);
    useEffect(()=>{
        const timer = setInterval(()=>{
            setTime(prevTime => prevTime-1)
        },1000)
        return(
            time<= 1 && clearInterval(timer)
        )
    },[])

    const move = setTimeout(()=> {
        const type = auth.type;
        // console.log(type)
        auth.onLogout();
        if(type==0)window.location.href='/admin'
        else if(type==1)window.location.href='/student'
        else if(type==2)window.location.href='/submitter'
        else window.location.href='/'
        }
        ,10000)

    return(
        <div style={{marginTop:'3vh', marginLeft:'3vh'}}>
            접근권한이 없습니다!<br/>
            {time}초 후 로그아웃 후 이전페이지로 돌아갑니다. {() => move}
        </div>
    )
    
}