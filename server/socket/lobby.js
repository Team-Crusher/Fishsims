const lobbies = require('../lobbyer')
const {gameSockets, initGame} = require('./game')
const chatSockets = require('./chat')
const store = require('../store')()
const spawnDock = require('../../utilityMethods.js')

// waiting for game to start (the connected clients are in a lobby)

const waitForGame = socket => {
  console.log('waiting for', socket.id, "'s game to start.")

  socket.on('force-game', lobbyId => {
    console.log(lobbyId, 'was forced into the game by', socket.id)
    const lobby = lobbies.getLobby(lobbyId)
    if (lobby.containsPlayer(socket.id)) {
      // normally you'd have this but for testing you can join back to current games
      // lobby.status = 'PLAYING'
      // lobby.dispatch(setStatus('PLAYING'))
    }
    initGame(lobby) // init the lobby store once

    socket.emit('game-start') // send to client who requested start
    socket.broadcast.to(lobbyId).emit('game-start', store.getState().board) // send to everyone else
  })

  // client confirmation that they have connected to the game
  socket.on('connected-to-game', () => {
    gameSockets(socket) // connect in game related sockets (see ./game.js)
    chatSockets(socket) // connect in chat related sockets (see ./chat.js)
  })
}

module.exports = socket => {
  /**
   * person has entered their name and is ready to join a lobby
   */
  socket.on('lobby-me', name => {
    lobbies.addPlayerToWaiting(name, socket.id)
    const result = lobbies.addToOldestWaiting()
    switch (result.status) {
      case 404:
      case 2:
        socket.emit('lobby-result', {
          status: 418 // im a teapot
        })
        return
      default:
        break
    }
    socket.join(result.lobby.id) // join lobby room
    // tell client about room
    socket.emit('lobby-result', {
      status: 200,
      players: result.lobby.getPlayers(),
      lobbyId: result.lobby.id
    })
    // tell other clients about new player
    socket.broadcast.to(result.lobby.id).emit('player-added-to-lobby', {
      name,
      socketId: socket.id
    })
    // tell everyone that that was the last player to join (lobby is at capacity)
    if (result.status === 201) {
      socket.broadcast
        .to(result.id)
        .emit('final-player', {start: new Date().getTime()})
    }

    // attach the listeners that wait for the game to start
    waitForGame(socket)
  })

  /**
   * adds player to hidden lobby
   */
  socket.on('lobby-me-hidden', (name, lobbyId) => {
    const out = lobbies.addPlayerToLobby(lobbyId, name, socket.id)
    switch (out.status) {
      case 0: {
        // added to existing lobby
        socket.emit('lobby-result', {
          status: 200,
          players: out.lobby.getPlayers(),
          lobbyId
        })
        socket.join(lobbyId)
        socket.broadcast.to(lobbyId).emit('player-added-to-lobby', {
          name,
          socketId: socket.id,
          final: false
        })
        break
      }
      case 1: {
        // switched lobby to completed
        socket.emit('lobby-result', {
          status: 201, // close enough to what 201 means
          players: out.getPlayers(),
          lobbyId
        })
        socket.join(lobbyId)
        socket.broadcast.to(lobbyId).emit('player-added-to-lobby', {
          name,
          socketId: socket.id,
          final: true
        })
        break
      }
      case 2: {
        // lobby was full
        socket.emit('lobby-result', {
          status: 418
        })
        break
      }
      case 404: {
        // No lobby by that name
        socket.emit('lobby-result', {
          status: 423
        })
        break
      }
      default: {
        break
      }
    }
    if (out.status < 2) {
      // attach the listeners that wait for the game to start
      waitForGame(socket)
    }
  })
}
