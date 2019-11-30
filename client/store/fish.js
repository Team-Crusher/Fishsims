import {Sprite} from 'pixi.js'
import {makeFishSprite} from '../script/makeFishSprite'

const SET_FISHES = 'SET_FISHES'
const UPDATE_FISH = 'UPDATE_FISH'
const REMOVE_FISH = 'REMOVE_FISH' // for client-side rendering

export const setFishes = fishes => ({type: SET_FISHES, fishes})
export const updateFish = fish => ({type: UPDATE_FISH, fish})

export default function(state = [], action) {
  switch (action.type) {
    case SET_FISHES:
      action.fishes.forEach(fish => {
        if (!fish.sprite) fish.sprite = makeFishSprite(fish)
      })
      return action.fishes

    case UPDATE_FISH: {
      const updatedFish = state.fish.filter(fish => fish.id === action.fish.id)
      updatedFish.pop = action.fish.pop
      const existedFish = state.fish.filter(fish => fish.id !== action.fish.id)
      return [existedFish, updatedFish]
    }

    default:
      return state
  }
}

//export default reducer
