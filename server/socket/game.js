const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap.js')
const {setMap} = require('../store/board.js')
const {addDock} = require('../store/players.js')
const {spawnDock} = require('../../utilityMethods.js')

// to be called once by the server to setup the map etc
const initGame = lobby => {
  // make and dispatch map to lobby
  console.log('INIT_GAME')
  const players = lobby.getPlayers()
  const docks = []
  players.forEach(player => {
    docks.concat(player.docks || [])
    lobby.dispatch(addDock(player.socketId, spawnDock(docks)))
  })
  lobby.dispatch(setMap(makeMap()))
}

// actual game stuff
const gameSockets = socket => {
  console.log('GAME_SOCKETS')
  const lobby = lobbies.findPlayerLobby(socket.id)
  const lobStore = lobby.store
  socket.emit('starting-map', lobStore.getState().board)

  //   /**
  //    * Person places a boat
  //    */
  //   socket.on('boat-add', boat => {
  //     const playerToUpdate = store
  //       .getState()
  //       .players.find(p => p.socketId === boat.socketId)
  //     store.dispatch(
  //       addBoat(boat.socketId, new Boat(playerToUpdate.color, boat.x, boat.y))
  //     )
  //     io.emit('send-game-state', store.getState())
  //   })
}

module.exports = {gameSockets, initGame}
