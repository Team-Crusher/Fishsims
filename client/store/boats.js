/* eslint-disable no-case-declarations */
import {Sprite, Text} from 'pixi.js'
import {stage, resources, boatImage} from '../script/game'
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
        if (!boat.sprite) {
          boat.sprite = new Sprite(resources[boatImage].texture)
          boat.sprite.position.set(boat.x, boat.y)
          stage.addChild(boat.sprite)

          const nameText = new Text(boat.ownerName, {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 'white',
            align: 'center'
          })

          boat.sprite.addChild(nameText)
          nameText.y += 24
        }
      })

      return action.boats
    case ADD_BOAT:
      const newBoat = {
        ownerSocket: socket.id,
        ownerName: action.playerName,
        sprite: new Sprite(resources[boatImage].texture),
        x: 320,
        y: 384,
        fishes: 0,
        moveReel: []
      }

      newBoat.sprite.position.set(newBoat.x, newBoat.y)
      stage.addChild(newBoat.sprite)

      const nameText = new Text(newBoat.ownerName, {
        fontFamily: 'Arial',
        fontSize: 12,
        fill: 'white',
        align: 'center'
      })

      newBoat.sprite.addChild(nameText)
      nameText.y += 24

      return [...state, newBoat]
    default:
      return state
  }
}
