const lobbies = require('../lobbyer')

// to be called once by the server to setup the map etc
const initGame = lobby => {
  // make and dispatch map to lobby
  lobby.dispatch(/*whatever it is */)
}

// actual game stuff
const gameSockets = socket => {
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
