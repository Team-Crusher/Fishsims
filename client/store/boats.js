/* eslint-disable no-case-declarations */
import {makeBoatSprite} from '../script/makeBoatSprite'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const SET_BOATS = 'SET_BOATS'
const ADD_BOAT = 'ADD_BOAT'

export const setBoats = boats => ({
  type: SET_BOATS,
  boats
})

export const addBoat = (boatId, socketId, playerName, boatX, boatY) => ({
  type: ADD_BOAT,
  boatId,
  socketId,
  playerName,
  boatX,
  boatY
})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_BOATS:
      action.boats.forEach(boat => {
        if (!boat.sprite) boat.sprite = makeBoatSprite(boat)
      })

      return action.boats
    case ADD_BOAT:
      const newBoat = {
        id: action.boatId,
        ownerSocket: action.socketId ? action.socketId : socket.id,
        ownerName: action.playerName,
        x: action.boatX,
        y: action.boatY,
        fishes: {
          shallows: 0,
          openOcean: 0,
          deep: 0
        },
        fishPerTurn: 10,
        moveReel: []
      }

      newBoat.sprite = makeBoatSprite(newBoat)

      return [...state, newBoat]
    default:
      return state
  }
}
