const ADD_PLAYER = 'ADD_PLAYER'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const CHANGE_NAME = 'CHANGE_NAME'
const ADD_BOAT = 'ADD_BOAT'

const addPlayer = player => ({type: ADD_PLAYER, player})
const removePlayer = socketId => ({type: REMOVE_PLAYER, socketId})
const changeName = (id, name) => ({type: CHANGE_NAME, id, name})
const addBoat = (id, boat) => ({type: ADD_BOAT, id, boat})

const init = []

const players = function(state = init, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return [...state, action.player]
    case CHANGE_NAME:
      return state.map(player => {
        if (player.socketId === action.id) {
          return {...player, name: action.name}
        }
        return player
      })
    case ADD_BOAT:
      return state.map(player => {
        if (player.socketId === action.id) {
          return {...player, boats: [...player.boats, action.boat]}
        }
        return player
      })
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
  removePlayer,
  changeName,
  addBoat
}
