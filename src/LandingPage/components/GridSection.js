import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function GridSection(props) {
  return (
    <div className="yd_reviews">
      <div className="container">
        <div className="yd_rev_inner">
          <div className="row">
            <div className="col-md-5">
              <div className="rev-intro">
                <h2>사용자 후기</h2>
                <p> 시코랩 훈련생의 생생한 후기를 통해 시큐어코딩 훈련의 필요성을 확인할 수 있습니다. </p>
              </div>
            </div>
            <div className="col-md-7">
              <div className="rev-list owl-carousel owl-theme">
                <div className="rev-block">
                  <img src="assets/icons/quote.svg" width={60} alt="Quote" />
                  <h2>시코랩을 통해 개발자도 보안을 고려한 소프트웨어를 설계해야하고 구현단계에 취약점의 원인이 되는 보안약점을 선제적으로 제거하도록 코딩 습관을 들여야 한다는 것을 배웠습니다.</h2>
                  <div className="rev-client">
                    <div className="rev-icon">
                      <div className="rev-img">
                        <img className="rounded-circle" src="./assets/icons/rev.png" width={60} alt="Feature" />
                      </div>
                    </div>
                    <div className="rev-text">
                      <h3>홍 길동 </h3>
                      <p> 교육생 <link to="#" /> SK인포섹 K디지털 교육</p>
                    </div>
                  </div>
                </div>
                <div className="rev-block">
                  <img src="assets/icons/quote.svg" width={60} alt="Quote" />
                  <h2> 코드리뷰를 통해 코드를 통해 보안약점을 식별할 수 있다는것을 배웠습니다. 그리고 어떻게 그 보안약점을 제거할 수 있는지도 학습 할 수 있었습니다. </h2>
                  <div className="rev-client">
                    <div className="rev-icon">
                      <div className="rev-img">
                        <img className="rounded-circle" src="./assets/icons/rev2.png" width={60} alt="Feature" />
                      </div>
                    </div>
                    <div className="rev-text">
                      <h3>이 순 신 </h3>
                      <p>교육생 <link to="#" />SK인포섹 4차산업선도인력양성과정 </p>
                    </div>
                  </div>
                </div>
                <div className="rev-block">
                  <img src="./assets/icons/quote.svg" width={60} alt="Quote" />
                  <h2>시큐어코딩 적용은 개발자의 의무라고 생각합니다. 보안사고를 선제적으로 방어할 수 있는 가장 효율적인 보안 활동이 시큐어코딩이라는것을 시코랩학습을 통해 배우게 되었습니다</h2>
                  <div className="rev-client">
                    <div className="rev-icon">
                      <div className="rev-img">
                        <img className="rounded-circle" src="./assets/icons/rev3.png" width={60} alt="Feature" />
                      </div>
                    </div>
                    <div className="rev-text">
                      <h3>강 감 찬</h3>
                      <p> 교육생 <link to="#" />멀티캠퍼스 4차산업선도인력양성과정</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

GridSection.propTypes = {

}

export default GridSection

