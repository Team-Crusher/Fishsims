import React from 'react'
import {connect} from 'react-redux'
import store, {
  setName,
  addBoat,
  adjustMoney,
  setPixiGameState,
  addActionToReel,
  setTurnEnded
} from '../store'
import socket from '../socket'
import {TILE_SIZE} from '../script/drawMap.js'
import {getWaterNeighbors, getWater} from '../../utilityMethods.js'
import {path} from '../../server/script/pathfinding.js'

/*let i = 0 // keeps track of boat placement at a dock
   const toggleParity = n => Math.pow(-1, n)*/

class ControlPanel extends React.Component {
  constructor() {
    super()
    this.handleBuyBoat = this.handleBuyBoat.bind(this)
    this.handleEndTurn = this.handleEndTurn.bind(this)
    this.handleCommitMovesToReel = this.handleCommitMovesToReel.bind(this)
  }
  handleBuyBoat() {
    this.props.player.fisheries = store
      .getState()
      .fisheries.filter(dock => dock.pId === socket.id)
    const {addBoatToStore, adjustPlayerMoney, player, addAction} = this.props
    const dock = this.props.player.fisheries[0]
    const {waterNeighbors} = dock
    const newBoatId = require('uuid/v4')()

    let currentNeighbor = waterNeighbors[0]
    let newBoat = {
      row: currentNeighbor.row * TILE_SIZE,
      col: currentNeighbor.col * TILE_SIZE
    }

    const boatsSoFar = this.props.boats
    for (let k = 0; k < boatsSoFar.length && waterNeighbors.length; k++) {
      const matchingBoat = boatsSoFar.find(
        boat => boat.x === newBoat.col && boat.y === newBoat.row
      )
      if (matchingBoat) {
        if (waterNeighbors.length) {
          waterNeighbors.shift()
          currentNeighbor = waterNeighbors[0]
        } else {
          //TODO: add boats on 'all sides' of boats (gotta know waterNeighbors of boats)
          currentNeighbor = {row: -1, col: -1}
        }
      }
    }
    if (currentNeighbor && currentNeighbor.row >= 0) {
      newBoat = {
        row: currentNeighbor.row * TILE_SIZE,
        col: currentNeighbor.col * TILE_SIZE
      }
      addBoatToStore(
        newBoatId,
        socket.id,
        player.name,
        newBoat.col,
        newBoat.row,
        100,
        10,
        {row: newBoat.row, col: newBoat.col},
        0
      )
      adjustPlayerMoney(-500)
      addAction(newBoatId, socket.id, player.name, 'boatBuy', {
        x: newBoat.col,
        y: newBoat.row
      })
    } else {
      alert("Out of space at this dock! You'll need to save up for another.")
    }
  }

  handleCommitMovesToReel() {
    // This is just here to demonstrate what needs to happen after a user selects a boat destination, in order for its moves to be committed to the overall actionsReel that is sent to the server. To use it: 1) make sure you're on playerTurn; 2) select a boat; 3) click arrow keys to plan moves; 4) click 'Commit Moves to Reel'. You can plan moves for several boats before ending playerTurn, just make sure you commit each one's moves before selecting another boat.

    const {selectedObject, addAction, player} = this.props
    const {maxDistance, fuel} = selectedObject

    const {map} = store.getState()
    const {start} = store.getState().pf
    const waterTiles = getWater(map)
    const end = waterTiles[Math.floor(Math.random() * waterTiles.length)]
    const theWay = path(
      {x: start.col, y: start.row},
      {x: end.col, y: end.row},
      map
    )
    console.log(theWay)
    selectedObject.moveReel = theWay
    const diff = selectedObject.moveReel.length - maxDistance
    console.log(diff)

    if (diff > 0) {
      selectedObject.moveReel.splice(maxDistance - 1, diff)
    }
    if (selectedObject.moveReel.length) {
      addAction(
        selectedObject.id,
        socket.id,
        player.name,
        'boatMove',
        selectedObject.moveReel
      )
      selectedObject.moveReel = []
    }
  }

  handleEndTurn() {
    // Turn data will be sent to the server to aggregate for computer turn
    const turnData = {
      actionsReel: this.props.actionsReel
    }
    socket.emit('end-turn', turnData)
    this.props.setTurnEnd(true)
  }

  render() {
    const {name, dubloons} = this.props.player
    const pixiGameState = this.props.pixiGameState

    return store.getState() ? (
      <div id="controlPanel">
        <div>
          <div>You are: {name}</div>
          <div>Dubloons: {dubloons}d</div>
        </div>
        <button type="button" name="buyBoat" onClick={this.handleBuyBoat}>
          Buy Boat (500d)
        </button>
        {pixiGameState === 'playerTurn' && !this.props.turnEnded ? (
          <React.Fragment>
            <button
              type="button"
              name="commitMoves"
              onClick={this.handleCommitMovesToReel}
            >
              Commit selected boat's moves to reel
            </button>
            <button type="button" name="endTurn" onClick={this.handleEndTurn}>
              End Turn
            </button>
          </React.Fragment>
        ) : pixiGameState === 'playerTurn' ? (
          <div>Waiting for other players to make their moves!</div>
        ) : (
          <div>Watching last round's moves!</div>
        )}
      </div>
    ) : null
  }
}

const mapState = state => {
  return {
    player: state.player,
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
    addBoatToStore: (boatId, socketId, playerName, boatX, boatY) =>
      dispatch(addBoat(boatId, socketId, playerName, boatX, boatY)),
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
    setTurnEnd: bool => dispatch(setTurnEnded(bool))
  }
}

export default connect(mapState, mapDispatch)(ControlPanel)
