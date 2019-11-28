const lobbies = require('../lobbyer')
const lobbySockets = require('./lobby')

// TODO: move below code to game.js or make a map.js or something
// make new map and make sure that it's viable
// TODO: output image

const {spawnDock, getLand, getWater} = require('../../utilityMethods.js')
const {makeMap} = require('../../fractal-noise.js')
const {TILE_SIZE} = require('../../client/script/drawMap.js')

let newMap = makeMap()
let landTiles = getLand(newMap)
let waterTiles = getWater(newMap)
while (
  landTiles.length > waterTiles.length ||
  landTiles.length < TILE_SIZE * 50
) {
  newMap = makeMap()
  landTiles = getLand(newMap)
  waterTiles = getWater(newMap)
}

//
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
    lobbySockets(socket)

    socket.on('disconnect', () => {
      const lobby = lobbies.findPlayerLobby(socket.id)
      if (lobby) {
        socket.broadcast.to(lobby.id).emit('player-left-lobby', socket.id)
        lobby.removePlayer(socket.id)
      }
    })
  })
}
