const SET_PLAYER = 'SET_PLAYER'

export const setPlayer = player => ({type: SET_PLAYER, player})

const init = {name: 'dave'}

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYER:
      return action.player
    default:
      return state
  }
}
