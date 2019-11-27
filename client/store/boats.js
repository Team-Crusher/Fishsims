/* eslint-disable no-case-declarations */
import {Sprite} from 'pixi.js'

/**
 * ACTION TYPES
 */
const SET_BOATS = 'SET_BOATS'

export const setBoats = (boats, app, resources, spritePath) => ({
  type: SET_BOATS,
  boats,
  app,
  resources,
  spritePath
})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_BOATS:
      let boats = action.boats
      let resources = action.resources
      let spritePath = action.spritePath
      let app = action.app

      boats.forEach(boat => {
        boat.sprite = new Sprite(resources[`${spritePath}/boat.png`].texture)
        boat.sprite.position.set(boat.x, boat.y)
        app.stage.addChild(boat.sprite)
      })

      return action.boats
    default:
      return state
  }
}
