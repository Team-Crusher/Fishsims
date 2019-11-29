const {getLand, getWater} = require('../../utilityMethods.js')
const {makeMap} = require('../../fractal-noise.js')
const {TILE_SIZE} = require('../../client/script/drawMap.js')

// make new map and make sure that it's viable
module.exports = () => {
  let newMap = makeMap()
  let landTiles = getLand(newMap)
  let waterTiles = getWater(newMap)
  while (
    landTiles.length > waterTiles.length ||
    landTiles.length < TILE_SIZE * 50
  ) {
    newMap = makeMap()
    landTiles = getLand(newMap)
    waterTiles = getWater(newMap)
  }
  return newMap
}
