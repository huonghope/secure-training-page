import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './style.scss'
import qs from 'query-string'
import Loading from '../../../../components/Loading'
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link } from 'react-router-dom'
var process = require('../../../../../myProcess.json');

function DiagnosisHistory(props) {
    const [loading, setLoading] = useState(false);
    const [listHistoryDiagnosis, setListHistoryDiagnosis] = useState([]);

    useEffect(() => {

        const projectId = qs.parse(props.location.search).pid;
        const token = JSON.parse(localStorage.getItem('token'))
        const url = `http://${process.IP}:10000/result_dynamic-analyzers`;
        const userId = JSON.parse(localStorage.getItem('uid'));

        axios.post(url, {
            userId: userId,
            projectId: projectId,
            typereport: 'json'
        }, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            const { data } = response;
            setListHistoryDiagnosis(data)
            setLoading(false);
        })
        .catch(error => {
            console.log(error)
            setLoading(false);
            if (error) {
                alert('프로젝트 진단 실패 잠시후 다시 해주세요')
            }
        })

        return () => {
        }
    }, [])
    const handleClickDetail = (id, result) => {
        localStorage.setItem("owasp_result", JSON.stringify(result))
        props.history.push(`diagnosisreport?logid=${id}`);
    }

    if(loading){
        return  <Loading type="spinningBubbles" color="#2F96EB"/>
    }
    console.log(listHistoryDiagnosis)
    return (
        <div className="dianosis-history">
            <Timeline>
                {
                    listHistoryDiagnosis.length !== 0 &&
                    listHistoryDiagnosis.map(diagnosis => (
                        <TimelineItem>
                            <TimelineSeparator>
                            <TimelineDot variant="outlined" color="primary" />
                            <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>{diagnosis.time}
                                <div className="wrapper-log"  >
                                    <p>{diagnosis.path}</p>
                                    <button  onClick={() => handleClickDetail(diagnosis.path, diagnosis.result)}>제세히 보기</button>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }
        
            </Timeline>
        </div>
    )
}


export default DiagnosisHistory

