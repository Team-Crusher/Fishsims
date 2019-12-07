import store, {
  setMap,
  setFishes,
  setFisheries,
  setServerActionsReel,
  resetActionsReel,
  setPixiGameState,
  setPFGrid,
  setTurnEnded,
  setGameStats,
  setRoute,
  setDecorations,
  removeSelectedObject,
  setTimer
} from '../store'
import {clearAllArrows, setBoatName} from '../script/utils'
import {clearRange, selectedSprite} from '../script/sprites'

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
  socket.on('spawn-decos', decos => {
    store.dispatch(setDecorations(decos))
  })
  // turns stuff
  socket.on('start-server-turn', serverActionsReel => {
    // save the server's actionsReel to store for playing out computer turn
    store.dispatch(setServerActionsReel(serverActionsReel))

    // clear previous turn's client actionsReel to prepare for next player turn
    store.dispatch(resetActionsReel())

    // turn over the gamestate so PIXI starts running serverTurn()
    store.dispatch(setPixiGameState('computerTurn')) //TODO find where this triggers the thing  (serverTurn)
  })

  socket.on('start-player-turn', () => {
    clearAllArrows()
    store.getState().boats.forEach(boat => {
      boat.moveReel = []
    })
    store.dispatch(setPixiGameState('playerTurn'))
    store.dispatch(setTurnEnded(false))
  })

  socket.on('force-end-turn', () => {
    console.log('turn was forced to end')
    const {actionsReel} = store.getState()
    const turnData = {
      actionsReel
    }
    socket.emit('end-turn', turnData)
    store.dispatch(setTurnEnded(true))
    store.dispatch(removeSelectedObject({}))
    selectedSprite.isSelected = false
  })

  socket.on('game-over', gameStats => {
    store.dispatch(setGameStats(gameStats))
    store.dispatch(setRoute('GAMEOVER'))
  })

  socket.on('stats-update', gameStats => {
    store.dispatch(setGameStats(gameStats))
  })

  socket.on('connected-you', () => {
    socket.emit('end-turn', {actionsReel: {}})
    let i = 0
    socket.on('ended-turn', () => {
      if (i > 0) {
        return
      }
      i++
      socket.emit('reel-finished', store.getState().player)
    })
  })

  socket.on('timer-update', time => {
    store.dispatch(setTimer(time))
  })

  socket.on('set-boat-name', boatData => {
    setBoatName(boatData.boatId, boatData.nameToAssign, {
      fontFamily: 'Arial',
      fontSize: 12,
      fill: 'black',
      align: 'center',
      anchor: 0.5
    })
  })

  // let the server know the client connected to the game
  // make sure this is after any socket on's
  socket.emit('connected-to-game')
}
