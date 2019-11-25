/* eslint-disable max-statements */
/* eslint-disable dot-notation */

import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      in: ''
    }

    this.mapMessages = this.mapMessages.bind(this)
  }

  mapMessages() {
    return this.props.messages.map((msg, i) => {
      return <li key={i}>{msg.text}</li>
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    socket.emit('sending-message', {text: this.state.in, time: new Date()})
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      in: event.target.value
    })
  }

  componentDidMount() {}

  render() {
    return (
      <div id="chat">
        <ul>{this.mapMessages()}</ul>
        <form id="chatbar" onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="fishiochat"
            value={this.state.in}
          />
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    messages: this.state.chat
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Chat)
