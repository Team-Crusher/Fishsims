import React from 'react'
import {connect} from 'react-redux'
import ReactLoading from 'react-loading'
import {withRouter} from 'react-router-dom'
import socket from '../socket'
import {setRoute, setLobbyWaitingText} from '../store'
import {ShareLobby, LobbyPlayers} from './'

class Lobby extends React.Component {
  constructor() {
    super()
    this.loading = this.loading.bind(this)
    this.waiting = this.waiting.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {}
  /*
   */

  loading() {
    if (this.props.text) {
      setTimeout(() => {
        this.props.sendHome()
        this.props.history.push('/')
      }, 2000)
    }
    return (
      <div className="content blackblur">
        {this.props.text ? (
          <>
            <h1>{this.props.text}</h1>
            <h5>redirecting you back</h5>
          </>
        ) : (
          <h1>Looking for a lobby</h1>
        )}
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
        <ShareLobby lobbyId={this.props.lobbyId} />
        <h1>Waiting for players to join your lobby</h1>
        <ReactLoading type="spinningBubbles" color="#FFF" />
        <LobbyPlayers />
        <button
          onClick={this.handleClick}
          className="btn btn-dark"
          type="button"
        >
          Start The Game!
        </button>
      </div>
    )
  }

  render() {
    return this.props.lobbyId ? this.waiting() : this.loading()
  }
}

const mapState = state => {
  return {
    lobbyId: state.lobby.id,
    text: state.lobby.text
  }
}

const mapDispatch = dispatch => {
  return {
    changeColor: () => dispatch(),
    startGame: () => dispatch(setRoute('GAME')),
    sendHome: () => {
      dispatch(setRoute('HOME'))
      dispatch(setLobbyWaitingText(''))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Lobby))
