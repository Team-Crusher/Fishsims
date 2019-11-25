const {setGameState} = require('../store/gameState')
const store = require('../store')

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // Keep pinging all clients, so that they don't disconnect mid-game
    setInterval(() => {
      io.emit('ping', 'ping')
    }, 5000)
    io.emit('send-game-state', store.getState().gameState)
    socket.on('new-player', socketId => {
      const newPlayer = {
        socketId,
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
        boats: [],
        fisheries: [{x: 20, y: 20}]
      }
      store.dispatch(
        setGameState({
          ...store.getState().gameState,
          players: [...store.getState().gameState.players, newPlayer]
        })
      )
      socket.emit('send-game-state', store.getState().gameState)
    })
    socket.on('circle-add', circle => {
      const playerToUpdate = store
        .getState()
        .gameState.players.find(p => p.socketId === circle.socketId)
      playerToUpdate.boats.push({
        color: playerToUpdate.color,
        x: circle.x,
        y: circle.y
      })
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
