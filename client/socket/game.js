import store, {
  setMap,
  setFishes,
  setFisheries,
  setServerActionsReel,
  resetActionsReel,
  setPixiGameState,
  setPFGrid,
  setTurnEnded
} from '../store'
import {clearArrows} from '../script/utils'

// put any game socket listening in here
export default socket => {
  // init stuff
  socket.on('starting-map', map => {
    store.dispatch(setMap(map))
    store.dispatch(setPFGrid(map))
  })
  socket.on('spawn-players', docks => {
    store.dispatch(setFisheries(docks))
  })
  socket.on('spawn-fishes', fishes => {
    store.dispatch(setFishes(fishes))
  })
  // turns stuff
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
    clearArrows()
    store.getState().boats.forEach(boat => {
      boat.moveReel = []
    })
    store.dispatch(setPixiGameState('playerTurn'))
    store.dispatch(setTurnEnded(false))
  })

  socket.on('game-over', gameStats => {
    window.alert('Game over!')
    console.log('Stats: ', gameStats)
  })
  // let the server know the client connected to the game
  // make sure this is after any socket on's
  socket.emit('connected-to-game')
}
