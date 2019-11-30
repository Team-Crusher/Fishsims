import {Sprite} from 'pixi.js'
import {makeFisherySprite} from '../script/makeFisherySprite'

const SET_FISHERIES = 'SET_FISHERIES'

export const setFisheries = fisheries => ({type: SET_FISHERIES, fisheries})

export default function(state = [], action) {
  switch (action.type) {
    case SET_FISHERIES:
      action.fisheries.forEach(fishery => {
        if (!fishery.sprite) fishery.sprite = makeFisherySprite(fishery)
      })

      return action.fisheries
    default:
      return state
  }
}

//export default reducer
