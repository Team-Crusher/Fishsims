const {gameSockets} = require('./lobby')
const makeMap = require('../script/newMap')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`NEW SOCKET CONNECTION: ${socket.id}`)
    socket.on('ready', () => {
      console.log('client is ready')
      const map = makeMap()
      socket.emit('update-map', map) // send to client who requested start
    })
  })
}
