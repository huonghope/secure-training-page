import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Grid from '@material-ui/core/Grid';
import moment from 'moment'

import nodejs from './images/nodejs.png'
import spring from './images/spring.png'
import django from './images/django.png'
import { BugReport, BugReportOutlined, Delete, LibraryBooks } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';
import axios from 'axios';
import Alert from '../../../../components/Alert';
var process = require('../../../../../myProcess.json');

const useStyles = makeStyles((theme) => ({
    root: {
        width: 270,
        height: 255,
        textAlign: 'center',
        position: 'relative',
        '&:hover': {
            backgroundColor: '#dbdbdb',
        }
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paper2: {
        textAlign: 'right',
        position: 'relative',
        // bottom: '-10px', right: '-10px'
    },
    projectImage: {
        width: '130px',
        height: '80px'
    }
}));

function getURLImageProject(type){
    var result;
    switch (type) {
        case "nodejs":
            result = nodejs
            break;
        case "javaspring":
            result = spring
            break;
        case "python":
            result = django
            break;
    }
    return result;
}

export default function ProjectContainer(props) {
    const classes = useStyles();
    // const { project } = props;
    const [project, setProject] = useState(props.project)
    const text = () => {
        const txt = project.projectName;
        const projectype = project.projectType;
        const imgage = getURLImageProject(projectype);
        return (
            <>
                <Typography variant="h6">
                    {txt}
                </Typography>
                <img src= {imgage} className= {classes.projectImage}/>
            </>
        )
    }

    const handleClickViewProject = (projectPath, projectId) => {
        const { container } = props;
        
        //컨테이서 중지되어 있을때 시작하는지 확인
        if(!container.state){
            Alert({
                title: "기존 컨테이너는 종료되고 새로 시작되시 겠습니까?",
                handleClickAccept: () => { //accept
                    const token = JSON.parse(localStorage.getItem('token'))
                    const userId = JSON.parse(localStorage.getItem('uid'));
                    const url = `http://${process.IP}:10000/users/start-container/${userId}`;
                    axios.get(url, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        const { data } = response
                        // props.handleContainerState();
                        if(data === 'success'){
                            props.handleContainerState();
                        }else{
                            alert("컨테이너 재시작 오류 발생하니 다시 시도 해주세요")
                        }
                        
                    })
                    .catch(error => {
                        alert("컨테이너 재시작 오류 발생하니 다시 시도 해주세요")
                        console.log(error)
                    })
                
                },
                handleClickReject: () => {} //reject 
            })
        }else{
            //현재 컨테이너내에서 실행하는 프로젝트 같음
            if(container.projectId === projectId){
                const token = JSON.parse(localStorage.getItem('token'))
                const userId = JSON.parse(localStorage.getItem('uid'));
                const url = `http://${process.IP}:10000/users/move-editor/${userId}/${projectId}`;
                axios.get(url, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                .then(response => {
                    const { data } = response;
                    if(data !== null){
                        window.open(
                            `http://${process.IP}:${data.vscodePort}/?folder=/home/coder/projects/${projectPath}`,
                            '_blank'
                        );
                    }else{
                        alert("에디터 서버 접근 실패합니다. 다시 확인해주세요")
                    }
                })
                    .catch(error => {
                    console.log(error)
                })
            }else{
                
                //현재 컨테이너 내에 실행하는 프로젝트과 다른 경우
                Alert({
                    title: `기존 컨테이너는 종료되고 새로 시작되시 겠습니까?`,
                    handleClickAccept: () => { //accept
                        const token = JSON.parse(localStorage.getItem('token'))
                        const userId = JSON.parse(localStorage.getItem('uid'));
                        const url = `http://${process.IP}:10000/users/move-editor/${userId}/${projectId}`;
                        axios.get(url, {
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }
                        })
                        .then(response => {
                            const { data } = response;
                            if(data !== null){
                                props.handleUpdateContainer(data.projectId);
                                window.open(
                                    `http://${process.IP}:${data.vscodePort}/?folder=/home/coder/projects/${projectPath}`,
                                    '_blank'
                                );
                            }else{
                                alert("에디터 서버 접근 실패합니다. 다시 확인해주세요")
                            }
                            
                        })
                            .catch(error => {
                            console.log(error)
                        })
                    
                    },
                    handleClickReject: () => {} //reject 
                })
            }
        }
    }

    const handleDeleteProject = (projectId) => {
        const { container } = props;
        let titleDiag = "";
        if(container.projectId === projectId){
            titleDiag = "해당하는 프로젝트를 컨테이너 올리고 있는데 그래도 삭제하시 겠습니까?"
        }else{
            titleDiag = "프로젝트 삭제하시겠습니까?"
        }
        Alert({
            title: titleDiag,
            // content: `핵생이 남아있는 경우, 모도 퇴장됩니다.`,
            handleClickAccept: () => { //accept
                const token = JSON.parse(localStorage.getItem('token'))
                const userId = JSON.parse(localStorage.getItem('uid'));
                const url = `http://${process.IP}:10000/users/projects/${userId}/${projectId}`;
                axios.delete(url, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    })
                    .then(response => {
                        if(response.data === "success")
                            props.handleDeleteProject(projectId)
                    })
                    .catch(error => {
                        alert("프로젝트 삭제 실패합니다.")
                        console.log(error)
                    })
            },
            handleClickReject: () => {} //reject 
        })
    }
    return (
        <Card className={classes.root} style={{ cursor: 'pointer'}}>
            <div style={{textAlign: 'right'}}>
                <Tooltip title="프로젝트 삭제">
                    <IconButton aria-label="enter">
                        <Link><Delete onClick={() => handleDeleteProject(project.projectId)} style={{ float: 'right', color: '#2F96EB' }} /></Link>
                    </IconButton>
                </Tooltip>
            </div>
            <CardContent style={{padding: '0px'}}>
                {text()}
            </CardContent>
            <CardActions>
                <Grid container item xs={12} spacing={1}>
                    <Grid item xs={12}>
                        <div className={classes.paper}>
                            <Typography variant="button" display="block" style={{ color: '#2F96EB' }}>
                                {
                                    moment(project.projectCreated).format("L")
                                }
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.paper2}>
                            <Tooltip title="코드 에디터">
                                <IconButton aria-label="enter">
                                    <Link ><ExitToAppIcon onClick={() => handleClickViewProject(project.projectPath, project.projectId)}    style={{ float: 'right', color: '#2F96EB' }} /></Link>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="프로젝트 진단">
                                <IconButton aria-label="enter">
                                    <Link to = {`diagnosisreport?pid=${project.projectId}`} ><BugReportOutlined style={{ float: 'right', color: '#2F96EB' }} /></Link>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="진단 기록">
                                <IconButton aria-label="enter">
                                    <Link to = {`diagnosishistory?pid=${project.projectId}`} ><LibraryBooks  style={{ float: 'right', color: '#2F96EB' }} /></Link>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    );
}
