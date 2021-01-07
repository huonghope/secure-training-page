import React from 'react'
import { Link } from 'react-router-dom'
var process = require('../../myProcess.json');
function Home(props) {
  return (
    <div className="home">
        <div className="container">
          <div className="hero-content wow fadeIn">
            <div className="flex-split">
              <div className="container">
                <div className="flex-inner flex-inverted align-center">
                  <div className="f-image f-image-inverted">
                    <img className="img-fluid" src="./assets/images/head.png" alt="Feature" />
                  </div>
                  <div className="f-text">
                    <div className="left-content">
                      <h4>안전한 소프트웨어를 만들기 위한 노력</h4>
                      <h2>시큐어코딩 훈련시스템<br /><img src="./assets/images/logo-secolab.png" alt="" style={{ width: "320px", marginTop: "10px"}} /></h2>
                      <Link className="btn-action btn-outline nav-link js-scroll-trigger" to="#features" >더알아보기</Link>
                      <Link className="btn-action" to="#" onClick={() => window.open(`http://${process.IP}:3000`)} >훈련장바로가기</Link>
                    </div>
                    <p className="condition_txt">개발자는 안전하게 동작되는 프로그램을 만들 책임이 있습니다.<br />여러분의 코딩 기술 향상을 위해 시큐어코딩 훈련 시스템에 도전해 보세요.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

Home.propTypes = {

}

export default Home

