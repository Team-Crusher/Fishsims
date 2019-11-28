const {changeName, addPlayer, addBoat} = require('../store/players')
const {Player} = require('../Player')
const {setMap} = require('../store/board')
const {spawnDock, getLand, getWater} = require('../../utilityMethods.js')
const {makeMap} = require('../../fractal-noise.js')
const {TILE_SIZE} = require('../../client/script/drawMap.js')
const store = require('../store')
const Boat = require('../Boat')
const {setStatus} = require('../store/status')

const lobbies = require('../lobbyer')

// const allPlayers = store.getState().players
// const allDocks = allPlayers.reduce(
//   (docks, nextPlayer) => docks.push(nextPlayer.docks),
//   []
// )

// make new map and make sure that it's viable
// TODO: output image

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

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    /**
     * Keep pinging all clients, so that they don't disconnect mid-game
     */
    setInterval(() => {
      io.emit('ping', 'ping')
    }, 5000)

    socket.on('disconnect', () => {
      const lobby = lobbies.findPlayerLobby(socket.id)
      if (lobby) {
        socket.broadcast.to(lobby.id).emit('player-left-lobby', socket.id)
        lobby.removePlayer(socket.id)
      }
    })
  })
}
