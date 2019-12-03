import React from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {makeDarker} from '../script/utils'

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

class Message extends React.Component {
  constructor() {
    super()
    this.showName = this.showName.bind(this)
  }

  componentDidMount() {
    if (this.from) {
      this.from.style.color = this.props.message.color
      this.from.style.backgroundColor = makeDarker(
        this.props.message.color,
        0.5
      )
    }
  }

  showName() {
    const msg = this.props.message
    const prev = this.props.previous
    if (prev) {
      const timeD = msg.time.getTime() - prev.time.getTime()
      return prev.name !== msg.name || timeD > 60000
    } else {
      return true
    }
  }

  render() {
    const msg = this.props.message

    return (
      <li
        className="indv-message"
        ref={ref => {
          this.message = ref
        }}
      >
        <div>
          {this.showName() ? (
            <div className="message-from">
              <span
                className="message-from-name"
                ref={ref => {
                  this.from = ref
                }}
              >
                {msg.name}
              </span>
              <small> {timeAgo.format(msg.time)}:</small>
            </div>
          ) : null}
          <div className="message-text">{msg.text}</div>
        </div>
      </li>
    )
  }
}

export default Message
