const SET_PLAYER = 'SET_PLAYER'
const SET_NAME = 'SET_NAME'
const ADJUST_MONEY = 'ADJUST_MONEY'

export const setPlayer = player => ({type: SET_PLAYER, player})
export const setName = name => ({type: SET_NAME, name})
export const adjustMoney = value => ({type: ADJUST_MONEY, value})

const init = {name: 'dave', dubloons: 500, color: 'rgb(0,255,0)'}

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYER:
      return action.player
    case SET_NAME:
      return {...state, name: action.name}
    case ADJUST_MONEY:
      return {...state, dubloons: state.dubloons + action.value}
    default:
      return state
  }
}
