import React from 'react'
import PropTypes from 'prop-types'

function CounterSection(props) {
  return (
    <div id="reviews" className="yd-stats">
        <div className="container-s">
          <div className="row text-center">
            <div className="col-sm-12">
              <div className="intro">
                <h4>OUR RESULTS</h4>
                <h2>시큐어코딩 훈련 결과</h2>
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <img src="./assets/icons/f1.png" alt="Icon" />
                </div>
                <h3><span className="counter">47</span>%</h3>
                <div className="counter-text">
                  <h2>SQL인젝션</h2>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <img src="./assets/icons/f2.png" alt="Icon" />
                </div>
                <h3><span className="counter">33</span>%</h3>
                <div className="counter-text">
                  <h2>경로조작및 자원삽입</h2>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <img src="./assets/icons/f3.png" alt="Icon" />
                </div>
                <h3><span className="counter">28</span>%</h3>
                <div className="counter-text">
                  <h2>파일업로드 취약점</h2>
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-3">
              <div className="counter-up">
                <div className="counter-icon">
                  <img src="./assets/icons/f4.png" alt="Icon" />
                </div>
                <h3><span className="counter">349</span>%</h3>
                <div className="counter-text">
                  <h2>파라미터조작</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

CounterSection.propTypes = {

}

export default CounterSection

