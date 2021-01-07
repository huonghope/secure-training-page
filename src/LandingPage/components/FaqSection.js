import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function FaqSection(props) {
  return (
    <>
      <div id="faqs" className="yd_faqs">
          <div className="container">
            <div className="faq_inner">
              <div className="col-md-10 offset-md-1">
                <div className="faq_intro">
                  <h2>Frequently Asked Queries</h2>
                  <p>자주하는 질문들입니다.</p>
                  <h5>아직 질문이 남았으면 연락주세요</h5> <Link className="link-btm" to="#" >Contact us </Link>
                </div>
                <div id="accordion">
                  <div className="row">
                    <div className="col-md-6 custompadding">
                      <div className="card mb-0" style={{width: "100%"}}>
                        <div className="card-header collapsed" data-toggle="collapse" href="#collapseOne">
                          <link className="card-title" />개인이 온라인으로 회원가입이 가능한가요?
                        </div>
                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                          <div className="card-body">
                            <p>현재는 BtoB 서비스만 제공하고 있기 때문에 개인이 온라인으로 가입할 수 없습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 custompadding">
                      <div className="card mb-0">
                        <div className="card-header collapsed" data-toggle="collapse" href="#collapseTwo">
                          <link className="card-title" />월구독은 뭔가요?
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                          <div className="card-body">
                            <p>월구독료를 결재하시면 시코랩의 모든 기능을 무제한 사용할 수 있습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 custompadding">
                      <div className="card mb-0">
                        <div className="card-header collapsed" data-toggle="collapse" href="#collapseThree">
                          <link className="card-title" />문제를 풀다가 해결이 되지 않는 문제는 어떻게 해결할 수 있나요?
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                          <div className="card-body">
                            <p>AI봇을 통해 Q&amp;A 서비스를 제공하고 있습니다. AI선생님께 질문해 보세요. 원하는 답을 얻을 수 있습니다.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 custompadding">
                      <div className="card mb-0">
                        <div className="card-header collapsed" data-toggle="collapse" href="#collapseFour">
                          <link className="card-title" />동영상 교육은 모든 과목을 다 수강할 수 있나요?
                        </div>
                        <div id="collapseFour" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                          <div className="card-body">
                            <p>넵. 월구독권을 구입하시면 모든 동영상 교육을 무료로 수강할 수 있습니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
    </>
  )
}

FaqSection.propTypes = {

}

export default FaqSection

