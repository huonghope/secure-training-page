import React from 'react';
import './Training.css';

export default function SelectTraining(props){
    const handlefirstClick = () => {
        props.history.push('/student/securelist')
        // window.location.href='/student/securelist';
    }

    const handlesecondClick = () => {
     //props.history.push('/admin')
        props.history.push('/student/codediagnosis')
        // window.open('http://59.6.55.253:18080/?folder=vscode-remote%3A%2F%2Flocalhost%3A8888%2Fusr%2Fsrc%2Fsecure_coding', 
		// 	'Openeg Secure Coding Traing System', 
		// 	'width=1200, height=800, toolbar=no, menubar=no, scrollbars=no, resizable=yes');
    }

    return (
        <section id="sec">
            <h2>Select Training type</h2>
            <h4>훈련 항목을 선택해 주세요.</h4>
            <ul>
                <li>
                    <div className="content" onClick={handlefirstClick}>
                    <div className="t-img"><img src="/images/glass.png" alt="find"/></div>
                    <h3>보안 약점 진단 훈련</h3>
                    <p>보안 약점에 대해 학습하고 보안 약점 진단 훈련을 진행할 수 있습니다. </p>
                    </div>
                </li>
                <li>
                    <div className="content" onClick={handlesecondClick}>
                    <div className="t-img"><img src="/images/greencheck.png" alt="check"/></div>
                    <h3>시큐어 코딩 개발 훈련</h3>
                    <p>시큐어 코딩 개발 훈련을 진행할 수 있습니다.</p>
                    </div>
                </li>
            </ul>
        </section>
    )
}
