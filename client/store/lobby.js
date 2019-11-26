const ADD_PLAYER = 'ADD_PLAYER'
const SET_PLAYERS = 'SET_PLAYERS'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const EDIT_PLAYER = 'EDIT_PLAYER'
const SET_LOBBY_ID = 'SET_LOBBY_ID'

export const addPlayer = player => ({type: ADD_PLAYER, player})
export const setPlayers = players => ({type: SET_PLAYERS, players})
export const removePlayer = id => ({type: REMOVE_PLAYER, id})
export const editPlayer = (id, changes) => ({type: EDIT_PLAYER, id, changes})
export const setLobbyId = id => ({type: SET_LOBBY_ID, id})

const init = {
  players: [],
  id: ''
}

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYERS:
      return {...state, players: action.players}
    case ADD_PLAYER:
      return {...state, players: [...state.players, action.player]}
    case REMOVE_PLAYER:
      console.log('removing')
      return {
        ...state,
        players: state.players.filter(p => {
          console.log(p.socketId, '\t', action.id)
          return p.socketId !== action.id
        })
      }
    case EDIT_PLAYER:
      return {
        ...state,
        players: state.players.map(p => {
          if (p.id !== action.id) {
            return p
          }
          return {...p, ...action.changes}
        })
      }
    case SET_LOBBY_ID:
      return {...state, id: action.id}
    default:
      return state
  }
}
