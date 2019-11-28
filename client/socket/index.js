import io from 'socket.io-client'
import lobbySocket from './lobby'
const socket = io(window.location.origin)

socket.on('connect', () => {
  // TODO remove this
  console.log('Connected to the game!')

  socket.on('lobby-result', data => {
    // connects in the lobby socket stuff and waits for game start (also adds chat)
    // it is important that anything that happens after you join a lobby is attached in lobby.js
    // because we don't want to listen for it if we're not in a lobby (game stuff, chat stuff etc)
    lobbySocket(socket, data)
  })

  // socket stuff that does not depend on lobby here...
  // global announcements? idk...
})

export default socket
