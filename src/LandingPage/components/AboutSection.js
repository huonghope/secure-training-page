import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function AboutSection(props) {
  return (
    <div id="main" className="yd-cat">
        <div className="container">
          <div className="cat-inner">
            <div className="cat-flex">
              <div className="cat2">
                <h4>What's SECOLAB</h4>
                <h2>웹통합개발환경을 활용한 <br className="hidden-xs" />시큐어코딩 훈련시스템</h2>
                <p> 모든 소프트웨어 개발자들이 프로젝트 생성단계에서 부터 소스코드 보안 약점을 식별하고 제거한 시큐어한 소프트웨어를 개발 할 수 있도록 훈련하는 시스템 입니다.</p>
              </div>
              <div className="cat2">
                <img src="./assets/images/write.png" alt="" width="90%" />  
              </div>
            </div>
            <div className="cat-flex">
              <div className="cat1">
                <div className="cat-item clr4">
                  <div className="cat-icon">
                    <div className="cat-img">
                      <img src="./assets/icons/cat4.png" width={80} alt="Feature" />
                    </div>
                  </div>
                  <div className="cat-text">
                    <h3>SW보안약점<br />학습</h3>
                    <p>SW보안약점과 취약점을 동영상으로 제작된 교육을 통해 학습</p>
                    <a className="btn-action btn-outline nav-link js-scroll-trigger" href="#features">시작하기</a>
                  </div>
                </div>
              </div>
              <div className="cat1">
                <div className="cat-item clr1">
                  <div className="cat-icon">
                    <div className="cat-img">
                      <img src="./assets/icons/cat11.png" width={80} alt="Feature" />
                    </div>
                  </div>
                  <div className="cat-text">
                    <h3>SW개발보완<br />진단 및 대응훈련</h3>
                    <p>소스코드에 존재하는 보안 약점을 식별하고 시큐어코딩 적용 방법 학습</p>
                    <a className="btn-action btn-outline nav-link js-scroll-trigger" href="#features">시작하기</a>
                  </div>
                </div>
              </div>
              <div className="cat1">
                <div className="cat-item clr2">
                  <div className="cat-icon">
                    <div className="cat-img">
                      <img src="./assets/icons/cat22.png" width={80} alt="Feature" />
                    </div>
                  </div>
                  <div className="cat-text">
                    <h3>시큐어한 SW개발<br />프로젝트 훈련</h3>
                    <p>프로젝트기반의 소프트웨어 개발을 시큐어하게 수행하는 방법을 학습</p>
                    <a className="btn-action btn-outline nav-link js-scroll-trigger" href="#features">시작하기</a>
                  </div>
                </div>
              </div>
              <div className="cat1">
                <div className="cat-item clr3">
                  <div className="cat-icon">
                    <div className="cat-img">
                      <img src="./assets/icons/cat33.png" width={80} alt="Feature" />
                    </div>
                  </div>
                  <div className="cat-text">
                    <h3>시코랩 문제<br />출제자 참여</h3>
                    <p>학습영상, 시큐어코딩 학습을 위한 문제 출제자로 참여</p>
                    <a className="btn-action btn-outline nav-link js-scroll-trigger" href="#features">시작하기</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

AboutSection.propTypes = {

}

export default AboutSection

