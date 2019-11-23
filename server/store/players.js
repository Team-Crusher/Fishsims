const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'

const setPlayer = player => ({type: ADD_PLAYER, player})
const removePlayer = player => ({type: REMOVE_PLAYER, player})

const init = []

const players = function(state = init, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.player]
    case REMOVE_PLAYER:
      return state.filter(player => {
        return player.socketId !== action.player.socketId
      })

    default:
      return state
  }
}

module.exports = {players, setPlayer, removePlayer}
