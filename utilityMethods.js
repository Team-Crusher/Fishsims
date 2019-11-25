const {board} = require('./server/store/gameState').initialGameState
const TILE_SIZE = 32

// returns which board tile a set of coordinates resolves to
const coordsToTile = coords => ({
  x: Math.floor(coords.x / TILE_SIZE),
  y: Math.floor(coords.y / TILE_SIZE)
})

// returns the top-left coordinates of a given board tile
const getTileOrigin = tile => ({x: tile.x * TILE_SIZE, y: tile.y * TILE_SIZE})

// checks traversible as mouse moves
const validatePath = coords => {
  // pass in (x,y)
  let toReturn = false

  const tile = coordsToTile(coords)

  if (board[tile.y][tile.x] === 2) {
    // disallow movement on land
    return toReturn
  } else {
    return true
  }
}

// Main diagonal test passes
let x = 0
let y = 0
while (x < TILE_SIZE * 8 && y < TILE_SIZE * 8) {
  console.log(validatePath({x, y}))
  x++
  y++
}

module.exports = {validatePath, coordsToTile, getTileOrigin}
