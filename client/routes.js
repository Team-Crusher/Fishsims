import React from 'react'
import {connect} from 'react-redux'
import {Game, Background, Chat, Lobby, Home, Leaderboards} from './components'

const backers = ['HOME', 'LOBBY', 'LEADERBOARDS']
const Routes = props => {
  return (
    <>
      {backers.indexOf(props.route) !== -1 ? <Background /> : null}
      {props.route === 'LEADERBOARDS' ? <Leaderboards /> : null}
      {props.route === 'HOME' ? <Home /> : null}
      {props.route === 'LOBBY' ? <Lobby /> : null}
      {props.route === 'GAME' ? (
        <>
          <Game />
          <Chat />
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
