import React from 'react'
import {connect} from 'react-redux'
import {Game, Background, Chat, Lobby, Name} from './components'

const Routes = props => {
  return (
    <>
      {props.route === 'HOME' || props.route === 'LOBBY' ? (
        <Background />
      ) : null}
      {props.route === 'HOME' ? <Name /> : null}
      {props.route === 'LOBBY' ? <Lobby /> : null}
      {props.route === 'GAME' ? (
        <>
          <Game />
          {/* <Chat /> */}
        </>
      ) : null}
    </>
  )
}

const mapState = state => {
  return {
    route: state.route
  }
}

export default connect(mapState)(Routes)
