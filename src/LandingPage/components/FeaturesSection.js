import React from 'react'
import PropTypes from 'prop-types'

function FeaturesSection(props) {
  return (
    <div id="features" className="ft-flex">
        <div className="container">
          <div className="ft-inner align-center">
            <div className="ft-image wow">
              <img className="img-fluid" src="assets/images/support.png" alt="Feature" />
            </div>
            <div className="ft-text">
              <div className="ft-content">
                <h2>SW개발보안 진단 및 대응훈련</h2>
                <p> 소스코드에 존재하는 잠재적인 보안약점 식별하고 제거하는 훈련</p>
                <ul>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 코드 리뷰 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 보안약점 진단 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 보안약점 제거를 위한 시큐어코딩 적용</li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 보안약점 제거 확인</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ft-inner ft-inverted align-center">
            <div className="ft-image f-image-inverted">
              <img className="img-fluid" src="assets/images/write.png" alt="Feature" />
            </div>
            <div className="ft-text">
              <div className="ft-content">
                <h2>시큐어한 SW개발 프로젝트 훈련</h2>
                <p> 웹기반 통합개발환경을 활용하여 시큐어한 소프트웨어 개발 훈련</p>
                <ul>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 요구사항 분석 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 프로젝트 생성 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 보안을 고려한 기능 구현 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 소프트웨어 취약점 자동진단 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 취약점 제거를 위한 시큐어코딩 </li>
                  <li><img src="./assets/icons/tick.svg" alt="Tick" /> 취약점 제거 확인 </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

FeaturesSection.propTypes = {

}

export default FeaturesSection

