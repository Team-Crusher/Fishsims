const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap')
const {setMap} = require('../store/board')
const {addDock} = require('../store/docks')
const {addEndTurn, resetEndTurns} = require('../store/endTurns')
const {addActionToReel, resetReel} = require('../store/serverActionsReel')
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
    lobStore.dispatch(addEndTurn(socket.id))
    lobStore.dispatch(addActionToReel(turnData.actionsReel))

    /**
     * Returns true if all players in the lobby have emitted an endTurn.
     * @param {Object} players  Player objects from lobby store
     * @param {Array} endTurns  Array of socketIds who have emitted endTurn
     */
    function allPlayersEndedTurn(players, endTurns) {
      return players.every(player => endTurns.includes(player.socketId))
    }

    if (
      allPlayersEndedTurn(
        lobStore.getState().players,
        lobStore.getState().endTurns
      )
    ) {
      io
        .in(lobby.id)
        .emit('start-server-turn', lobStore.getState().serverActionsReel)
      lobStore.dispatch(resetEndTurns())
      lobStore.dispatch(resetReel())

      // TODO:
      // send clients the consolidated actionsReel via lobStore
      // set client side game state to server turn
    }
  })
}

module.exports = {gameSockets, initGame}
