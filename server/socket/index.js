const {gameState, setGameState} = require('../store/gameState')
const store = require('../store')
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
      const newPlayer = {
        socketId,
        color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`,
        boats: [],
        fisheries: [{x: 20, y: 20}]
      }
      // gameState.players.push(newPlayer)
      console.log('store:  ', store)
      console.log('gamestate', store.getState().gameState)
      store.dispatch(
        setGameState({
          ...store.getState().gameState,
          players: [...store.getState().gameState.players, newPlayer]
        })
      )
      console.log('socket id: ', socketId)

      // TO DO: set up a new Player object on the server side
      // store socket ID and assign a color
      socket.emit('send-game-state', store.getState().gameState)

      socket.emit('player-init', newPlayer)

      io.emit('server-circles', circles)
    })

    //    socket.on('pong', sid => console.log('pong from: ', sid))

    socket.on('circle-add', circle => {
      circles.push(circle)
      io.emit('server-circles', circles)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
