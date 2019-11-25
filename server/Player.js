class Player {
  constructor(socketId, color, firstFishery, name) {
    this.socketId = socketId
    this.color = color
    this.boats = []
    this.fisheries = [firstFishery]
    this.name = name
  }
}

module.exports = Player
