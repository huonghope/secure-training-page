import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function PricingTables(props) {
  return (
    <>
      <div id="pricing" className="pricing-section text-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-sm-10 offset-sm-1">
                <div className="pricing-intro">
                  <h1>가격 정책</h1>
                  <p>
                    시코랩은 두가지 가격정책이 있습니다. <br className="hidden-xs" />
                    기본모듈은 무료로 사용할 수 있습니다. 더 다양한 문제를 해결하고 싶으면 프리미엄 요금 정책을 사용할 수 있습니다.
                  </p>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="table-left">
                      <h2>Basic Free</h2>
                      <p>기본모듈학습</p>
                      <img className="img-fluid" src="./assets/icons/f1.png" width={120} alt="Icon" />
                      <div className="pricing-details">
                        <span>Free</span>
                        <div className="sub_span">One year</div>
                      </div>
                      <Link className="btn-action">더알아보기 </Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="table-right">
                      <h2>Premium</h2>
                      <p>모든학습</p>
                      <img className="img-fluid" src="./assets/icons/f3.png" width={120} alt="Icon" />
                      <div className="pricing-details">
                        <span>50,000원</span>
                        <div className="sub_span sub_span_alt">월구독료</div>
                      </div>
                      <Link className="btn-action btn-outline">더알아보기</Link>
                    </div>
                  </div>
                </div>
                <p className="refund-txt">* 결재취소는 1일이내만 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="cta" className="yd_cta_box">
          <div className="container">
            <div className="cta_box">
              <div className="cta_box_inner">
                <div className="col-sm-12 col-md-12">
                  <h2>SECOLAB 문제 출제자로 참여하세요</h2>
                  <h4>시코랩은 시큐어코딩 훈련 시스템 활성화를 위해 많은 전문가가 참여할 수 있는<br />선순환 생태계를 구축하기 위해 노력하고 있습니다.</h4>
                  <div className="form">
                    <form id="chimp-form" className="subscribe-form" action="assets/php/subscribe.php" method="post" acceptCharset="UTF-8" encType="application/x-www-form-urlencoded" autoComplete="off" noValidate style={{display: "flex", justifyContent: "center"}}>
                      <input className="mail" id="chimp-email" type="email" name="email" placeholder="Enter email address" autoComplete="off" />
                      <input className="submit-button" type="submit" defaultValue="Sign Up" />
                    </form>
                    <div id="response" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

PricingTables.propTypes = {

}

export default PricingTables

