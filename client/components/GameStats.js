import React from 'react'
import {connect} from 'react-redux'
import FlipMove from 'react-flip-move'
import {makeDarker, makeAlpha} from '../script/utils'
import {ProgressBar} from './'

class GameStats extends React.Component {
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
            <FlipMove>
              {stats.map(p => {
                return (
                  <li key={p.socketId} className="player-info">
                    <div className="player-info-float">
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
                    </div>
                    <ProgressBar
                      value={p.score}
                      highest={highest}
                      emptyColor={makeDarker(p.color, 0.5)}
                      fillColor={p.color}
                      borderColor={makeDarker(p.color, 1.1)}
                    />
                  </li>
                )
              })}
            </FlipMove>
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
