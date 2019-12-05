import React from 'react'
import {connect} from 'react-redux'
import {makeDarker, makeAlpha} from '../script/utils'

class GameStats extends React.Component {
  componentDidUpdate() {
    console.log('GAME STATS UPDATE:\t', this.props.players)
  }

  render() {
    const {socketId} = this.props.me
    const stats = this.props.players
    stats.sort((a, b) => a.score > b.score)
    this.mountedNames = {}
    return (
      <div id="current-game-stats">
        <ul>
          {stats.map(p => {
            return (
              <li key={p.socketId} className="player-info">
                <div
                  className="player-info-name"
                  ref={ref => {
                    this.mountedNames[p.socketId] = ref
                  }}
                >
                  {p.name}
                </div>
                <div className="player-info-dubloons">{p.score} dubloons</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    me: state.player,
    players: state.gameStats
  }
}

export default connect(mapState)(GameStats)
