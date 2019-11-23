import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
  socket.emit('new-player', socket.id)
})

export default socket
