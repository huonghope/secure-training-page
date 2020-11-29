import { FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, FormLabel, RadioGroup, Radio, Button, Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './style.scss'
import { makeStyles } from "@material-ui/core/styles";
import styled from 'styled-components'
import axios from 'axios';
import Loading from '../../../../../components/Loading';
import CloseIcon from '@material-ui/icons/Close';
var process = require('../../../../../../myProcess.json');
const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function CreateProject(props) {
  const classes = useStyles();
  const [projectType, setProjectType] = React.useState("");
  const [projectName, setProjectName] = React.useState("");
  const [modalSpring, setModalSpring] = React.useState(false);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading)
    }, 300);
  }, [])

  const handleChange = (event) => {
    setProjectType(event.target.value);
    event.target.value === "javaspring" ? setModalSpring(true) : setModalSpring(false)
  };

  const handleSubmit = () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const userId = JSON.parse(localStorage.getItem('uid'));
    
    if(projectName.length >= 15 || !projectType){
      projectName.length >= 15 ? alert("프로젝트 길이 15길이 제한됩니다.") : alert("프로젝트 타입을 선택하세요.")
      return;
    }else{
        const url = `http://${process.IP}:10000/users/checkExistsProjectName/${projectName}`;
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
          if(response.data === "exists"){
            alert("이름 중복됩니다")
          }else{
            const url = `http://${process.IP}:10000/users/projects`;
              axios.post(url, {
                projectUserId: userId,
                projectName,
                projectType
              }, {
                headers: {
                  "Authorization": `Bearer ${token}`
                }
              })
                .then(response => {
                  console.log(response)
                  props.closeModal(false)
                  const { data } = response;
                })
                .catch(error => {
                  console.log(error)
                })
            }
        })
        .catch(error => console.log(error))
      }
  }


  const handleSubmitSpring = (data) => {
    const { selectProject, selectLanguage, selectBoot, inputGroup, inputDesc, inputPackageName } = data;

    const token = JSON.parse(localStorage.getItem('token'))
    const url = `http://${process.IP}:10000/users/springprojects`;
    const userId = JSON.parse(localStorage.getItem('uid'));

    if(projectName.length >= 15)
    {
      projectName.length >= 15 ? alert("프로젝트 길이 15길이 제한됩니다.") : alert("프로젝트 타입을 선택하세요.")
      return;
    }else{
      axios.post(url, {
        projectUserId: userId,
        projectName,
        projectType,
        projectBuildType: selectProject,
        projectLanguage: selectLanguage,
        projectSpringBootVer: selectBoot,
        projectMetaGroup: inputGroup,
        projectMetaDesc: inputDesc,
        projectMetaPackage: inputPackageName
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(response => {
          props.closeModal(false)
        })
        .catch(error => {
          console.log(error)
        })
      }
  }

  if (loading) {
    return (<Loading type="spinningBubbles" color="#2F96EB" />)
  }
  return (
    <div className="wrapper-create-project">
      <div className="create-project">
        <span className="close" onClick={() => props.closeModal(false)}><CloseIcon /></span>
        <div className="create-project__container">
          <p style={{textAlign: 'center', fontSize: '30px', fontWeight: '700', marginBottom: '10px'}}>프로젝트 정보</p>
          <div className="project-name col">
            <div className="form-label">이름</div>
            <div className="form-content">
              <TextField
                id="outlined-textarea"
                label="이름"
                placeholder="프로젝트 이름 입력하세요, 길이 15 제한됩니다."
                value={projectName}
                multiline
                variant="outlined"
                style={{ width: '100%' }}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
          <div className="project-type col">
            <div className="form-label">프로젝트 타입</div>
            <div className="form-content">
              <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-outlined-label">타입</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={projectType}
                  onChange={handleChange}
                  label="project-type"
                >
                  <MenuItem value='javaspring'>Java Spring</MenuItem>
                  <MenuItem value='nodejs'>Nodejs</MenuItem>
                  <MenuItem value='python'>Python</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div>
            {
              modalSpring ?
                <ProjectSpring
                  project="Maven Project"
                  language="Java"
                  boot=""
                  projectGroup=""
                  desc=""
                  packageName=""
                  handleSubmitSpring={handleSubmitSpring}
                /> :
                <Box textAlign='center'>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    // className={classes.submit}
                    style={{ width: '20%', minWidth: '200px' }}
                    onClick={() => handleSubmit()}
                  >프로젝트 생성</Button>
                </Box>
            }
          </div>
        </div>
      </div>
    </div>

  )
}
function ProjectSpring(props) {
  const { handleSubmitSpring } = props;

  const [selectProject, setSelectProject] = useState("Maven");
  const [selectLanguage, setLanguageProject] = useState("Java");
  const [selectBoot, setBootProject] = useState("2.4.0");
  const [inputGroup, setInputGroup] = useState("")
  const [inputDesc, setInputDesc] = useState("")
  const [inputPackageName, setInputPackage] = useState("")
  const [dependencies, setDependencies] = useState("web")


  return (<WrapperForSpring>
    <div>
      <div className="container-left">
        <div style={{ display: 'flex' }}>
          <div className="project" style={{ flex: '1' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Project</FormLabel>
              <RadioGroup aria-label="project" name="project" value={selectProject} onChange={(e) => setSelectProject(e.target.value)}>
                <FormControlLabel value="Maven" control={<Radio />} label="Maven" />
                <FormControlLabel value="Gradle" control={<Radio />} label="Gradle" />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="language" style={{ flex: '1' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Language</FormLabel>
              <RadioGroup aria-label="language" name="language" value={selectLanguage} onChange={(e) => setLanguageProject()}>
                <FormControlLabel value="Java" control={<Radio />} label="Java" />
                <FormControlLabel value="koltin" control={<Radio />} label="Koltin" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <div className="spring-boot"  >
          <FormControl component="fieldset">
            <FormLabel component="legend">Spring Boot</FormLabel>
            <RadioGroup aria-label="spring-boot" name="spring-boot" value={selectBoot} onChange={(e) => setBootProject(e.target.value)} style={{ flexDirection: 'row' }}>
              <FormControlLabel value="2.4.0" control={<Radio />} label="2.4.0" />
              <FormControlLabel value="2.3.4" control={<Radio />} label="2.3.4" />
              <FormControlLabel value="2.2.10" control={<Radio />} label="2.2.10" />
              <FormControlLabel value="2.1.17" control={<Radio />} label="2.2.17" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="project-info">
          <FormControl component="fieldset" style={{ width: '100%' }}>
            <FormLabel component="legend">Project Metadata</FormLabel>
            <div className="project-info__label-group info-col">
              <div>
                Group
              </div>
              <div>
                <TextField
                  value={inputGroup}
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="Group"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setInputGroup(e.target.value)}
                />
              </div>

            </div>
            <div className="project-info__label-desc info-col">
              <div>
                Description
              </div>
              <div>
                <TextField
                  value={inputDesc}
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="Description"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setInputDesc(e.target.value)}
                />
              </div>

            </div>
            <div className="project-info__label-package info-col">
              <div>
                Package name
              </div>
              <div>
                <TextField
                  value={inputPackageName}
                  id="standard-full-width"
                  style={{ margin: 8 }}
                  placeholder="Package name"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setInputPackage(e.target.value)}
                />
              </div>
            </div>


          </FormControl>
        </div>

      </div>
      <div className="container-right">
        <FormControl component="fieldset" style={{ width: '100%' }}>
          <FormLabel component="legend">Dependencies</FormLabel>
          <RadioGroup aria-label="spring-boot" name="spring-boot" value={dependencies} onChange={(e) => setDependencies(e.target.value)} style={{ flexDirection: 'row' }}>
              <FormControlLabel value="web" control={<Radio />} label="Web" />
            </RadioGroup>
        </FormControl>
      </div>
    </div>
    <Box textAlign='center'>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        // className={classes.submit}
        style={{ width: '20%', minWidth: '200px' }}
        onClick={() => handleSubmitSpring({ selectProject, selectLanguage, selectBoot, inputGroup, inputDesc, inputPackageName })}
      >프로젝트 생성</Button>
    </Box>
  </WrapperForSpring>)
}
const WrapperForSpring = styled.div`
    > div{
        display: flex;
        justify-content: center;
        width: 100%;
        .container-left{
            width: 50%;
            >div{
                margin-bottom: 20px;
            }
            .project-info .info-col{
                display: flex;
                div:nth-child(1){
                    flex: 1;
                    text-align: end;
                    /* padding-right: 20px; */
                    justify-content: flex-end;
                    display: flex; 
                    align-items: center;
                    font-size: 14px;
                }
                div:nth-child(2){
                    flex: 3
                }
            }
        }
        .container-right{
            width: 50%;
        }
    }
`

export default CreateProject

