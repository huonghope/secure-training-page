import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ImIndentDecrease,  ImIndentIncrease} from "react-icons/im";
import { withRouter } from "react-router";
import styled from 'styled-components';
import { HiFolderAdd } from "react-icons/hi";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        // minHeight: '80vh',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        height: '100%',
    },
    gridList: {
        paddingLeft: '4%',
        paddingBottom: '10%',
        width: '80%',
        height: `${window.innerHeight}`,
    },
}));

function DiagnosisPageLayout(props) {
    const { children } = props;
    const classes = useStyles();
    const [value, setValue] = useState(1)
    
    const handleChange = (e, newValue) => {
        props.history.push(newValue);
        setValue(newValue);
    };


    const handleReSize  = () => {
        setReSize(!resize);
    }

    const [resize, setReSize] = useState(false);
    const reSizeStyle = resize ? { width: '3%',minHeight: '70vh'} : {minHeight: '70vh'};
    return (
        <div>
            <section id="sec">
                {/* <h2>Diagnosis</h2> */}
                {/* <h4>Description</h4> */}
            </section>
            <div className={classes.root}>
                <div className="nav-left" style={reSizeStyle}>
                    <WrapperIconTap onClick= {handleReSize}  >
                        { resize ? < ImIndentIncrease/> :  < ImIndentDecrease />}
                    </WrapperIconTap>
                    {/* < ImIndentDecrease /> */}
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="language-tab"
                        style={{
                            alignItems: 'center',
                            transition: 'all 0.5s'
                        }}
                        className={classes.tabs}
                    >
                        <Tab label={resize ? <HiFolderAdd fontSize="35px"/>: "프로젝트 목록"} value="listprojects">프로젝트 목록 </Tab>
                        <Tab label={resize ? <HiFolderAdd fontSize="35px"/>: "문제 목록"} value="listproblems">문제 목록 </Tab>
                    </Tabs>
                </div>
                <div className="content-right" style={{width: '100%', transition: 'all 0.4s'}}>
                    {children}
                </div>
            </div>
        </div>
    );
}
const WrapperIconTap = styled.div`
    width: 100%;
    color: #2F96EB;

    font-size: 25px;
    text-align: center;

    padding-right: 10px;

    cursor: pointer;
`
export default withRouter(DiagnosisPageLayout)