const ADD_PLAYER = 'ADD_PLAYER'
const SET_PLAYERS = 'SET_PLAYERS'
const REMOVE_PLAYER = 'REMOVE_PLAYER'
const EDIT_PLAYER = 'EDIT_PLAYER'
const SET_LOBBY_ID = 'SET_LOBBY_ID'
const SET_LOBBY_WAITING_TEXT = 'SET_LOBBY_WAITING_TEXT'

export const addPlayer = player => ({type: ADD_PLAYER, player})
export const setPlayers = players => ({type: SET_PLAYERS, players})
export const removePlayer = id => ({type: REMOVE_PLAYER, id})
export const editPlayer = (id, changes) => ({type: EDIT_PLAYER, id, changes})
export const setLobbyId = id => ({type: SET_LOBBY_ID, id})
export const setLobbyWaitingText = text => ({
  type: SET_LOBBY_WAITING_TEXT,
  text
})

const init = {
  players: [],
  id: '',
  text: ''
}

export default function(state = init, action) {
  switch (action.type) {
    case SET_PLAYERS:
      return {...state, players: action.players}
    case ADD_PLAYER:
      return {...state, players: [...state.players, action.player]}
    case REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter(p => {
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
    case SET_LOBBY_WAITING_TEXT:
      return {...state, text: action.text}
    default:
      return state
  }
}
