module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('new-player', socketId => {
      // make new player
      console.log('socket id: ', socketId)
      socket.emit('player-init', {
        socketId,
        boats: [],
        fisheries: [{x: 20, y: 20}]
      })
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
