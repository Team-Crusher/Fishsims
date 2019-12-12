const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

const addPlayer = player => ({type: ADD_PLAYER, player})
const removePlayer = socketId => ({type: REMOVE_PLAYER, socketId})

const init = []

const players = function(state = init, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.player]
    case REMOVE_PLAYER:
      return state.filter(player => {
        return player.socketId !== action.socketId
      })
    default:
      return state
  }
}

module.exports = {
  players,
  addPlayer,
  removePlayer
}
