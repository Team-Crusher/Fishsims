const {setGameState} = require('../store/gameState')
const store = require('../store')
const Player = require('../Player')
const Boat = require('../Boat')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // Keep pinging all clients, so that they don't disconnect mid-game
    setInterval(() => {
      io.emit('ping', 'ping')
    }, 5000)
    io.emit('send-game-state', store.getState().gameState)
    socket.on('new-player', socketId => {
      //init values for new player
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      const x = Math.floor(Math.random() * 100)
      const y = Math.floor(Math.random() * 100)
      const newPlayer = new Player(socketId, `rgb(${r}, ${g}, ${b})`, {x, y})
      store.dispatch(
        setGameState({
          ...store.getState().gameState,
          players: [...store.getState().gameState.players, newPlayer]
        })
      )
      socket.emit('send-game-state', store.getState().gameState)
    })
    socket.on('boat-add', boat => {
      const playerToUpdate = store
        .getState()
        .gameState.players.find(p => p.socketId === boat.socketId)
      playerToUpdate.boats.push(new Boat(playerToUpdate.color, boat.x, boat.y))
      store.dispatch(
        setGameState({
          ...store.getState().gameState,
          players: [
            ...store
              .getState()
              .gameState.players.filter(
                p => p.socketId !== playerToUpdate.socketId
              ),
            playerToUpdate
          ]
        })
      )
      io.emit('send-game-state', store.getState().gameState)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
