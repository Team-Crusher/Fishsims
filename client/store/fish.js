import {Sprite} from 'pixi.js'
import {resources, spritePath} from '../script/game.js'
/**
 * ACTION TYPES
 */
const SET_FISHES = 'SET_FISHES'
const REMOVE_FISH = 'REMOVE_FISH' // for client-side rendering

export const setFishes = fishes => {
  const clientFishes = fishes.map(fish => {
    if (!fish.sprite)
      return {
        ...fish,
        sprite: new Sprite(resources[`${spritePath}/fishes.png`].texture)
      }
    else return fish
  })
  return {
    type: SET_FISHES,
    fishes: clientFishes
  }
}

export default function(state = [], action) {
  switch (action.type) {
    case SET_FISHES:
      console.log('here')
      return action.fishes
    default:
      return state
  }
}
