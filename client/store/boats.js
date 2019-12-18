/* eslint-disable no-case-declarations */
import {makeBoatSprite} from '../script/sprites'
import socket from '../socket'

/**
 * ACTION TYPES
 */
const SET_BOATS = 'SET_BOATS'
const ADD_BOAT = 'ADD_BOAT'
const UPDATE_BOAT = 'UPDATE_BOAT'

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
  capacity = 50,
  maxDistance = 10,
  dockingCoords,
  distanceToDock = 0,
  whichType = 'basic'
) => ({
  type: ADD_BOAT,
  boatId,
  socketId,
  playerName,
  boatX,
  boatY,
  capacity,
  maxDistance,
  dockingCoords,
  distanceToDock,
  whichType
})

export const updateBoat = boat => ({
  type: UPDATE_BOAT,
  boat
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
        fishes: {
          shallows: 0,
          openOcean: 0,
          deep: 0
        },
        fishPerTurn: 10,
        maxFishes: action.capacity,
        capacity: action.capacity,
        maxDistance: action.maxDistance,
        dockingCoords: action.dockingCoords,
        distanceToDock: action.distanceToDock,
        type: action.whichType,
        status: 'Idle'
      }

      newBoat.sprite = makeBoatSprite(newBoat)

      return [...state, newBoat]
    case UPDATE_BOAT:
      const notThisBoat = state.filter(b => b.id !== action.boat.id)
      return [...notThisBoat, action.boat]
    default:
      return state
  }
}
