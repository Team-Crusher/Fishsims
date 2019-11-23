const circles = []

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-player', socketId => {
      // make new player
      console.log('socket id: ', socketId)

      // TO DO: set up a new Player object on the server side
      // store socket ID and assign a color

      socket.emit('player-init', {
        socketId,
        boats: [],
        fisheries: [{x: 20, y: 20}]
      })

      io.emit('server-circles', circles)
    })

    socket.on('circle-add', circle => {
      circles.push(circle)
      io.emit('server-circles', circles)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
