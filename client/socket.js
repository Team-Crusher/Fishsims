import io from 'socket.io-client'
import store, {
  setMap,
  setFish,
  setBoats,
  addMessage,
  setPlayers,
  addPlayer,
  removePlayer,
  setLobbyId
} from './store'

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
    console.log('LOBBY RESULT:\t', data)
    switch (data.status) {
      case 200:
      case 201:
        store.dispatch(setPlayers(data.players))
        break
      default:
        break
    }
    // console.log(data
    store.dispatch(setLobbyId(data.lobbyId))
  })

  socket.on('player-added-to-lobby', data => {
    console.log('PLAYER ADDED TO LOBBY:\t', data)
    store.dispatch(addPlayer(data))
  })

  socket.on('player-left-lobby', data => {
    console.log('PLAYER LEFT LOBBY:\t', data)
    store.dispatch(removePlayer(data))
  })

  /**
   * Chat Stuff Below
   */

  socket.on('new-message', msg => {
    msg.time = new Date()
    store.dispatch(addMessage(msg))
  })
})

export default socket
