const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const CHANGE_NAME = 'CHANGE_NAME'

const setPlayer = player => ({type: ADD_PLAYER, player})
const removePlayer = player => ({type: REMOVE_PLAYER, player})
const changeName = (id, name) => ({type: CHANGE_NAME, id: id, name: name})

const init = []

const players = function(state = init, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.player]
    case CHANGE_NAME:
      return state.map(player => {
        if (player.id === action.id) {
          return {...player, name: action.name}
        }
        return player
      })
    case REMOVE_PLAYER:
      return state.filter(player => {
        return player.socketId !== action.player.socketId
      })

    default:
      return state
  }
}

module.exports = {players, setPlayer, removePlayer, changeName}
