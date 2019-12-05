import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Tab} from 'semantic-ui-react'
import store, {
  addBoat,
  adjustMoney,
  addActionToReel,
  outOfSpace
} from '../store'
import socket from '../socket'
import {TILE_SIZE} from '../script/CONSTANTS.js'
import {BuyBoat, BuyDock} from './'
import {findOpenWaterNeighbor} from '../script/utils/findOpenWaterNeighbor'

const BuyMenu = () => {
  const player = useSelector(state => state.player)
  const allFisheries = useSelector(state => state.fisheries)
  player.fisheries = allFisheries.filter(dock => dock.pId === socket.id)
  const dispatch = useDispatch()
  const boats = useSelector(state => state.boats)
  // buy boat handler
  const handleBuyBoat = (type, price) => {
    const dock = player.fisheries[0]
    const {waterNeighbors} = dock
    const newBoatId = require('uuid/v4')()

    const openWaterNeighbor = findOpenWaterNeighbor(waterNeighbors)
    if (openWaterNeighbor) {
      const newBoat = {
        row: openWaterNeighbor.row * TILE_SIZE,
        col: openWaterNeighbor.col * TILE_SIZE
      }
      dispatch(
        addBoat(
          newBoatId,
          socket.id,
          player.name,
          newBoat.col,
          newBoat.row,
          50,
          10,
          {row: newBoat.row, col: newBoat.col},
          0,
          type
        )
      )
      dispatch(adjustMoney(-1 * price))
      socket.emit('buy', store.getState().player)
      addActionToReel(newBoatId, socket.id, player.name, 'boatBuy', {
        x: newBoat.col,
        y: newBoat.row
      })
    } else {
      console.log('No open water neighbors!')
      // DISPATCH TO OCCUPIED STORE TO SUPPORT
    }

    // let currentNeighbor = waterNeighbors[0]
    // let newBoat = {
    //   row: currentNeighbor.row * TILE_SIZE,
    //   col: currentNeighbor.col * TILE_SIZE
    // }
    // for (let k = 0; k < boats.length && waterNeighbors.length; k++) {
    //   const matchingBoat = boats.find(
    //     boat => boat.x === newBoat.col && boat.y === newBoat.row
    //   )
    //   if (matchingBoat) {
    //     if (waterNeighbors.length) {
    //       console.log('Doc before wN shift: ', dock)
    //       waterNeighbors.shift()
    //       console.log('Doc after wN shift: ', dock)
    //       currentNeighbor = waterNeighbors[0]
    //     } else {
    //       //TODO: add boats on 'all sides' of boats (gotta know waterNeighbors of boats)
    //       currentNeighbor = {row: -1, col: -1}
    //     }
    //   }
    // }
    // if (currentNeighbor && currentNeighbor.row >= 0) {
    //   newBoat = {
    //     row: currentNeighbor.row * TILE_SIZE,
    //     col: currentNeighbor.col * TILE_SIZE
    //   }
    //   dispatch(
    //     addBoat(
    //       newBoatId,
    //       socket.id,
    //       player.name,
    //       newBoat.col,
    //       newBoat.row,
    //       50,
    //       10,
    //       {row: newBoat.row, col: newBoat.col},
    //       0,
    //       type
    //     )
    //   )
    //   dispatch(adjustMoney(-1 * price))
    //   socket.emit('buy', store.getState().player)
    //   addActionToReel(newBoatId, socket.id, player.name, 'boatBuy', {
    //     x: newBoat.col,
    //     y: newBoat.row
    //   })
    // } else {
    //   dispatch(outOfSpace(true))
    // // } else {
    // //   window.alert('Clear up a water space to add a new boat!')
    // }
  }
  // TODO: buy dock handler

  // tab panes
  const panes = [
    {
      menuItem: {
        key: 'basic',
        content: 'Basic Boat'
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>
            <BuyBoat
              type="basic"
              price={200}
              range={10}
              capacity={50}
              handleBuyBoat={handleBuyBoat}
            />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'bigger',
        content: `Bigger Boat`
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>
            <BuyBoat
              type="bigger"
              price={500}
              range={9}
              capacity={100}
              handleBuyBoat={handleBuyBoat}
            />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'farther',
        content: 'Farther Boat'
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>
            <BuyBoat
              type="farther"
              price={600}
              range={15}
              capacity={40}
              handleBuyBoat={handleBuyBoat}
            />
          </Tab.Pane>
        )
      }
    },
    {
      menuItem: {
        key: 'dock',
        content: 'Dock'
      },
      render: () => {
        return (
          <Tab.Pane inverted={true}>
            <BuyDock
              handleBuyDock={() => {
                console.log('soon...')
              }}
            />
          </Tab.Pane>
        )
      }
    }
  ]

  return (
    <Tab
      menu={{
        inverted: true,
        attached: true,
        color: 'grey',
        fluid: false,
        vertical: true,
        tabular: 'right'
      }}
      panes={panes}
    />
  )
}

export default BuyMenu
