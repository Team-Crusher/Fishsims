import store, {setMap, setPFGrid} from '../store'

// put any game socket listening in here
export default socket => {
  // init stuff

  socket.on('starting-map', map => {
    store.dispatch(setMap(map))
    store.dispatch(setPFGrid(map))
  })
  // let the server know the client connected to the game
  // make sure this is after any socket on's
  socket.emit('connected-to-game')
}
