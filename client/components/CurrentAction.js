import React from 'react'
import {connect} from 'react-redux'
import store, {
  setName,
  addBoat,
  adjustMoney,
  setPixiGameState,
  addActionToReel,
  setTurnEnded,
  setStart,
  removeSelectedObject,
  setEnd
} from '../store'

const CurrentAction = props => {
  return props.pixiGameState === 'playerTurn' && !props.turnEnded ? (
    <div id="currentAction">
      <p>Select Your Actions</p>
    </div>
  ) : props.pixiGameState === 'playerTurn' ? (
    <div id="currentAction">
      <p>Waiting for other players to make their moves!</p>
    </div>
  ) : (
    <div id="currentAction">
      <p>
        {props.serverActionsReel[0] &&
          `Player ${props.serverActionsReel[0].playerName} Moving`}
      </p>
    </div>
  )
}

const mapState = state => {
  return {
    player: state.player,
    pixiGameState: state.pixiGameState,
    selectedObject: state.selectedObject,
    actionsReel: state.actionsReel,
    boats: state.boats,
    turnEnded: state.turnEnded,
    serverActionsReel: state.serverActionsReel
  }
}

export default connect(mapState, null)(CurrentAction)

//saved

{
  /* <div id="currentAction">
{props.serverActionsReel[0] ? (
  <p>{`Player ${props.serverActionsReel[0].playerName} Moving`}</p>
) : null}
</div> */
}
