import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Table, Button} from 'semantic-ui-react'
import {addBoat, adjustMoney, addActionToReel} from '../store'
import socket from '../socket'
const {TILE_SIZE} = require('../script/CONSTANTS')

const BasicBoat = () => {
  const player = useSelector(state => state.player)
  const allFisheries = useSelector(state => state.fisheries)
  player.fisheries = allFisheries.filter(dock => dock.pId === socket.id)
  const dispatch = useDispatch()
  const boats = useSelector(state => state.boats)

  // buy boat handler
  const handleBuyBoat = (type, price, capacity, range) => {
    const dock = player.fisheries[0]
    const {waterNeighbors} = dock
    const newBoatId = require('uuid/v4')()
    let currentNeighbor = waterNeighbors[0]
    let newBoat = {
      row: currentNeighbor.row * TILE_SIZE,
      col: currentNeighbor.col * TILE_SIZE
    }

    for (let k = 0; k < boats.length && waterNeighbors.length; k++) {
      const matchingBoat = boats.find(
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
      dispatch(
        addBoat(
          newBoatId,
          socket.id,
          player.name,
          newBoat.col,
          newBoat.row,
          100,
          10,
          {row: newBoat.row, col: newBoat.col},
          0,
          type
        )
      )
      dispatch(adjustMoney(-1 * price))
      dispatch(
        addActionToReel(newBoatId, socket.id, player.name, 'boatBuy', {
          x: newBoat.col,
          y: newBoat.row
        })
      )
    } else {
      alert("Out of space at this dock! You'll need to save up for another.")
    }
  }
  return (
    <div>
      <div className="boat-buy-info">
        <div className="boat-buy-column">
          <div>Capacity</div>
          <div>Range</div>
          <div>Price</div>
        </div>
        <div className="boat-buy-column">
          <div>50</div>
          <div>10</div>
          <div>500d</div>
        </div>
      </div>

      <Button inverted onClick={() => handleBuyBoat('basic', 500)}>
        Buy
      </Button>
    </div>
  )
}

export default BasicBoat
