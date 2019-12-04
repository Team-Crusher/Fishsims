import React from 'react'
import './css/TimerBar.css'
import {connect} from 'react-redux'

class TimerBar extends React.Component {
  render() {
    return (
      <div id="timer-bar">
        {this.props.turnEnded ? null : (
          <React.Fragment>
            <div id="timer-title">
              <h2> Timer </h2>
            </div>
            <ProgressBar seconds={this.props.timer} />
          </React.Fragment>
        )}
      </div>
    )
  }
}

const ProgressBar = props => {
  return (
    <div className="progress-bar">
      <Filler seconds={props.seconds} />
    </div>
  )
}

const Filler = props => {
  return (
    <div className="filler" style={{width: `${300 - props.seconds * 10}px`}} />
  )
}

const mapState = state => {
  return {
    timer: state.timer,
    turnEnded: state.turnEnded
  }
}

export default connect(mapState, null)(TimerBar)
