//import {Sprite} from 'pixi.js'
//import makeFishSprite from '../script/makeFishSprite'

const SET_FISHES = 'SET_FISHES'
const UPDATE_FISH = 'UPDATE_FISH'
const REMOVE_FISH = 'REMOVE_FISH' // for client-side rendering

export const setFishes = fishes => ({type: SET_FISHES, fishes})
export const updateFish = fish => ({type: UPDATE_FISH, fish})
export const removeFish = fishId => ({type: REMOVE_FISH, fishId})

export default function(state = [], action) {
  switch (action.type) {
    case SET_FISHES:
      return action.fishes
    case UPDATE_FISH:
      return [...state.filter(f => f.id !== action.fish.id), action.fish]
    case REMOVE_FISH:
      return state.filter(f => f.id !== action.fishId)
    default:
      return state
  }
}
