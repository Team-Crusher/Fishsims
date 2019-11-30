import React from 'react'
import {connect} from 'react-redux'
import {fetchLeaderboards, setRoute} from '../store'

class Leaderboards extends React.Component {
  componentDidMount() {
    // this.props.load()
  }

  render() {
    return (
      <div className="content blackblur">
        <div className="title-box">
          <h1>Leaderboards</h1>
          <h5>all time high scores</h5>
        </div>

        <div className="top-left-btns">
          <button
            onClick={() => this.props.gotoHome()}
            type="button"
            className="btn btn-dark"
          >
            Back
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    load: () => dispatch(fetchLeaderboards()),
    gotoHome: () => dispatch(setRoute('HOME'))
  }
}

export default connect(mapState, mapDispatch)(Leaderboards)
