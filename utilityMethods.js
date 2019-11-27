//const board = require('./server/store/board').init
const store = require('./server/store/')
const {TILE_SIZE, SEA_LEVEL} = require('./client/script/drawMap.js')

const waterTiles = []
const landTiles = []
const occupiedTiles = []

// returns array of water tiles
const getWater = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[j][i] < SEA_LEVEL) waterTiles.push({x: j, y: i})
    }
  }
  return waterTiles
}

// returns array of land tiles
const getLand = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[j][i] >= 47) landTiles.push({x: j, y: i})
    }
  }
  return landTiles
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

// hard coded allPlayers for testing
const spawnDock = docks => {
  let index = Math.floor(Math.random() * landTiles.length)
  let randomLand = landTiles[index]

  // keep track of land tiles checked
  let landsChecked = new Set()
  landsChecked.add(randomLand)

  let k = 0
  while (
    landsChecked.length < landTiles.length &&
    randomLand.x === docks[k].x &&
    randomLand.y === docks[k].y
  ) {
    occupiedTiles.push(randomLand)
    index = Math.floor(Math.random() * landTiles.length)
    while (landsChecked.has(landTiles[index]))
      index = Math.floor(Math.random() * landTiles.length)
    randomLand = landTiles[index]
    k++
  }
  if (landsChecked.length === landTiles.length) return {}
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
  getWater
}
