const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap')
const {setMap} = require('../store/board')
const {addDock} = require('../store/docks')
const {addEndTurn, resetEndTurns} = require('../store/endTurns')
const {getLand, spawnDock} = require('../../utilityMethods.js')

// to be called once by the server to setup the map etc
const initGame = lobby => {
  // make and dispatch map to lobby
  console.log('INIT_GAME')
  const map = makeMap()
  lobby.dispatch(setMap(map))
  getLand(lobby.store.getState().board)
  const players = lobby.getPlayers()
  let docks = []
  players.forEach(player => {
    lobby.dispatch(addDock(player.socketId, spawnDock(docks)))
    docks = lobby.store.getState().docks
  })
  // console.log('DOCKS after loop ', docks)
}

// actual game stuff
const gameSockets = (socket, io) => {
  console.log('GAME_SOCKETS')
  const lobby = lobbies.findPlayerLobby(socket.id)
  const lobStore = lobby.store

  socket.emit('starting-map', lobStore.getState().board)
  // console.log(lobStore.getState().docks)
  socket.emit('spawn-players', lobStore.getState().docks)

  socket.on('end-turn', turnData => {
    //lobStore.dispatch(///)
    // make turn reducer for lobStore
    // - keep track of who has ended turn
    // [] p ids
    //
    // - keep track of action
    // [] action reel

    lobStore.dispatch(addEndTurn(socket.id))

    // console.log('actionsReel for ', socket.id, ': ', turnData.actionsReel)

    function allPlayersEndedTurn(players, endTurns) {
      return players.every(player => endTurns.includes(player.socketId))
    }

    if (
      allPlayersEndedTurn(
        lobStore.getState().players,
        lobStore.getState().endTurns
      )
    ) {
      lobStore.dispatch(resetEndTurns())
      io.in(lobby.id).emit('start-server-turn', 'Server turn starting!')

      // TODO:
      // send clients the consolidated actionsReel via lobStore
      // set client side game state to server turn
    }
  })
}

module.exports = {gameSockets, initGame}
