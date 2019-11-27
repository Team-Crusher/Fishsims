/* eslint-disable no-case-declarations */
import {Sprite} from 'pixi.js'
import {stage, resources, boatImage} from '../script/game'
/**
 * ACTION TYPES
 */
const SET_BOATS = 'SET_BOATS'
const BUY_BOAT = 'BUY_BOAT'

export const setBoats = boats => ({
  type: SET_BOATS,
  boats
})

export const buyBoat = socketId => ({
  type: BUY_BOAT,
  socketId
})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_BOATS:
      let boats = action.boats

      boats.forEach(boat => {
        if (!boat.sprite) {
          boat.sprite = new Sprite(resources[boatImage].texture)
          boat.sprite.position.set(boat.x, boat.y)
          stage.addChild(boat.sprite)
        }
      })

      return action.boats
    case BUY_BOAT:
      const newBoat = {
        ownerSocket: action.socketId,
        ownerName: 'Bookie',
        sprite: null,
        x: 320,
        y: 320,
        fishes: 0,
        moveReel: []
      }

      return [...state, newBoat]
    default:
      return state
  }
}
