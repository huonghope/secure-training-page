import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function Footer(props) {
  return (
    <div className="footer">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-2 col-md-3 col-sm-12">
              <div className="footer-logo">
                <h2><img src="./assets/images/logo-secolab_sub.png" alt="" /></h2>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <ul className="footer-menu">
                <li style={{fontSize: "10px"}}>Copyright All rights reserved © LMS 2020.</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-3 col-sm-12">
              <div className="footer-links">
                <ul>
                  <li><Link to="#main"> <img className="img-fluid" src="assets/icons/i1.png" alt="Icon" /> </Link> </li>
                  <li><Link to="#main"> <img className="img-fluid" src="assets/icons/i2.png" alt="Icon" /> </Link> </li>
                  <li><Link to="#main"> <img className="img-fluid" src="assets/icons/i3.png" alt="Icon" /> </Link> </li>
                  <li><Link to="#main"> <img className="img-fluid" src="assets/icons/i4.png" alt="Icon" /> </Link> </li>
                </ul>
              </div>
            </div>
          </div>
          <link id="back-top" className="back-to-top js-scroll-trigger" href="#main" />
        </div>
      </div>
  )
}

Footer.propTypes = {

}

export default Footer

