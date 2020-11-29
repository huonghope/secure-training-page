import React from 'react'
import PropTypes from 'prop-types'
import ReactLoading from "react-loading";
import styled from 'styled-components';

function Loading({type, color}) {
    return (
        <WrapperLoading>
            <ReactLoading type={type} color={color} />
        </WrapperLoading>
    )
}
const WrapperLoading = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
`
export default Loading

