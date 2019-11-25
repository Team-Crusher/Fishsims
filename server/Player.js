class Player {
  constructor(socketId, color, firstFishery) {
    this.socketId = socketId
    this.color = color
    this.boats = []
    this.fisheries = [firstFishery]
  }
}

module.exports = Player
