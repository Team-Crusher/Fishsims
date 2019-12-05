import React from 'react'
import {connect} from 'react-redux'

import {Timer} from './'

const CurrentAction = props => {
  return props.pixiGameState === 'playerTurn' && !props.turnEnded ? (
    <div id="currentAction">
      <h3>Make your move!</h3>
      <Timer />
    </div>
  ) : props.pixiGameState === 'playerTurn' ? (
    <div id="currentAction">
      <h3>Waiting for other players to make their moves!</h3>
      <Timer />
    </div>
  ) : (
    <div id="currentAction">
      <h3>Everyone is Moving!</h3>
    </div>
  )
}

const mapState = state => {
  return {
    pixiGameState: state.pixiGameState,
    turnEnded: state.turnEnded,
    serverActionsReel: state.serverActionsReel
  }
}

export default connect(mapState, null)(CurrentAction)
