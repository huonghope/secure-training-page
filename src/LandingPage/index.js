import React from 'react'
import AboutSection from './components/AboutSection'
import CounterSection from './components/CounterSection'
import FeaturesSection from './components/FeaturesSection'
import Home from './components/Home'
import NavBar from './components/NavBar'
import GridSection from './components/GridSection'
import PricingTables from './components/PricingTables'
import FaqSection from './components/FaqSection'
import Footer from './components/Footer'
import SignUpModel from './components/SignUpModel'

import "./assets/css/bootstrap.min.css"

import "./assets/css/animate.css"
import "./assets/css/owl.carousel.css"
import "./assets/css/owl.theme.css"
import "./assets/css/ionicons.min.css"

import "./assets/css/stylesheet.css"
import "./assets/fs/css/all.css"



function LandingPage(props) {
  return (
    <div className="box-layout">
      <div className="wrapper">
          <NavBar/>
        <div className="main">
          <Home/>
          <AboutSection/>
          <FeaturesSection/>
          <CounterSection/>
          <GridSection/>
          <PricingTables/>
          <FaqSection/>
          <Footer/>
        </div>
      </div>
    <SignUpModel/>
    </div>
  )
}

LandingPage.propTypes = {

}

export default LandingPage

