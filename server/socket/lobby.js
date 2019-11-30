const lobbies = require('../lobbyer')
const {gameSockets, initGame} = require('./game')
const chatSockets = require('./chat')
const store = require('../store')()
const spawnDock = require('../../utilityMethods.js')

// waiting for game to start (the connected clients are in a lobby)
const waitForGame = (socket, io) => {
  console.log('waiting for', socket.id, "'s game to start.")

  socket.on('force-game', lobbyId => {
    const lobby = lobbies.getLobby(lobbyId)
    if (lobby.containsPlayer(socket.id)) {
      // normally you'd have this but for testing you can join back to current games
      // lobby.status = 'PLAYING'
      // lobby.dispatch(setStatus('PLAYING'))
    }
    initGame(lobby) // init the lobby store once

    socket.emit('game-start') // send to client who requested start
    socket.broadcast.to(lobbyId).emit('game-start') // send to everyone else
  })

  // client confirmation that they have connected to the game
  socket.on('connected-to-game', () => {
    gameSockets(socket, io) // connect in game related sockets (see ./game.js)
    chatSockets(socket) // connect in chat related sockets (see ./chat.js)
  })
}

module.exports = (socket, io) => {
  const lobbyRandom = name => {
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
      ...result.lobby.getPlayers().filter(p => p.socketId === socket.id)[0],
      socketId: socket.id
    })
    // tell everyone that that was the last player to join (lobby is at capacity)
    if (result.status === 201) {
      socket.broadcast
        .to(result.id)
        .emit('final-player', {start: new Date().getTime()})
    }

    // attach the listeners that wait for the game to start
    waitForGame(socket, io)
  }

  const lobbyById = (name, lobbyId) => {
    const out = lobbies.addPlayerToLobby(lobbyId, name, socket.id)
    switch (out.status) {
      case 0:
      case 1: {
        // switched lobby to completed
        socket.emit('lobby-result', {
          status: 200 + out.status, // close enough to what 200/201 means
          players: out.lobby.getPlayers(),
          lobbyId
        })
        socket.join(lobbyId)
        socket.broadcast.to(lobbyId).emit('player-added-to-lobby', {
          ...out.lobby.getPlayers().filter(p => p.socketId === socket.id)[0],
          final: true
        })
        break
      }
      case 2: {
        // lobby was full
        socket.emit('lobby-result', {
          status: 418,
          error: `Lobby ${lobbyId} was full.`
        })
        break
      }
      case 404: {
        // No lobby by that name
        socket.emit('lobby-result', {
          status: 404,
          error: `Could not find lobby ${lobbyId}`
        })
        break
      }
      default: {
        break
      }
    }
    if (out.status < 2) {
      // attach the listeners that wait for the game to start
      waitForGame(socket, io)
    }
  }

  /**
   * person has entered their name (and maybe an id) and is ready to join a lobby
   */
  socket.on('lobby-me', data => {
    const name = data.name
    const lobbyId = data.lobbyId
    if (lobbyId) {
      // player wants to join a specific lobby
      lobbyById(name, lobbyId)
    } else {
      // player will join any lobby
      lobbyRandom(name)
    }
  })

  socket.on('make-private-lobby', data => {
    const lob = lobbies.newLobby(null, true)
    lobbyById(data.name, lob.id)
  })
}
