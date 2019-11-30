import store, {
  setMap,
  setFisheries,
  setServerActionsReel,
  resetActionsReel,
  setPixiGameState
} from '../store'
// put any game socket listening in here

export default socket => {
  socket.on('starting-map', map => {
    store.dispatch(setMap(map))
  })
  socket.on('spawn-players', docks => {
    store.dispatch(setFisheries(docks))
  })

  socket.on('start-server-turn', serverActionsReel => {
    console.log('server reel: ', serverActionsReel)

    // save the server's actionsReel to store for playing out computer turn
    store.dispatch(setServerActionsReel(serverActionsReel))

    // clear previous turn's client actionsReel to prepare for next player turn
    store.dispatch(resetActionsReel())

    // turn over the gamestate so PIXI starts running serverTurn()
    store.dispatch(setPixiGameState('computerTurn'))
  })

  socket.on('start-player-turn', () => {
    store.dispatch(setPixiGameState('playerTurn'))
  })
}
