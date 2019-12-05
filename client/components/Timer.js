import React from 'react'
import {connect} from 'react-redux'

import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

class TimerBar extends React.Component {
  render() {
    if (this.props.turnEnded) {
      return null
    }
    return (
      <div id="timer-bar" className="no-select">
        <CircularProgressbar
          value={this.props.timer / 30 * 100}
          text={`${30 - this.props.timer}`}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: 'butt'
          })}
        />
      </div>
    )
  }
}
const mapState = state => {
  return {
    timer: state.timer,
    turnEnded: state.turnEnded
  }
}

export default connect(mapState, null)(TimerBar)
