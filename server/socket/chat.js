const lobbies = require('../lobbyer')

module.exports = socket => {
  const lobby = lobbies.findPlayerLobby(socket.id)

  socket.on('sending-message', msg => {
    //private msg ==> /msg john whatever: message here
    if (msg.text.startsWith('/msg')) {
      let name = msg.text.split(':')[0]
      const text = msg.text.replace(name + ':', '').replace('/msg ', '')
      name = name.replace('/msg ', '')

      const person = lobby.getPlayer(name, 'name')
      if (person) {
        socket.broadcast.to(person.socketId).emit('new-message', {...msg, text})
      }
    } else {
      socket.broadcast.emit('new-message', msg)
    }
  })
}
