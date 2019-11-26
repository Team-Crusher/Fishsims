const board = require('./server/store/board').init
const store = require('./server/store/')
const allPlayers = [{id: 1, docks: [{i: 1, j: 7}]}]
const TILE_SIZE = 32
//const allPlayers =

const waterTiles = []
const landTiles = []
const occupiedTiles = []

for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    // Nb: if we have more of a range of numbers, change conditional to reflect that
    if (board[i][j] === 1) waterTiles.push({i, j})
    else if (board[i][j] === 2) landTiles.push({i, j})
  }
}

// returns which board tile a set of coordinates resolves to
const coordsToTile = coords => ({
  x: Math.floor(coords.x / TILE_SIZE),
  y: Math.floor(coords.y / TILE_SIZE)
})

// returns the top-left coordinates of a given board tile
const getTileOrigin = tile => ({x: tile.x * TILE_SIZE, y: tile.y * TILE_SIZE})

// checks traversible as mouse moves
const validatePath = coords => {
  let toReturn = false
  const tile = coordsToTile(coords)
  if (board[tile.y][tile.x] === 2) {
    // disallow movement on land
    return toReturn
  } else {
    return true
  }
}

const spawnDock = docks => {
  let index = Math.floor(Math.random() * landTiles.length)
  let randomLand = landTiles[index]
  let landsChecked = new Map()
  landsChecked.set(index, randomLand)
  //  console.log(randomLand)
  let k = 0
  while (
    landsChecked.length < landTiles.length &&
    randomLand.i === docks[k].i &&
    randomLand.j === docks[k].j
  ) {
    occupiedTiles.push(randomLand)
    randomLand = landTiles[Math.floor(Math.random() * landTiles.length)]
    k++
  }
  if (landsChecked.length === landTiles.length) return {}
  else return randomLand
  // check return condition
}
spawnDock()

// --- //

// Test validatePath:
// Main diagonal test passes
/*let x = 0
   let y = 0
   while (x < TILE_SIZE * 8 && y < TILE_SIZE * 8) {
   console.log(validatePath({x, y}))
   x++
   y++
   }*/

module.exports = {
  validatePath,
  coordsToTile,
  getTileOrigin,
  spawnDock,
  waterTiles,
  landTiles
}
