const lobbies = require('../lobbyer')
const makeMap = require('../script/newMap')
const {setMap} = require('../store/board')
const {addDock} = require('../store/docks')
const {getLand, spawnDock} = require('../../utilityMethods.js')

// to be called once by the server to setup the map etc
const initGame = lobby => {
  // make and dispatch map to lobby
  console.log('INIT_GAME')
  lobby.dispatch(setMap(makeMap()))
  getLand(lobby.store.getState().board)
  const players = lobby.getPlayers()
  let docks = []
  players.forEach(player => {
    lobby.dispatch(addDock(player.socketId, spawnDock(docks)))
    docks = lobby.store.getState().docks
  })
  console.log('DOCKS after loop ', docks)
}

// actual game stuff
const gameSockets = socket => {
  console.log('GAME_SOCKETS')
  const lobby = lobbies.findPlayerLobby(socket.id)
  const lobStore = lobby.store
  console.log('board: ', lobStore.getState().board)
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
