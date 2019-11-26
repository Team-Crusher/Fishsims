const ADD_PLAYER = 'ADD_PLAYER'
const SET_PLAYERS = 'SET_PLAYERS'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const EDIT_PLAYER = 'EDIT_PLAYER'

export const addPlayer = player => ({type: ADD_PLAYER, player})
export const setPlayers = players => ({type: SET_PLAYERS, players})
export const removePlayer = id => ({type: REMOVE_PLAYER, id})
export const editPlayer = id => ({type: EDIT_PLAYER, id})

const init = []

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYERS:
      return action.players
    case ADD_PLAYER:
      return [...state, action.player]
    case REMOVE_PLAYER:
      return state.filter(p => p.id !== action.id)
    case EDIT_PLAYER:
      return state.map(p => {
        if (p.id !== action.id) {
          return p
        }
        return {...p, ...action.changes}
      })
    default:
      return state
  }
}
