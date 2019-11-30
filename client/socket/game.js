import store, {setMap, setFisheries, setPFGrid} from '../store'
// put any game socket listening in here

export default socket => {
  socket.on('starting-map', map => {
    store.dispatch(setMap(map))
    store.dispatch(setPFGrid(map))
  })
  socket.on('spawn-players', docks => {
    store.dispatch(setFisheries(docks))
  })

  // let the server know the client connected to the game
  // make sure this is after any socket on's
  socket.emit('connected-to-game')
}
