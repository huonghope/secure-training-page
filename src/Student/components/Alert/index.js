import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { render } from 'react-dom';
import CloseIcon from '@material-ui/icons/Close';
import './style.scss'

function Alert({title, content, handleClickAccept, handleClickReject}) {
    const ref = React.createRef();
    const modal = (
        <WrapperAlert>
            <div className="container-alert">
                <div style={{textAlign: 'right'}}>
                    <i className="material-icons clear-icon" onClick={(e) => closeEvent(e)}><CloseIcon /></i>
                </div>
                <div style={{textAlign: "center"}}>
                    <h3 className="container-alert__title">
                        {title}
                    </h3>
                    <p className="container-alert__content">
                        {content}
                    </p>
                </div>
                <div className="container-alert__btn">
                    <button className="container-alert__btn--accept" onClick={() => { handleClickAccept(); closeEvent()}}>네</button>
                    <button className="container-alert__btn--cancel" onClick={() => { handleClickReject(); closeEvent()}}>아니오</button>
                </div>
            </div>
        </WrapperAlert>
    )

    const divContainer = document.createElement("div");
    document.body.appendChild(divContainer);

    function closeEvent(e) {
        divContainer.removeEventListener('keydown', closeEvent);
        removeDom();
    }
    function removeDom () {
        document.body.removeChild(divContainer);
    }
    render(modal, divContainer);

}
const WrapperAlert = styled.div`
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 100;
    
    
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */

`
export default Alert

