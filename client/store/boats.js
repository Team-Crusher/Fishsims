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

export const addBoat = (
  boatId,
  socketId,
  playerName,
  boatX,
  boatY,
  fuel = 100,
  maxDistance = 10
) => ({
  type: ADD_BOAT,
  boatId,
  socketId,
  playerName,
  boatX,
  boatY,
  fuel,
  maxDistance
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
        noun: action.noun,
        ownerSocket: action.socketId ? action.socketId : socket.id,
        ownerName: action.playerName,
        x: action.boatX,
        y: action.boatY,
        fuel: action.fuel,
        maxDistance: action.maxDistance,
        fishes: 0,
        moveReel: []
      }

      newBoat.sprite = makeBoatSprite(newBoat)

      return [...state, newBoat]
    default:
      return state
  }
}
