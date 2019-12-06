import React from 'react'
import {connect} from 'react-redux'
import {Game} from './components'

const Routes = props => {
  return <Game />
}

const mapState = state => {
  return {}
}

export default connect(mapState)(Routes)
