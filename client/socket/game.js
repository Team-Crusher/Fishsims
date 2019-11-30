import store, {setMap, setFisheries} from '../store'
// put any game socket listening in here

export default socket => {
  console.log('STARTING GAME SOCKETS')
  socket.on('starting-map', map => {
    store.dispatch(setMap(map))
  })
  socket.on('spawn-players', docks => {
    store.dispatch(setFisheries(docks))
  })
  console.log('COMPLETED GAME SOCKETS')
  // The old brute force game listener
  // whenever the server sends the game state
  // socket.on('send-game-state', gameState => {
  //   // get map
  //   store.dispatch(setMap(gameState.board))
  //   // get fish
  //   store.dispatch(setFish(gameState.fish))
  //   // get boats
  //   store.dispatch(
  //     setBoats(
  //       gameState.players.reduce((acc, player) => acc.concat(player.boats), [])
  //     )
  //   )
  // })
}
