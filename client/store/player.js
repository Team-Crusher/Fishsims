const SET_PLAYER = 'SET_PLAYER'
const SET_NAME = 'SET_NAME'

export const setPlayer = player => ({type: SET_PLAYER, player})
export const setName = name => ({type: SET_NAME, name})

const init = {name: 'dave'}

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYER:
      return action.player
    case SET_NAME:
      return {...state, name: action.name}
    default:
      return state
  }
}
