const lobbies = require('../lobbyer')
const lobbySockets = require('./lobby')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`NEW SOCKET CONNECTION: ${socket.id}`)

    /**
     * Keep pinging all clients, so that they don't disconnect mid-game
     */
    setInterval(() => {
      io.sockets.emit('ping', 'ping')
    }, 5000)

    // attaches lobby related sockets
    lobbySockets(socket, io)

    socket.on('disconnect', () => {
      const lobby = lobbies.findPlayerLobby(socket.id)
      if (lobby) {
        socket.broadcast.to(lobby.id).emit('player-left-lobby', socket.id)
        lobby.removePlayer(socket.id)
      }
    })
  })
}
