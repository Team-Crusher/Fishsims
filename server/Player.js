class Player {
  constructor(socketId, color, docks, name) {
    this.socketId = socketId
    this.color = color
    this.boats = []
    this.docks = docks
    this.name = name
  }
}

class LobbyPlayer {
  constructor(socketId, color, name) {
    this.socketId = socketId
    this.color = color
    this.name = name
    this.dubloons = 400
  }
}

const makePlayer = (socketId, name) => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return new LobbyPlayer(socketId, `rgb(${r}, ${g}, ${b})`, name)
}

module.exports = {Player, makePlayer}
