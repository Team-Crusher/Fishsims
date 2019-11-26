class Player {
  constructor(socketId, color, firstFishery, name) {
    this.socketId = socketId
    this.color = color
    this.boats = []
    this.fisheries = [firstFishery]
    this.name = name
  }
}

class LobbyPlayer {
  constructor(socketId, color, name) {
    this.socketId = socketId
    this.color = color
    this.name = name
  }
}

const makePlayer = (socketId, name) => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return new LobbyPlayer(socketId, `rgb(${r}, ${g}, ${b})`, name)
}

module.exports = {Player, makePlayer}
