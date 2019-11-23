const circles = []

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // Keep pinging all clients, so that they don't disconnect mid-game
    setInterval(() => {
      io.emit('ping', 'ping')
    }, 5000)

    socket.on('new-player', socketId => {
      // make new player
      console.log('socket id: ', socketId)
      socket.emit('player-init', {
        socketId,
        boats: [],
        fisheries: [{x: 20, y: 20}]
      })
    })

    socket.on('pong', sid => console.log('pong from: ', sid))

    socket.on('circle-add', circle => {
      circles.push(circle)
      io.emit('server-circles', circles)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
