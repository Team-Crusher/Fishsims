import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.emit('new-player', socket.id)
})

socket.on('player-init', newPlayerInfo => {
  console.log('new player info? ', newPlayerInfo)
})

export default socket
