import io from 'socket.io-client'
import store, {
  setMap,
  setFish,
  setBoats,
  addMessage,
  setPlayers,
  addPlayer,
  removePlayer,
  setLobbyId,
  setRoute
} from '../store'

import chatSocket from './chat'
import lobbySocket from './lobby'
const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  // socket.emit('new-player', socket.id)

  /**
   * Game Stuff below
   */

  // whenever the server sends the game state
  socket.on('send-game-state', gameState => {
    // get map
    store.dispatch(setMap(gameState.board))

    // get fish
    store.dispatch(setFish(gameState.fish))

    // get boats
    store.dispatch(
      setBoats(
        gameState.players.reduce((acc, player) => acc.concat(player.boats), [])
      )
    )
  })

  socket.on('lobby-result', data => {
    lobbySocket(socket, data) // on player leave and join

    socket.on('game-start', () => {
      store.dispatch(setRoute('GAME'))
    })
  })

  /**
   * Chat Stuff Below
   */

  chatSocket(socket)
})

export default socket
