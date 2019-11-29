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

export const addBoat = playerName => ({
  type: ADD_BOAT,
  playerName
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
        ownerSocket: socket.id,
        ownerName: action.playerName,
        x: 320,
        y: 384,
        fishes: 0,
        moveReel: []
      }

      newBoat.sprite = makeBoatSprite(newBoat)

      return [...state, newBoat]
    default:
      return state
  }
}
