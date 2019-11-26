class Player {
  constructor(socketId, color, docks, name) {
    this.socketId = socketId
    this.color = color
    this.boats = []
    this.docks = docks
    this.name = name
  }
}

module.exports = Player
