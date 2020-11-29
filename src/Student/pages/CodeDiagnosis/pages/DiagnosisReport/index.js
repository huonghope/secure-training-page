import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import axios from 'axios'
import { Button, CircularProgress, Input, LinearProgress, TextField } from '@material-ui/core';
import './style.scss';
import { Link } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import qs from 'query-string'
var process = require('../../../../../myProcess.json');

function formatResult(result){
    if(result){
        const { site } = result;
        site.map(detailtSite => {
            const { alerts }  = detailtSite;
            var infor = 0;
            var low = 0;
            var medium = 0;
            var high = 0;
            alerts.map(detailtAlert => {
                const { riskcode } = detailtAlert;
                if(Number(riskcode) === 0){
                    infor++;
                }
                else if(Number(riskcode) === 1){
                    low++;
                }else if(Number(riskcode) === 2){
                    medium++;
                }else{
                    high++;
                }
            })
            detailtSite["alerts_infor"] = {
                infor, low, medium, high
            }
            alerts.sort((a,b) => {
                return Number(a.riskcode - b.riskcode);
            })
        });
        return result;
    }
    return;
}
function resultListAlertsByRiskCode(arrayAlerts, code){
    let temp = [...arrayAlerts];
    let result = temp.filter(element => {
        return Number(element.riskcode) === Number(code)
    })
    return result;
}
function resultListAlertLbyRiskName(arrayAlerts, _name){
    let temp = [...arrayAlerts];
    let result = temp.filter(element => {
        return element.name === _name
    })
    return result;
}
function DiagnosisReport(props) {

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sites, setSites] = useState([]);

    const [loadingPage, setLoadingPage] = useState(false);

    useEffect(() => {
        setLoadingPage(true)
        const projectId = qs.parse(props.location.search).pid;
        if(!projectId) //진단한 History 보기
        {
            const result = localStorage.getItem("owasp_result") ? JSON.parse(localStorage.getItem("owasp_result")) : "";
            if(result)
            {
                setTimeout(() => {
                    setLoadingPage(false)
                }, 500);
                const resultAfterFormat = formatResult(JSON.parse(result));
                const { site } = resultAfterFormat;
                setSites(site)
            }
        }else{ //해당하는 클릭 프로젝트 진단하기
            setSubmit(true)
            setLoading(true);
            const token = JSON.parse(localStorage.getItem('token'))
            const url = `http://${process.IP}:10000/dynamic-analyzer`;
            const userId = JSON.parse(localStorage.getItem('uid'));
    
            axios.post(url, {
                userId: userId,
                projectId: projectId,
                option: 'Spider',
                typereport: 'html'
            }, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                const { data } = response;
                setSubmit(false)
                setLoading(false);
                setLoadingPage(false)
                if(data === 'fail'){
                    alert('해당하는 프로젝트 서비를 연결 실패합니다. 다시 확인해주세요')
                    return;
                }
                const resultAfterFormat = formatResult(data);
                const { site } = resultAfterFormat;
                setSites(site)
            })
            .catch(error => {
                setSubmit(false)
                setLoading(false);
                setLoadingPage(false)
                if (error) {
                    alert('프로젝트 진단 실패 잠시후 다시 해주세요')
                }
            })
        }

    }, [])

    if (loading) {
        return <>
        <LinearProgress color="primary" />
            <h3 style={{textAlign: 'center', marginTop: '20px'}}>페이지 개수 많을 수록 시간이 많이 걸립니다.</h3>
        </>
    }

    if(loadingPage){
        return  <Loading type="spinningBubbles" color="#2F96EB"/>

    }
    return (
        <div className = "diagnonis-report">
            {/* <div style={{ textAlign: 'center', paddingLeft: '50px' }}  className = "diagnonis-report__form" >
                <TextField placeholder="진단 URL 입력하세요" style={{width: '500px', marginRight: '20px'}} inputProps={{ 'aria-label': 'description' }} value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
                <Button color="primary" variant="contained" onClick={handleDiagnosisReport} disabled={submit ? true : false} style={{marginRight: '10px'}}> 진단</Button>
                {
                    sites.length !== 0 &&
                    <Button color="primary" variant="contained" onClick={handleReset} > 리셋</Button>
                }
            </div> */}
            <div className = "diagnonis-report__result">
            {
                sites.length !== 0 &&
                sites.map((site,idx) => {
                    return (
                        <div key={idx} className = "diagnonis-report__result--content" style={{ borderBottom: '1px solid #ddd', marginBottom: '10px', padding: '5px' }}>
                            <p>Host: {site["@host"]}</p>
                            <p>Url : {site["@name"]}</p>
                            <p>Port: {site["@port"]}</p>
                            <p style={{ fontSize: '20px'}}>Summary of Alerts:</p>
                                {
                                <>
                                    <table width="100%" className="results-infor">
                                        <tbody>
                                            <tr height="24" className="risk-title">
                                                <th width="20%">Rink Level</th>
                                                <th width="80%">Number Of Alert</th>
                                            </tr>
                                            <tr  bgcolor="#ccc">
                                                <th width="20%">Information</th>
                                                <th widthc="80%">{site.alerts_infor.infor}</th>
                                            </tr>
                                            <tr  bgcolor="#e8e8e8">
                                                <th width="20%">Low</th>
                                                <th widthc="80%">{site.alerts_infor.low}</th>
                                            </tr>
                                            <tr  bgcolor="#ccc">
                                                <th width="20%">Medium</th>
                                                <th widthc="80%">{site.alerts_infor.medium}</th>
                                            </tr>
                                            <tr  bgcolor="#e8e8e8">
                                                <th width="20%">High</th>
                                                <th widthc="80%">{site.alerts_infor.high}</th>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <p style={{ fontSize: '20px', marginTop: '10px'}}>Alert List</p>
                                        <div className="alerts-list">
                                            <div className="alerts-list__title">
                                                <div className="alerts-list__title--level">Risk Level</div>
                                                <div className="alerts-list__title--name">Alert Name</div>
                                                <div className="alerts-list__title--url">URL</div>
                                            </div>
                                            <div className="alerts-list__content">
                                                {
                                                    new Array(0, 1, 2, 3).map(item =>{
                                                        return <WrapperReportAlert 
                                                            key={item}
                                                            index = {item}
                                                            arrayAlerts = {resultListAlertsByRiskCode(site.alerts, item)} />
                                                    })
                                                    
                                                }
                                            </div>
                                        </div>
                                    </>
                                }
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}
function WrapperReportAlert({arrayAlerts, index}){
    if(arrayAlerts.length === 0)
        return "";

    let title;
    switch (index) {
        case 0:
            title = "Information"
            break;
        case 1:
            title = "Low"
            break;
        case 2:
            title = "Medium"
            break;
        case 3:
            title = "High"
            break;
        default:
            title = "Special"
            break;
    }

    return (
        <div className="alerts-list__content--container">   
        <div className="level">{title}</div>
        <div className="alert-list-url">
                {
                    arrayAlerts.map((alert,idx)=> {
                        return (
                            <div key={idx}>
                                <div className="alert-name"><Link to ={`reportdetail?name=${alert.name}`}>{alert.name}</Link></div>  
                                <div className="alert-url">
                                    {
                                        resultListAlertLbyRiskName(arrayAlerts, alert.name)[0].instances.map((instance,idx) => {
                                            return <div key={idx} >{instance. uri.substring(0, 100)}...</div>
                                        }
                                    )
                                    }
                                </div>
                            </div>
                        )
                    }
                    )
                }
        </div>
    </div>
    )
}

export default DiagnosisReport

