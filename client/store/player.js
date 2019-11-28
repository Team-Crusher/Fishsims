const SET_PLAYER = 'SET_PLAYER'
const SET_NAME = 'SET_NAME'
const ADD_BOAT = 'ADD_BOAT'

export const setPlayer = player => ({type: SET_PLAYER, player})
export const setName = name => ({type: SET_NAME, name})

const init = {name: 'dave', dubloons: 500}

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYER:
      return action.player
    case SET_NAME:
      return {...state, name: action.name}
    case ADD_BOAT:
      return {...state, dubloons: state.dubloons - 500}
    default:
      return state
  }
}
