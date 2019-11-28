const lobbies = require('../lobbyer')

module.exports = socket => {
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
}
