import React from 'react'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import socket from '../socket'
import {
  setName,
  adjustMoney,
  setPixiGameState,
  addActionToReel,
  setTurnEnded,
  removeSelectedObject
} from '../store'
import {selectedSprite} from '../script/sprites'

class EndTurn extends React.Component {
  constructor() {
    super()
    this.handleEndTurn = this.handleEndTurn.bind(this)
  }

  handleEndTurn() {
    // Turn data will be sent to the server to aggregate for computer turn
    const turnData = {
      actionsReel: this.props.actionsReel
    }
    socket.emit('end-turn', turnData)
    this.props.setTurnEnd(true)
    this.props.removeSelectedObject({})
    selectedSprite.isSelected = false
  }

  render() {
    const pixiGameState = this.props.pixiGameState
    return pixiGameState === 'playerTurn' && !this.props.turnEnded ? (
      <div id="end-turn-btn">
        <Button
          color="orange"
          fluid
          onClick={this.handleEndTurn}
          content="End Turn"
        />
      </div>
    ) : null
  }
}

const mapState = state => {
  return {
    me: state.player,
    pixiGameState: state.pixiGameState,
    selectedObject: state.selectedObject,
    actionsReel: state.actionsReel,
    boats: state.boats,
    turnEnded: state.turnEnded
  }
}

const mapDispatch = dispatch => {
  return {
    setName: () => dispatch(setName()),
    setPixiGameState: state => dispatch(setPixiGameState(state)),
    adjustPlayerMoney: value => dispatch(adjustMoney(value)),
    addAction: (
      objectId,
      socketId,
      playerName,
      reelActionType,
      reelActionDetail
    ) =>
      dispatch(
        addActionToReel(
          objectId,
          socketId,
          playerName,
          reelActionType,
          reelActionDetail
        )
      ),
    setTurnEnd: bool => dispatch(setTurnEnded(bool)),
    removeSelectedObject: () => dispatch(removeSelectedObject())
  }
}

export default connect(mapState, mapDispatch)(EndTurn)
