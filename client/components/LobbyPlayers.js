import React from 'react'
import {connect} from 'react-redux'
import {LobbyPlayerRow} from './'

class LobbyPlayers extends React.Component {
  render() {
    const players = this.props.players
    return (
      <ul className="lobby-players">
        {players.map(p => <LobbyPlayerRow key={p.socketId} player={p} />)}
      </ul>
    )
  }
}

const mapState = state => {
  return {
    players: state.lobby.players,
    lobbyId: state.lobby.id
  }
}

export default connect(mapState)(LobbyPlayers)
