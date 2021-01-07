import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top wt-border">
        <div className="container">
          <Link className="navbar-brand" to="#"><img src="./assets/images/logo-secolab.png" alt="" style={{width: "200px"}}/> </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto navbar-right">
              <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#main" >Courses </Link></li>
              <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#reviews" >Reviews </Link></li>
              <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#pricing" >Pricing </Link></li>
              <li className="nav-item"><Link className="nav-link js-scroll-trigger" to="#faqs" >FAQ </Link></li>
              <li><Link className="btn-nav" to="#" data-toggle="modal" data-target="#modal-signup" >LOGIN </Link></li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

NavBar.propTypes = {

}

export default NavBar

