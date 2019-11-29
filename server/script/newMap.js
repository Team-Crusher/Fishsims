const {getLand, getWater} = require('../../utilityMethods.js')
const {makeMap, N} = require('../../fractal-noise.js')
const {TILE_SIZE} = require('../../client/script/drawMap.js')

// make new map and make sure that it's viable
module.exports = () => {
  const area = N * N,
    propLand = 0.3
  let newMap, landTiles
  do {
    newMap = makeMap()
    landTiles = getLand(newMap)
  } while (landTiles.length / area > propLand)
  return newMap
}
