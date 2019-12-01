//const board = require('./server/store/board').init
const store = require('./server/store')
const {TILE_SIZE, SEA_LEVEL} = require('./client/script/drawMap.js')

const waterTiles = []
const landTiles = []
const coastTiles = []
let occupiedTiles = new Set()

// returns array of water tiles
const getWater = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[j][i] < SEA_LEVEL)
        waterTiles.push({x: j * TILE_SIZE, y: i * TILE_SIZE})
    }
  }
  return waterTiles
}

// returns array of land tiles
const getLand = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[j][i] >= SEA_LEVEL)
        landTiles.push({x: j * TILE_SIZE, y: i * TILE_SIZE})
    }
  }
  return landTiles
}

// returns an array of coastal tiles
const getCoast = map => {
  getLand(map)
  for (let i = 0; i < landTiles.length; i++) {
    if (
      (landTiles[i].x + TILE_SIZE) / TILE_SIZE < SEA_LEVEL ||
      (landTiles[i].x - TILE_SIZE) / TILE_SIZE < SEA_LEVEL ||
      (landTiles[i].y - TILE_SIZE) / TILE_SIZE < SEA_LEVEL ||
      (landTiles[i].y + TILE_SIZE) / TILE_SIZE < SEA_LEVEL
    )
      coastTiles.push(landTiles[i])
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
  if ([tile.y][tile.x] === 2) {
    // disallow movement on land
    return toReturn
  } else {
    return true
  }
}

/**
 * generates a new dock when a player joins the game
 * @param {Array} docks   array of players' docks
 */

const spawnDock = docks => {
  // assuming the docks are of the form {pId: 'socketid', x: j * TILE_SIZE, y: i * TILE_SIZE}
  let index = Math.floor(Math.random() * coastTiles.length)
  let randomLand = coastTiles[index]
  console.log(randomLand)
  if (!docks.length) return randomLand
  if (occupiedTiles.length === coastTiles.length) return {} // no spots left!
  let k = 0
  while (
    // loop to check for empty space for new dock
    occupiedTiles.length < coastTiles.length &&
    randomLand.x === docks[k].x &&
    randomLand.y === docks[k].y
  ) {
    occupiedTiles.add(randomLand)
    index = Math.floor(Math.random() * coastTiles.length)
    randomLand = coastTiles[index]
    k++
  }
  if (occupiedTiles.length >= coastTiles.length)
    return {} // no spots left!
  else return randomLand
}

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
  getLand,
  getWater,
  getCoast
}
