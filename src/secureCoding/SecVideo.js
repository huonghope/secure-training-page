import React, { Component } from 'react'


export default class secVideo extends Component {

    componentDidMount =()=>{
        window.onload = function(){
            if(document.getElementById("secVideo"))
            document.getElementById("secVideo").load()
        }
    }
    
    render() {
        return (
            <div>
                <video id="secVideo" controls="controls" width="300px" height="250px"  >
                    <source id="secVideoSrc" src={this.props.secVideo} type="video/mp4" />
                </video>
            </div>
        )
        
    }
}
