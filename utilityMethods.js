const {board} = require('./server/store/gameState').initialGameState
const TILE_SIZE = 64

const numToTile = n => {
  return Math.floor(n / 64)
}

// checks traversible as mouse moves
const validatePath = coords => {
  // pass in (x,y)
  let toReturn = false
  const currentTileX = numToTile(coords.x)
  const currentTileY = numToTile(coords.y)

  if (board[currentTileY][currentTileX] === 2) {
    // disallow movement on land
    return toReturn
  } else {
    return true
  }
}

// Main diagonal test passes
let x = 0
let y = 0
while (x < 64 * 8 && y < 64 * 8) {
  console.log(validatePath({x, y}))
  x++
  y++
}

module.exports = {validatePath, numToTile}
