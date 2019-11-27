import React from 'react'
import {connect} from 'react-redux'
import Routes from './routes'

const App = () => {
  return <Routes />
}

const mapStateToProps = state => {
  return {
    route: state.route
  }
}

export default connect(mapStateToProps)(App)
