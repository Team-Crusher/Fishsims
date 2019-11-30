import store, {
  setPlayers,
  addPlayer,
  removePlayer,
  setLobbyId,
  setRoute,
  setLobbyWaitingText,
  setMap
} from '../store'

import gameSockets from './game'
import chatSockets from './chat'

export default (socket, data) => {
  switch (data.status) {
    case 200: // added to lobby
    case 201: // last person to make it into lobby (no diff right now)
      break
    default:
      store.dispatch(setLobbyWaitingText(data.error))
      // TODO failed to add to lobby (add stuff here later like lobby full when you join by link etc)
      return
  }

  // all of the below only happens if the person is actually in a lobby

  store.dispatch(setLobbyId(data.lobbyId)) // sets the lobbyId if it is ever neeeded
  store.dispatch(setPlayers(data.players)) // sets init players in lobby

  socket.on('player-added-to-lobby', player => {
    store.dispatch(addPlayer(player))
  })

  socket.on('player-left-lobby', player => {
    store.dispatch(removePlayer(player))
  })

  socket.on('vote-to-start-early', player => {
    // TODO show vote next to player who votes to start early
  })

  socket.on('retract-vote-to-start-early', player => {
    // TODO remove vote next to player who retracts their vote
  })

  socket.on('game-cancel', () => {
    // TODO leave the lobby (add serverside to change status back etc...)
    store.dispatch(setRoute('HOME'))
    store.dispatch(setLobbyId(null))
  })

  socket.on('game-start', () => {
    gameSockets(socket) // attaches game listeners (and tells the server that the game sockets are ready for data)
    chatSockets(socket) // attaches chat listeners
    store.dispatch(setRoute('GAME')) // switches the view to game
  })
}
