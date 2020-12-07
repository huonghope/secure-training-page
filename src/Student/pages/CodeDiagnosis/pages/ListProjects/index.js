import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import ProjectContainer from '../../components/ProjectContainer';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './style.scss'


import SecureItem from '../../../../SecureItem';
import '../../../../Training.css';
import AuthContext from '../../../../../context/Auth.context'
import Loading from '../../../../components/Loading';
import { Button, Card, CardActions, CardContent, styled } from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import CreateProject from './CreateProject';
import styledComponents from 'styled-components'
var process = require('../../../../../myProcess.json');



function SecureList(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

SecureList.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '80vh',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    gridList: {
        // paddingLeft: '4%',
        // paddingBottom: '10%',
        // width: '80%',
        margin: '0px',
        height: `${window.innerHeight}`,
    },
    createProject: {
        width: 270,
        height: 255,
        textAlign: "center",
        // paddingBottom: "0 !important",
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: 20,
        '&:hover': {
            backgroundColor: '#dbdbdb',
        }
    }
}));

export default function ListProjects() {
    const classes = useStyles();
    const auth = useContext(AuthContext)
    const [value, setValue] = React.useState(0);
    const [projects, setProjects] = React.useState([]);

    const [container, setContainer] = React.useState({});


 
    const [loading, setLoading] = useState(true)
    const [modalCreateProject, setModalCreateProject] = useState(false);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('uid'));
        const url = `http://${process.IP}:10000/users/projects/${userId}`;
        setTimeout(() => {
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                const { data } = response;
                if(data.length === 1){
                    //컴테이너 정보를 가져오기 없을때 만들어줌
                    const url = `http://${process.IP}:10000/users/container/${userId}`;
                    axios.get(url, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(response => {
                        const { data } = response;
                        if(!data){
                            alert("컨테이너 생성 과정에 오류 발생하니 나중에 다시 시도해주세요.")
                        }else
                            setContainer(data);
                    }).catch(error => console.log(error))
                }
                setLoading(!loading)
                setProjects(data)
            })
            .catch(error => console.log(error))
        }, 300);
    }, [])

    useEffect(() => {
        if(projects.length !== 0){
            // alert("aa")
            //컴테이너 정보를 가져오기 없을때 만들어줌
            const token = JSON.parse(localStorage.getItem('token'));
            const userId = JSON.parse(localStorage.getItem('uid'));
            const url = `http://${process.IP}:10000/users/container/${userId}`;
            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                const { data } = response;
                console.log(data)
                if(!data){
                    alert("컨테이너 생성 과정에 오류 발생하니 나중에 다시 시도해주세요.")
                }else{
                    setContainer(data);
                }
            }).catch(error => console.log(error))
        }
    },[projects.length])




    const closeModal = () => {
        setModalCreateProject(!modalCreateProject)
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('uid'));
        const url = `http://${process.IP}:10000/users/projects/${userId}`;
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const { data } = response;
            setProjects(data)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }
    const handleDeleteProject =  (projectId) => {
        setLoading(true)
        const filterProject = projects.filter(element => element.projectId !== projectId)
        setProjects(filterProject)
        setLoading(false)
    }
    const handleMoveWebService = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('uid'));
        const url = `http://${process.IP}:10000/users/webservice/${userId}`;
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const { data } = response;
            if(data !== "fail"){
                window.open(
                    `http://${process.IP}:${data}`,
                    '_blank'
                );
            }else{
                alert("페이지 접근 오류 발생했습니다. 서버를 정상적으로 올리는지 확인하세요. ")
            }
            
        })
        .catch(error => console.log(error))
    }
    const handleSleepContainer = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('uid'));
        const url = `http://${process.IP}:10000/users/stop-container/${userId}`;
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const { data } = response;
            if(data === "success"){
                setContainer({...container, state : !container.state})
            }
        })
        .catch(error => console.log(error))
    }

    const handleContainerState = () =>{
        setContainer({...container, state : !container.state})
    }
    const handleUpdateContainer = (projectId) => {
        const project = projects.filter(project => project.projectId === projectId)[0]
        setContainer({...container, projectId : project.projectId})
    }

    if(loading){
        return (<Loading type="spinningBubbles" color="#2F96EB"/>)
    }
    const filterProject = projects.filter(project => project.projectId === container.projectId)
    return (
        <div className="list-projects">
            {
                (projects.length !== 0 && filterProject.length !== 0) &&
                <div className="container-task">
                    <p className="container-info">
                    {
                        container.state ? 
                        <>
                            &#8226; 현재 실행 중인 컨테이너: {
                                filterProject[0].projectName
                            } (컨테이너 Id: <span>{container.containerId}</span>)
                        </> :
                        <>
                            &#8226; 현재 컨테이너 중지된 상태 입니다.
                        </>
                    }
                    </p>
                    <div className="list-projects__tasks">
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="btn"
                        onClick={() => handleMoveWebService()}
                        disabled={!container.state ? true : false}
                    >웹 서비스 이동</Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="btn"
                        // className={classes.submit}
                        onClick={() => handleSleepContainer(!modalCreateProject)}
                        disabled={!container.state ? true : false}
                    >컨테이너 중지</Button>
                    </div>
                </div>
            }
            <div className="list-projects__container">
                <div className="list-projects__container--content">
                    <div className="list-projects__container--createproject" onClick={() => setModalCreateProject(!modalCreateProject)}>
                        <Card className ={classes.createProject} style={{ cursor: 'pointer'}} onClick={() => setModalCreateProject(!modalCreateProject)}>
                            <CardContent fontSize="20px">
                                <CreateNewFolderIcon />
                                <p>프로젝트 생성</p>
                            </CardContent>
                        </Card>
                    </div>
                    {
                        projects.length !== 0 &&
                            projects.map(project => (
                                <ProjectContainer
                                        container={container}
                                        handleContainerState={handleContainerState}
                                        handleUpdateContainer={handleUpdateContainer}
                                        project = {project}
                                        openModal={() => this.setModal(true)}
                                        handleDeleteProject={handleDeleteProject}
                                    />
                                )) 
                    }
                </div>
            </div>
            {
                modalCreateProject && 
                <CreateProject 
                    closeModal = {closeModal}
                />
            }
        </div>
    );
}

