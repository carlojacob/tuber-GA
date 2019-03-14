import React from 'react'

import './HomeLogo.scss'

const tuberLargeLogo = require('./tuberLargeLogo')

const HomeLogo = () => (
  <div className="home-logo-div">
    <img className="home-logo" src={tuberLargeLogo} title="tuberLargeLogo" />
  </div>
)

export default HomeLogo
