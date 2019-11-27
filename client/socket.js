import io from 'socket.io-client'
import store, {
  setMap,
  setFishes,
  setBoats,
  addMessage,
  setPlayers,
  addPlayer,
  removePlayer,
  setLobbyId,
  setRoute
} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  // socket.emit('new-player', socket.id)

  /**
   * Game Stuff below
   */

  /*
  socket.on('send-fish', state => {
    store.dispatch(setFishes())
  })
  */

  // whenever the server sends the game state
  socket.on('send-game-state', gameState => {
    // get map
    store.dispatch(setMap(gameState.board))

    // get fish
    store.dispatch(setFishes(gameState.fishes))

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

    socket.on('player-added-to-lobby', player => {
      console.log('PLAYER ADDED TO LOBBY:\t', player)
      store.dispatch(addPlayer(player))
    })

    socket.on('player-left-lobby', player => {
      console.log('PLAYER LEFT LOBBY:\t', player)
      store.dispatch(removePlayer(player))
    })

    socket.on('game-start', () => {
      store.dispatch(setRoute('GAME'))
    })
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
