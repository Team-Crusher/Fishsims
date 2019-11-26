const {changeName, addPlayer, addBoat} = require('../store/players')
const Player = require('../Player')
const Boat = require('../Boat')

const Lobbyer = require('./lobbyer')
const lobbies = new Lobbyer()

//init values for new player
const makePlayer = (socketId, name) => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  const x = Math.floor(Math.random() * 100)
  const y = Math.floor(Math.random() * 100)
  return new Player(socketId, `rgb(${r}, ${g}, ${b})`, {x, y}, name)
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

    // io.emit('send-game-state', store.getState())

    /**
     * person has entered their name and is ready to join a lobby
     */
    socket.on('lobby-me', (socketId, name) => {
      // const newPlayer = makePlayer(socketId)
      // store.dispatch(addPlayer(newPlayer))
      // socket.emit('send-game-state', store.getState())
      lobbies.addPlayerToWaiting(name, socketId)
      lobbies.addToOldestWaiting()
    })

    /**
     * adds player to hidden lobby
     */
    socket.on('lobby-me-hidden', (socketId, name, lobbyId) => {
      const out = lobbies.addPlayerToLobby(lobbyId, name, socketId)
      switch (out.status) {
        case 0: {
          // added to existing lobby
          socket.emit('lobby-result', {
            status: 200,
            players: out.lobby.getPlayers(),
            lobbyId
          })
          socket.broadcast
            .to(lobbyId)
            .emit('player-added-to-lobby', {name, socketId})
          break
        }
        case 1: {
          // switched lobby to completed
          socket.emit('lobby-result', {
            status: 201, // close enough to what 201 means
            players: out.getPlayers(),
            lobbyId
          })
          socket.broadcast
            .to(lobbyId)
            .emit('player-added-to-lobby', {name, socketId})
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
          socket.emit('oof', 404)
        }
      }
    })

    //   /**
    //    * Person places a boat
    //    */
    //   socket.on('boat-add', boat => {
    //     const playerToUpdate = store
    //       .getState()
    //       .players.find(p => p.socketId === boat.socketId)

    //     store.dispatch(
    //       addBoat(boat.socketId, new Boat(playerToUpdate.color, boat.x, boat.y))
    //     )
    //     io.emit('send-game-state', store.getState())
    //   })

    //   /**
    //    * Change person's name after homescreen
    //    */
    //   socket.on('set-name', name => {
    //     store.dispatch(changeName(socket.id, name))
    //   })

    //   /**
    //    * Chat Stuff Below
    //    */
    //   socket.on('sending-message', msg => {
    //     //private msg ==> /msg john whatever: message here

    //     if (msg.text.startsWith('/msg')) {
    //       let name = msg.text.split(':')[0]
    //       const text = msg.text.replace(name + ':', '').replace('/msg ', '')
    //       name = name.replace('/msg ', '')

    //       const person = store
    //         .getState()
    //         .players.filter(player => player.name === name)
    //       if (person.length) {
    //         socket.broadcast
    //           .to(person[0].socketId)
    //           .emit('new-message', {...msg, text})
    //       }
    //     } else {
    //       socket.broadcast.emit('new-message', msg)
    //     }
    //   })

    //   socket.on('disconnect', () => {
    //     console.log(`Connection ${socket.id} has left the building`)
    //   })
  })
}
