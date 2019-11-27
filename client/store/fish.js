import {Sprite} from 'pixi.js'

const SET_FISHES = 'SET_FISHES'
const REMOVE_FISH = 'REMOVE_FISH' // for client-side rendering

export const setFishes = (fishes, resources, spritePath) => {
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

const reducer = (state = [], action) => {
  switch (action.type) {
    case SET_FISHES:
      return action.fishes
    default:
      return state
  }
}

export default reducer
