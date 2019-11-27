import React from 'react'
import {connect} from 'react-redux'
import socket from '../socket'
import ReactLoading from 'react-loading'
import {setRoute} from '../store'

class Lobby extends React.Component {
  constructor() {
    super()
    this.loading = this.loading.bind(this)
    this.waiting = this.waiting.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleClick() {
    socket.emit('force-game', this.props.lobbyId)
    this.props.startGame()
  }

  waiting() {
    return (
      <div className="content lobby blackblur">
        <h1>Waiting for players to join {this.props.lobbyId}</h1>
        <ReactLoading type="spinningBubbles" color="#FFF" />
        <ul>
          {this.props.players.map(p => <li key={p.socketId}>{p.name}</li>)}
        </ul>
        <button onClick={this.handleClick} type="button">
          Skip to playing
        </button>
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
    changeColor: () => dispatch(),
    startGame: () => dispatch(setRoute('GAME'))
  }
}

export default connect(mapState, mapDispatch)(Lobby)
