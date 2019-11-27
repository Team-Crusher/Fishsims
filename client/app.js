import React from 'react'
import {connect} from 'react-redux'
import {Game, Background, Chat, Lobby, Name, GameOLD} from './components'
import socket from './socket'

const App = props => {
  return (
    <div>
      {props.route === 'HOME' || props.route === 'LOBBY' ? (
        <Background />
      ) : null}
      {props.route === 'HOME' ? <Name /> : null}
      {props.route === 'LOBBY' ? <Lobby /> : null}
      {props.route === 'GAME' ? (
        <>
          <Game />
          {/*<Chat />*/}
        </>
      ) : null}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    route: state.route
  }
}

export default connect(mapStateToProps)(App)
