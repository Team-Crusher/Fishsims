import React from 'react'
import {connect} from 'react-redux'
import {makeDarker, makeAlpha} from '../script/utils'
import {ProgressBar} from './'

class GameStats extends React.Component {
  componentDidUpdate() {
    console.log('GAME STATS UPDATE:\t', this.props.players)
  }

  render() {
    const {socketId} = this.props.me
    const stats = this.props.players
    if (stats.length) {
      stats.sort((a, b) => b.score - a.score)
      let highest = stats[0].score
      this.mountedNames = {}
      return (
        <div id="current-game-stats" className="no-select">
          <ul>
            {stats.map(p => {
              return (
                <li key={p.socketId} className="player-info">
                  <ProgressBar value={p.score} highest={highest}>
                    <div
                      className="player-info-name"
                      ref={ref => {
                        this.mountedNames[p.socketId] = ref
                      }}
                    >
                      {p.name}
                    </div>
                    <div className="player-info-dubloons">
                      {p.score} dubloons
                    </div>
                  </ProgressBar>
                </li>
              )
            })}
          </ul>
        </div>
      )
    } else {
      return <div id="current-game-stats" />
    }
  }
}

const mapState = state => {
  return {
    me: state.player,
    players: state.gameStats
  }
}

export default connect(mapState)(GameStats)
