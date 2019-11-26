import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
import ReactLoading from 'react-loading'

class Chat extends React.Component {
  constructor() {
    super()
    this.loading = this.loading.bind(this)
  }

  componentDidMount() {}

  loading() {
    return (
      <div className="content blackblur">
        <h1>Looking for a lobby</h1>
        <ReactLoading type="bubbles" color="#FFF" />
      </div>
    )
  }

  render() {
    return this.loading()
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Chat)
