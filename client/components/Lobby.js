import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
import ReactLoading from 'react-loading'

class Lobby extends React.Component {
  constructor() {
    super()
    this.loading = this.loading.bind(this)
    this.waiting = this.waiting.bind(this)
  }

  componentDidMount() {}

  loading() {
    return (
      <div className="content blackblur">
        <h1>Looking for a lobby</h1>
        <ReactLoading type="spinningBubbles" color="#FFF" />
      </div>
    )
  }

  waiting() {
    return (
      <div className="content lobby">
        <h1>Waiting for players to join</h1>
        <ul>
          {this.props.players.map(p => <li key={p.socketId}>{p.name}</li>)}
        </ul>
      </div>
    )
  }

  render() {
    return this.props.players.length ? this.waiting() : this.loading()
  }
}

const mapState = state => {
  return {
    players: state.lobby.players,
    lobbyId: state.lobby.id
  }
}

const mapDispatch = dispatch => {
  return {
    changeColor: dispatch
  }
}

export default connect(mapState, mapDispatch)(Lobby)
