/* eslint-disable max-statements */
/* eslint-disable dot-notation */

import React from 'react'
import {connect} from 'react-redux'
import {CSSTransition} from 'react-transition-group'
import socket from '../socket/index.js'
import {addMessage} from '../store'
import {Message} from './'

import Filter from 'bad-words'
const filter = new Filter({placeHolder: '🐬'})

class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      in: '',
      display: false,
      time: new Date()
    }

    this.mapMessages = this.mapMessages.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.expand = this.expand.bind(this)
  }

  mapMessages() {
    return this.props.messages.map((msg, i) => {
      return (
        // messages are not permanant so the idx is fine
        <Message
          key={i}
          message={msg}
          previous={i ? this.props.messages[i - 1] : null}
        />
      )
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const message = {
      text: filter.clean(this.state.in),
      name: this.props.me.name,
      color: this.props.me.color,
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

  expand(e) {
    e.preventDefault()
    this.setState(state => ({
      ...state,
      display: !state.display
    }))
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({time: Date.now()})
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    this.messages.scrollTop = this.messages.scrollHeight
  }

  render() {
    return (
      <CSSTransition in={this.state.display} timeout={350} classNames="chatter">
        <div className="chat">
          <div id="chat-tab" onClick={this.expand}>
            <div id="chat-icon">
              <a>
                <i className="far fa-comment-dots" />
              </a>
            </div>
            <div id="chat-bar">
              <p className="no-select">notification text</p>
            </div>
          </div>
          <div id="chat-content">
            <ul
              id="chat-messages"
              ref={ref => {
                this.messages = ref
              }}
            >
              {this.mapMessages()}
            </ul>
            <form id="chatbar" onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleChange}
                autoComplete="off"
                name="fishiochat"
                value={this.state.in}
              />
            </form>
          </div>
        </div>
      </CSSTransition>
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
