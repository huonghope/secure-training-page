import React from 'react'
import {Redirect, Route, Switch, useRouteMatch} from 'react-router-dom';
import ListProjects from './pages/ListProjects'
import ListProblems from './pages/ListProblems'
import DiagnosisReport from './pages/DiagnosisReport'
import DiagnosisHistory from './pages/DiagnosisHistory'
import DetailReport from './pages/DetailReport'

import DiagnosisPageLayout from '../../layouts/DiagnosisPageLayout';

function CodeDiagnosis(props) {
    const match = useRouteMatch();
    return (
        <DiagnosisPageLayout>
            <Switch>
                <Route exact path={`${match.path}`}>
                        <Redirect to={`${match.path}/listprojects`}/>
                </Route>
                <Route exact path = {`${match.url}/listprojects`} component = {ListProjects} />        
                <Route exact path = {`${match.url}/diagnosishistory`} component = {DiagnosisHistory} />      
                <Route exact path = {`${match.url}/diagnosisreport`} component = {DiagnosisReport} />      
                <Route exact path = {`${match.url}/reportdetail`} component = {DetailReport} />      
                
                <Route exact path = {`${match.url}/listproblems`} component = {ListProblems} />        
            </Switch>
        </DiagnosisPageLayout>
    )
}

export default CodeDiagnosis

