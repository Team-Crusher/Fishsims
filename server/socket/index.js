const {changeName, addPlayer, addBoat} = require('../store/players')
const {setMap} = require('../store/board')
const {spawnDock, getLand, getWater} = require('../../utilityMethods.js')
const {makeMap} = require('../../fractal-noise.js')
const {TILE_SIZE, drawMap} = require('../../client/script/drawMap.js')
const store = require('../store')
const Player = require('../Player')
const Boat = require('../Boat')

const Filter = require('bad-words')
const filter = new Filter({placeHolder: '🐬'})

const allPlayers = store.getState().players
const allDocks = allPlayers.reduce(
  (docks, nextPlayer) => docks.push(nextPlayer.docks),
  []
)

//init values for new player
const makePlayer = socketId => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  const x = Math.floor(Math.random() * 100)
  const y = Math.floor(Math.random() * 100)
  const newDock = spawnDock(allDocks)
  //  console.log(newDock)
  return new Player(
    socketId,
    `rgb(${r}, ${g}, ${b})`,
    [newDock], // [{x, y}]
    'Dave' + socketId
  )
}

// make new map and make sure that it's viable
// TODO: output image
let newMap = makeMap()
let landTiles = getLand(newMap)
let waterTiles = getWater(newMap)
console.log(landTiles.length)
console.log(waterTiles.length)
while (
  landTiles.length > waterTiles.length ||
  landTiles.length < TILE_SIZE * 50
) {
  console.log(newMap)
  newMap = makeMap()
  landTiles = getLand(newMap)
  waterTiles = getWater(newMap)
}

//const mapImg = drawMap(newMap) // nope, needs ctx...

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    /**
     * Keep pinging all clients, so that they don't disconnect mid-game
     */
    setInterval(() => {
      io.emit('ping', 'ping')
    }, 5000)
    store.dispatch(setMap(newMap))
    io.emit('send-game-state', store.getState())

    /**
     * new person has opened the webpage
     */
    socket.on('new-player', socketId => {
      const newPlayer = makePlayer(socketId)
      store.dispatch(addPlayer(newPlayer))
      socket.emit('send-game-state', store.getState())
    })

    /**
     * Person places a boat
     */
    socket.on('boat-add', boat => {
      const playerToUpdate = store
        .getState()
        .players.find(p => p.socketId === boat.socketId)

      store.dispatch(
        addBoat(boat.socketId, new Boat(playerToUpdate.color, boat.x, boat.y))
      )
      io.emit('send-game-state', store.getState())
    })

    /**
     * Change person's name after homescreen
     */
    socket.on('set-name', name => {
      store.dispatch(changeName(socket.id, name))
    })

    /**
     * Chat Stuff Below
     */
    socket.on('sending-message', msg => {
      //private msg ==> /msg john whatever: message here

      if (msg.text.startsWith('/msg')) {
        let name = msg.text.split(':')[0]
        const text = msg.text.replace(name + ':', '').replace('/msg ', '')
        name = name.replace('/msg ', '')

        console.log('"', name, '"')

        const person = store
          .getState()
          .players.filter(player => player.name === name)
        if (person.length) {
          socket.broadcast
            .to(person[0].socketId)
            .emit('new-message', {...msg, text})
        }
      } else {
        socket.broadcast.emit('new-message', msg)
      }
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
