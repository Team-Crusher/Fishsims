/* eslint-disable max-statements */
/* eslint-disable dot-notation */

import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket/index.js'
import {addMessage} from '../store'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import Filter from 'bad-words'
const filter = new Filter({placeHolder: '🐬'})

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      in: ''
    }

    this.mapMessages = this.mapMessages.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  mapMessages() {
    console.log(this.props.messages)
    return this.props.messages.map((msg, i) => {
      return (
        <li key={i}>
          <span className="name">{msg.name}: </span>
          {msg.text}
          <small>{timeAgo.format(msg.time)}</small>
        </li>
      )
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = {
      text: filter.clean(this.state.in),
      name: this.props.me.name,
      time: new Date()
    }

    socket.emit('sending-message', message)
    this.props.addMessage(message)

    this.setState({in: ''})
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
    messages: state.chat,
    me: state.player
  }
}

const mapDispatch = dispatch => {
  return {
    addMessage: msg => dispatch(addMessage(msg))
  }
}

export default connect(mapState, mapDispatch)(Chat)
