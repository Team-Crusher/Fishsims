import React from 'react'
import {connect} from 'react-redux'
import {makeDarker, makeAlpha} from '../script/utils'

class PlayerInfo extends React.Component {
  componentDidMount() {
    // const {color} = this.props.me
    // const darker = makeDarker(color, 0.5)
    // this.mount.style.backgroundColor = makeAlpha(color, 0.8)
    // this.mount.style.color = darker
    // this.mount.style.borderColor = darker
    // this.dub.style.borderColor = darker
  }

  render() {
    const {name, dubloons, socketId} = this.props.me
    const players = this.props.players
    return (
      <div
        id="current-game-stats"
        className="no-select"
        // ref={ref => {
        //   this.mount = ref
        // }}
      >
        <div id="each-player-info">
          <div id="player-info-name">You: {name}</div>
          <div
            // ref={ref => {
            //   this.dub = ref
            // }}
            id="player-info-dubloons"
          >
            {dubloons} scores
          </div>
        </div>

        {/* Other players' information */}
        {players &&
          players.map(player => {
            if (player.socketId !== socketId) {
              return (
                <div id="each-player-info">
                  <div id="player-info-name">{player.name}</div>
                  <div id="player-info-dubloons">{player.score} scores</div>
                </div>
              )
            }
          })}
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

export default connect(mapState)(PlayerInfo)
