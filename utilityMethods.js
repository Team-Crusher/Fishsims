const {TILE_SIZE, SEA_LEVEL} = require('./client/script/drawMap.js')

let waterTiles = []
let landTiles = []
let coastTiles = []
let occupiedTiles = new Set()

const getWater = map => {
  waterTiles = []
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] < SEA_LEVEL)
        //        waterTiles.push({x: j * TILE_SIZE, y: i * TILE_SIZE})
        waterTiles.push({row, col})
    }
  }
  return waterTiles
}

// returns array of land tiles
const getLand = map => {
  landTiles = []
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] >= SEA_LEVEL)
        //	landTiles.push({x: j * TILE_SIZE, y: i * TILE_SIZE})
        landTiles.push({row, col})
    }
  }
  return landTiles
}

// returns an array of coastal tiles
const getCoast = () => {
  coastTiles = []
  for (let i = 0; i < landTiles.length; i++) {
    if (
      /*      Math.floor((landTiles[i].x + TILE_SIZE) / TILE_SIZE) < SEA_LEVEL ||
      Math.floor((landTiles[i].x - TILE_SIZE) / TILE_SIZE) < SEA_LEVEL ||
      Math.floor((landTiles[i].y - TILE_SIZE) / TILE_SIZE) < SEA_LEVEL ||
      Math.floor((landTiles[i].y + TILE_SIZE) / TILE_SIZE) < SEA_LEVEL*/
      landTiles[i].row + 1 < SEA_LEVEL ||
      landTiles[i].row - 1 < SEA_LEVEL ||
      landTiles[i].col - 1 < SEA_LEVEL ||
      landTiles[i].col + 1 < SEA_LEVEL
    )
      coastTiles.push(landTiles[i])
  }
}

/**
 * generates a new dock when a player joins the game
 * @param {Array} docks   array of players' docks
 */
const spawnDock = docks => {
  console.log('coast: ', coastTiles, 'water: ', waterTiles)
  let index = Math.floor(Math.random() * coastTiles.length)
  let randomLand = coastTiles[index]
  console.log(randomLand)
  if (!docks.length) return randomLand
  if (docks.length === coastTiles.length) return {} // no spots left!
  let k = 0
  while (
    // loop to check for empty space for new dock
    k < docks.length &&
    docks.some(randomLand)
  ) {
    index = Math.floor(Math.random() * coastTiles.length)
    randomLand = coastTiles[index]
    k++
  }
  return randomLand
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
