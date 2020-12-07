import React, { useEffect, useState } from 'react'
import queryString from 'query-string'
import './style.scss'
import Loading from '../../../../components/Loading';

function DetailReport(props) {
    const [alert, setAlert] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var owsapResult = JSON.parse(JSON.parse(localStorage.getItem("owasp_result")));
        var riskName = queryString.parse(props.location.search).name;
        var matchingRisk = owsapResult.site.filter(site => {
            const { alerts } = site;
            const resultFilter = alerts.filter(alert => alert.name === riskName)
            if(resultFilter.length !== 0)
                return true
        })

        const { alerts } = matchingRisk[0];
        const matchingAlert = alerts.filter(alert => alert.name == riskName);
        setAlert(matchingAlert[0])
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, [])
    return (
        <div className="report-detail">
            {
                !loading ?
                <>
                <div className="report-detail__content" >
                    <div className="report-detail__content--desc">
                    <p>{alert.name}</p>
                    <table width="100%" className="desc-table">
                        <tbody>
                            <tr>
                                <th width="30%"><b>Description</b></th>
                                <td width="70%">{alert.desc.replace("<p>","").replace("</p>","")}</td>
                            </tr>
                            <tr>
                                <th><b>Solution</b></th>
                                <td>{alert.solution.replace("<p>","").replace("</p>","")}</td>
                            </tr>
                            <tr>
                                <th><b>Reference</b></th>
                                <td>{alert.reference.replace("<p>","").replace("</p>","")}</td>
                            </tr>
                            <tr>
                                <th><b>CWE ID</b></th>
                                <td>{alert.cweid}</td>
                            </tr>
                            <tr>
                                <th><b>Total</b></th>
                                <td>{alert.count}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                </div> 
                <div className="report-detail__alert-detail">
                <p>List URL</p>
                <table width="100%" className="listurl-table">
                    <thead>
                        <tr>
                            <th width="30%">Method</th>
                            <th width="70%">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alert.instances.map(instance => 
                                <tr>
                                    <td>{instance.method}</td>
                                    <td>{instance.uri}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
                </>:
                <Loading type="spinningBubbles" color="#2F96EB"/>
            }
        </div>
    )
}



export default DetailReport

