import React from 'react'
import {connect} from 'react-redux'

import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const TURN_SECONDS = 30

class TimerBar extends React.Component {
  render() {
    if (this.props.turnEnded) {
      return null
    }
    return (
      <div id="timer" className="no-select">
        <CircularProgressbar
          value={this.props.timer / TURN_SECONDS * 100}
          text={`${TURN_SECONDS - Math.floor(this.props.timer)}`}
          strokeWidth={50}
          styles={buildStyles({
            strokeLinecap: 'butt',
            textColor: 'black',
            pathColor: 'red',
            trailColor: 'rgba(190, 190, 190, 0.7)'
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
