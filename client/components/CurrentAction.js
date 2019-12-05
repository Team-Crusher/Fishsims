import React from 'react'
import {connect} from 'react-redux'

import {Timer} from './'

const CurrentAction = props => {
  console.log(props.pixiGameState)
  return props.pixiGameState === 'playerTurn' && !props.turnEnded ? (
    <div id="currentAction">
      <h3>Make your move!</h3>
      <Timer />
    </div>
  ) : props.pixiGameState === 'playerTurn' ? (
    <div id="currentAction">
      <h3>Waiting for other players to make their moves!</h3>
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

//saved

{
  /* <div id="currentAction">
{props.serverActionsReel[0] ? (
  <h3>{`Player ${props.serverActionsReel[0].playerName} Moving`}</h3>
) : null}
</div> */
}
