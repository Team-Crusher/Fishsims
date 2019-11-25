import io from 'socket.io-client'
import store, {setMap, setFish, setBoats, addMessage} from './store'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.emit('new-player', socket.id)

  /**
   * Game Stuff below
   */

  // whenever the server sends the game state
  socket.on('send-game-state', gameState => {
    // get map
    store.dispatch(setMap(gameState.board))

    // get fish
    store.dispatch(
      setFish(gameState.fishes.reduce((acc, fish) => acc.concat(fish), []))
    )

    // get boats
    store.dispatch(
      setBoats(
        gameState.players.reduce((acc, player) => acc.concat(player.boats), [])
      )
    )
  })

  /**
   * Chat Stuff Below
   */

  socket.on('new-message', msg => {
    store.dispatch(addMessage(msg))
  })
})

export default socket
