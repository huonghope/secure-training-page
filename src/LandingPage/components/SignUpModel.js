import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function SignUpModel(props) {
  return (
    <div id="modal-signup" className="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ width: "390px" }}>
          <div className="modal-body">
            <div style={{ padding: "10px 30px" }}>
              <div className="d-flex justify-content-center">
                <p style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginTop: "20px",
                  marginBottom: "40px"
                }}
                >LOGIN</p>
              </div>

              <form action="#">
                <div className="form-group" style={{width: "100%"}} >
                  <label style={{ fontSize: "0.8rem", marginBottom: "10px", paddingLeft: "10px",  }} for="email">Email</label>
                  <input className="form-control" type="email" id="email" required="" placeholder="email@email.com" />
                </div>
                <div className="form-group" style={{width: "100%"}}>
                  <label style={{ fontSize: "0.8rem", marginBottom: "10px", paddingLeft: "10px" }} for="password">Password:</label>
                  <input className="form-control" type="password" required="" id="password" placeholder="Enter your password" />
                </div>
                <div className="form-group" style={{width: "100%"}} >
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="terms" />
                    <label className="custom-control-label" for="terms" style={{ verticalAlign: "-5px", fontSize: "0.825rem", width: "100%" }} >I accept <Link to="#">Terms and Conditions</Link></label>
                  </div>
                </div>
                <div className="form-group text-center" style={{ paddingTop: "20px", width: "100%", display: "flex", justifyContent: "space-between" }}>
                  <button className="btn btn-dark" style={{ padding: "10px", width: "145px" }} type="submit" data-dismiss="modal">취소</button>
                  <button className="btn btn-primary" style={{ padding: "10px", width: "145px" }} type="submit">로그인</button>
                </div>
                <div className="form-group text-center" style={{ fontSize: "0.75rem", width: "100%"}}  >
                  <Link to="" style={{ marginRight: "20px" }} >아이디 찾기</Link>|<Link to="" style={{ marginLeft: "20px" }}>비밀번호 찾기</Link>
                </div>
                <div style={{ paddingTop: "10px", borderBottom: "1px solid #e3e3e3" }}></div>
              </form>
              <div className="d-flex justify-content-center">
                <p style={{ fontSize: "0.85rem", fontWeight: "bolder", marginTop: "20px", marginBottom: "20px" }}>SNS계정으로 로그인하기</p>
              </div>
              <div className="form-group text-center">
                <button className="btn btn-danger" style={{ padding: "10px 0px", width: "300px", marginBottom: "10px" }} type="submit"><i className="fab fa-google"></i> 구글계정으로 로그인</button>
                <Link to=""><img src="./assets/images/kakao_login_medium_wide.png" alt="" /></Link>
              </div>
              <div style={{ paddingTop: "10px", borderBottom: "1px solid #e3e3e3", marginBottom: "40px" }}></div>
              <div className="form-group text-center">
                <Link to="" style={{ marginRight: "20px", fontSize: "0.825rem" }}>회원가입</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SignUpModel.propTypes = {

}

export default SignUpModel

