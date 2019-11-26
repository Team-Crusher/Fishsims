//const board = require('./server/store/board').init
const store = require('./server/store/')
const {TILE_SIZE} = require('./client/script/drawMap.js')

const waterTiles = []
const landTiles = []
const occupiedTiles = []

// returns array of water tiles
const getWater = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] < 47) waterTiles.push({i, j})
    }
  }
  return waterTiles
}

// returns array of land tiles
const getLand = map => {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] >= 47) landTiles.push({i, j})
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
const allPlayers = [{id: 1, docks: [{i: 1, j: 7}]}]
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
  getLand,
  getWater
}
