const SET_SELECTEDOBJECT = 'SET_SELECTEDOBJECT'
const REMOVE_SELECTEDOBJECT = 'REMOVE_SELECTEDOBJECT'
import {clearRange} from '../script/makeBoatSprite'

export const setSelectedObject = object => ({type: SET_SELECTEDOBJECT, object})

export const removeSelectedObject = () => ({type: REMOVE_SELECTEDOBJECT})

const init = {}

export default function(state = init, action) {
  switch (action.type) {
    case SET_SELECTEDOBJECT:
      return action.object
    case REMOVE_SELECTEDOBJECT:
      clearRange()
      return init
    default:
      return state
  }
}
