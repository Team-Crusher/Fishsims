class Player {
  constructor(socketId, color, firstFishery, name) {
    this.socketId = socketId
    this.color = color
    this.boats = []
    this.fisheries = [firstFishery]
    this.name = name
  }
}

const makePlayer = (socketId, name) => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  const x = Math.floor(Math.random() * 100)
  const y = Math.floor(Math.random() * 100)
  return new Player(socketId, `rgb(${r}, ${g}, ${b})`, {x, y}, name)
}

module.exports = {Player, makePlayer}
